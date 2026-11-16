import io, re

src = io.open('gate-3d.html', encoding='utf-8').read()
m = re.search(r'<script type="module">(.*?)</script>', src, re.S)
io.open('.tmp_shot/mod.mjs', 'w', encoding='utf-8').write(m.group(1))
print('extracted', len(m.group(1)), 'chars')
