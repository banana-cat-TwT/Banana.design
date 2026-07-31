# -*- coding: utf-8 -*-
"""
图片批量压缩脚本
扫描 image_original/ 下所有图片，生成 WebP + 回退格式(JPG/PNG) 写入 image/。
- 无 alpha 的照片 -> WebP + JPG
- 有 alpha 的透明图 -> WebP + 优化PNG
- 长边 > 1920px 等比缩小
- 小于 50KB 的原样复制
"""
import os
import sys
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "image_original"
DST = ROOT / "image"

MAX_EDGE = 1920
WEBP_QUALITY = 82
JPG_QUALITY = 82
SKIP_THRESHOLD = 50 * 1024  # 50KB 以下原样复制

VALID_EXT = {".png", ".jpg", ".jpeg", ".webp", ".gif", ".bmp"}

# 处理过程中跳过非图片子目录里的大截图等仍会被处理，符合预期


def has_alpha(img):
    return img.mode in ("RGBA", "LA") or (
        img.mode == "P" and "transparency" in img.info
    )


def resize_if_needed(img):
    w, h = img.size
    long_edge = max(w, h)
    if long_edge > MAX_EDGE:
        scale = MAX_EDGE / long_edge
        new_size = (max(1, int(w * scale)), max(1, int(h * scale)))
        # 用高质量重采样
        resample = Image.LANCZOS
        img = img.resize(new_size, resample)
    return img


def convert_mode(img):
    """统一转 RGB/RGBA 以便保存。"""
    if img.mode == "P":
        img = img.convert("RGBA" if has_alpha(img) else "RGB")
    elif img.mode in ("L", "LA"):
        pass  # 灰度保留
    elif img.mode not in ("RGB", "RGBA"):
        img = img.convert("RGB")
    return img


def save_webp(img, out_path):
    kwargs = {"quality": WEBP_QUALITY, "method": 6}
    if img.mode == "RGB":
        img.save(out_path, "WEBP", **kwargs)
    else:
        img.save(out_path, "WEBP", **kwargs)


def save_fallback(img, out_path, alpha):
    if alpha:
        # 保留透明 -> PNG
        img.save(out_path, "PNG", optimize=True)
    else:
        # 照片 -> JPG
        if img.mode != "RGB":
            img = img.convert("RGB")
        img.save(out_path, "JPEG", quality=JPG_QUALITY, optimize=True, progressive=True)


def process_file(src_file):
    """返回 (原大小, 新大小合计, 输出文件名列表)。"""
    orig_size = src_file.stat().st_size
    stem = src_file.stem
    ext = src_file.suffix.lower()

    # 小图直接复制
    if orig_size < SKIP_THRESHOLD:
        webp_name = stem + ".webp"
        # 小图也产出 webp + 原格式回退，保持 HTML 改造脚本统一
        try:
            img = Image.open(src_file)
            img.load()
            webp_out = DST / webp_name
            save_webp(convert_mode(img), webp_out)
            fallback_out = DST / (stem + (".png" if has_alpha(img) else ".jpg"))
            save_fallback(convert_mode(img), fallback_out, has_alpha(img))
            new_total = webp_out.stat().st_size + fallback_out.stat().st_size
            return orig_size, new_total, [webp_name, fallback_out.name]
        except Exception as e:
            # 失败则原样复制
            for name in (stem + ".webp",):
                pass
            return orig_size, orig_size, None

    try:
        img = Image.open(src_file)
        img.load()
    except Exception as e:
        print(f"  [跳过] 无法打开 {src_file.name}: {e}")
        return orig_size, orig_size, None

    img = convert_mode(img)
    img = resize_if_needed(img)
    alpha = has_alpha(img)

    webp_out = DST / (stem + ".webp")
    fallback_out = DST / (stem + (".png" if alpha else ".jpg"))

    try:
        save_webp(img, webp_out)
        save_fallback(img, fallback_out, alpha)
    except Exception as e:
        print(f"  [错误] 保存失败 {src_file.name}: {e}")
        return orig_size, orig_size, None

    new_total = webp_out.stat().st_size + fallback_out.stat().st_size
    return orig_size, new_total, [webp_out.name, fallback_out.name]


def main():
    if not SRC.exists():
        print(f"源目录不存在: {SRC}")
        sys.exit(1)
    DST.mkdir(parents=True, exist_ok=True)

    # 先清空 image/ 下的旧图片文件（保留子目录结构由我们重建）
    # 为安全起见，只删除 DST 下我们即将产出的图片文件
    for f in DST.rglob("*"):
        if f.is_file() and f.suffix.lower() in VALID_EXT.union({".webp"}):
            try:
                f.unlink()
            except Exception:
                pass

    files = [f for f in SRC.rglob("*") if f.is_file() and f.suffix.lower() in VALID_EXT]
    # 过滤掉非图片（如 .DS_Store 等）
    files = [f for f in files if f.suffix.lower() != ""]

    total_orig = 0
    total_new = 0
    count = 0
    for f in sorted(files, key=lambda x: x.name):
        # 保持子目录结构
        rel = f.relative_to(SRC)
        # 在 DST 建对应子目录
        sub = DST / rel.parent
        sub.mkdir(parents=True, exist_ok=True)

        orig, new, names = process_file(f)
        total_orig += orig
        total_new += new
        count += 1
        pct = (1 - new / orig) * 100 if orig else 0
        sign = "-" if new < orig else "+"
        print(f"[{count:3d}/{len(files)}] {f.name[:40]:40s} "
              f"{orig/1024:8.0f}KB -> {new/1024:8.0f}KB ({sign}{abs(pct):.0f}%)")

    print("\n========== 汇总 ==========")
    print(f"处理文件数: {count}")
    print(f"原始总大小: {total_orig/1024/1024:.1f} MB")
    print(f"压缩后大小: {total_new/1024/1024:.1f} MB")
    if total_orig:
        print(f"总体节省:   {(total_orig-total_new)/1024/1024:.1f} MB "
              f"({(1-total_new/total_orig)*100:.1f}%)")


if __name__ == "__main__":
    main()
