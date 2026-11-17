"""Regenerates the SEO files of doctor-de-columna from the real index.html pages:

  - doctor-de-columna/sitemap.xml
  - doctor-de-columna/llms.txt
  - doctor-de-columna/mapa-del-sitio/index.html  (HTML sitemap for people)

Run after adding, removing or renaming pages:  python tools/build-seo-files.py
"""
from pathlib import Path
import datetime
import html
import os
import re

ROOT = Path(__file__).resolve().parent.parent / 'doctor-de-columna'
BASE = 'https://www.doctordecolumna.com'
EMAIL = 'info@doctordecolumna.com'
HTML_SITEMAP = '/mapa-del-sitio/'
CITIES = [('tijuana', 'Tijuana'), ('rosarito', 'Rosarito'), ('guadalajara', 'Guadalajara')]


def page_info(path):
    t = path.read_text(encoding='utf-8')
    title = html.unescape(re.search(r'<title>(.*?)</title>', t, re.S).group(1)).replace('[Version B] ', '').strip()
    d = re.search(r'<meta (?:name="description" content="([^"]*)"|content="([^"]*)" name="description")', t)
    desc = html.unescape((d.group(1) or d.group(2)) if d else '').strip()
    robots = re.search(r'<meta (?:name="robots" content="([^"]*)"|content="([^"]*)" name="robots")', t)
    noindex = bool(robots and 'noindex' in (robots.group(1) or robots.group(2)))
    rel = path.parent.relative_to(ROOT).as_posix()
    url_path = '/' if rel == '.' else f'/{rel}/'
    lastmod = datetime.date.fromtimestamp(os.path.getmtime(path)).isoformat()
    return {'path': url_path, 'title': title, 'desc': desc, 'lastmod': lastmod, 'noindex': noindex}


def kind(p):
    parts = p['path'].strip('/').split('/')
    if p['path'] == '/':
        return 'home'
    if parts[0] == 'aviso-privacidad':
        return 'legal'
    if p['path'] == HTML_SITEMAP:
        return 'sitemap'
    if parts[0] == 'blog':
        return 'blog' if len(parts) == 1 else 'post'
    if len(parts) == 1:
        return 'city'
    if len(parts) == 2:
        return 'hub'
    return parts[1]  # condiciones | servicios


def short(title):
    return title.split(' | ')[0].strip()


def collect():
    return [page_info(p) for p in sorted(ROOT.rglob('index.html')) if 'partials' not in p.parts]


# ---------- HTML sitemap (built first so it is part of the crawl below) ----------
def build_html_sitemap(pages):
    shell = (ROOT / 'aviso-privacidad' / 'index.html').read_text(encoding='utf-8')
    head = shell[:shell.index('</head>')]
    head = head.replace('<!-- Intentionally noindex: legal page, keep after launch and keep out of sitemap.xml -->\n  ', '')
    head = re.sub(r'<meta name="robots" content="[^"]*" />', '<meta name="robots" content="index, follow" />', head, count=1)
    title = 'Mapa del sitio | Dr. Francisco Cisneros Oliva'
    desc = 'Todas las páginas del sitio del Dr. Francisco Cisneros Oliva: sedes en Tijuana, Rosarito y Guadalajara, condiciones de columna, tratamientos y blog.'
    head = re.sub(r'<title>.*?</title>', f'<title>{title}</title>', head, count=1, flags=re.S)
    head = re.sub(r'(<meta name="description" content=")[^"]*', r'\g<1>' + desc, head, count=1)
    for prop in ('canonical',):
        head = re.sub(r'(<link rel="canonical" href=")[^"]*', r'\g<1>' + BASE + HTML_SITEMAP, head, count=1)
    head = re.sub(r'(<meta property="og:url" content=")[^"]*', r'\g<1>' + BASE + HTML_SITEMAP, head, count=1)
    head = re.sub(r'(<meta property="og:title" content=")[^"]*', r'\g<1>Mapa del sitio — Dr. Francisco Cisneros', head, count=1)
    body = shell[shell.index('</head>'):shell.index('<main id="main-content">')]
    after = shell[shell.index('</main>'):]

    visible = [p for p in pages if p['path'] != HTML_SITEMAP]

    def links(items):
        return '<ul>' + ''.join(f'<li><a href="{p["path"]}">{"Inicio" if p["path"] == "/" else html.escape(short(p["title"]))}</a></li>' for p in items) + '</ul>'

    sections = []
    general = sorted((p for p in visible if kind(p) in ('home', 'blog')), key=lambda p: p['path'] != '/')
    sections.append(('General', links(general)))
    for slug, label in CITIES:
        city = [p for p in visible if p['path'].startswith(f'/{slug}/')]
        if not city:
            continue
        parts = []
        top = [p for p in city if kind(p) in ('city', 'hub')]
        if top:
            parts.append(links(top))
        for k, sub in (('condiciones', 'Condiciones'), ('servicios', 'Tratamientos y servicios')):
            group = [p for p in city if kind(p) == k]
            if group:
                parts.append(f'<h3>{sub}</h3>' + links(group))
        sections.append((label, ''.join(parts)))
    posts = [p for p in visible if kind(p) == 'post']
    if posts:
        sections.append(('Artículos del blog', links(posts)))
    legal = [p for p in visible if kind(p) == 'legal']
    sections.append(('Información legal y contacto', links(legal) + f'<ul><li><a href="mailto:{EMAIL}">{EMAIL}</a></li></ul>'))

    grid = ''.join(f'<section class="legal-b-card"><h2>{t}</h2>{c}</section>' for t, c in sections)
    main = f'''<main id="main-content">
<section class="legal-b-hero" aria-labelledby="sitemap-h1"><div class="legal-b-inner">
<nav class="legal-b-breadcrumb" aria-label="Ruta de navegación"><a href="/">Inicio</a><span>/</span><span aria-current="page">Mapa del sitio</span></nav>
<span class="legal-b-eyebrow">Navegación</span>
<h1 id="sitemap-h1">Mapa del sitio</h1>
<p>Encuentra todas las páginas del sitio: nuestras sedes, las condiciones de columna que atendemos, los tratamientos y los artículos del blog.</p>
</div></section>
<div class="legal-b-body legal-b-sitemap">{grid}</div>
'''
    out = ROOT / HTML_SITEMAP.strip('/') / 'index.html'
    out.parent.mkdir(exist_ok=True)
    new = head + body + main + after
    if not out.exists() or out.read_text(encoding='utf-8') != new:
        out.write_text(new, encoding='utf-8')


pages = collect()
build_html_sitemap(pages)
pages = collect()

PRIORITY = {'home': '1.0', 'city': '0.9', 'hub': '0.8', 'condiciones': '0.8', 'servicios': '0.8', 'blog': '0.6', 'post': '0.6', 'sitemap': '0.3', 'legal': '0.2'}
FREQ = {'home': 'weekly', 'blog': 'weekly', 'legal': 'yearly', 'sitemap': 'monthly'}
ORDER = ['home', 'city', 'hub', 'condiciones', 'servicios', 'blog', 'post', 'sitemap', 'legal']
pages.sort(key=lambda p: (ORDER.index(kind(p)), p['path']))

# ---------- sitemap.xml (indexable pages only) ----------
indexable = [p for p in pages if not p['noindex']]
urls = '\n'.join(
    f'  <url>\n    <loc>{BASE}{p["path"]}</loc>\n    <lastmod>{p["lastmod"]}</lastmod>\n'
    f'    <changefreq>{FREQ.get(kind(p), "monthly")}</changefreq>\n    <priority>{PRIORITY[kind(p)]}</priority>\n  </url>'
    for p in indexable
)
(ROOT / 'sitemap.xml').write_text(
    '<?xml version="1.0" encoding="UTF-8"?>\n'
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + urls + '\n</urlset>\n',
    encoding='utf-8')


# ---------- llms.txt ----------
def link(p):
    return f'- [{short(p["title"])}]({BASE}{p["path"]}): {p["desc"]}'


def city_section(slug):
    items = [p for p in pages if p['path'].startswith(f'/{slug}/')]
    out = []
    for label, kinds in (('Inicio y padecimientos', ('city', 'hub')), ('Condiciones', ('condiciones',)), ('Tratamientos y servicios', ('servicios',))):
        group = [p for p in items if kind(p) in kinds]
        if group:
            out += [f'### {label}', ''] + [link(p) for p in group] + ['']
    return '\n'.join(out)


home = next(p for p in pages if p['path'] == '/')
blog = '\n'.join(link(p) for p in pages if kind(p) in ('blog', 'post'))
legal = '\n'.join(link(p) for p in pages if kind(p) == 'legal')
llms = f"""# Dr. Francisco Cisneros Oliva — Especialista en Columna y Cirugía Endoscópica

> El Dr. Francisco Javier Cisneros Oliva es traumatólogo, ortopedista y cirujano de columna vertebral (cédula profesional 12294474), con formación en cirugía endoscópica de columna. Atiende con cita previa en Tijuana y Playas de Rosarito (Baja California) y en Guadalajara/Zapopan (Jalisco): valoración, diagnóstico y tratamiento de hernia de disco, ciática, estenosis espinal, espondilolistesis, escoliosis del adulto, dolor lumbar y cervical, y fracturas de columna.

Información clave:

- Idioma del sitio: español (México).
- El tratamiento se decide tras una valoración individual; la mayoría de los planes inician sin cirugía.
- El contenido del sitio es informativo y no sustituye una consulta médica.
- Correo de contacto: {EMAIL}

## Sitio

- [Inicio]({BASE}/): {home['desc']}
{legal}

## Tijuana (Baja California)

Consultorio: New City Medical Plaza, Av. Paseo del Centenario 9580, piso 27, Zona Urbana Río, Tijuana, B.C. 22010. Teléfono y WhatsApp: +52 664 159 6633.

{city_section('tijuana')}
## Rosarito (Baja California)

Consultorio: Blvd. Benito Juárez 907-31, Centro Playas, Playas de Rosarito, B.C. 22710. Teléfono y WhatsApp: +52 664 159 6633. Las páginas de condiciones y tratamientos de Tijuana aplican también a Rosarito.

{city_section('rosarito')}
## Guadalajara (Zapopan, Jalisco)

Consultorio: Hospital Ángeles Andares, Av. Patria 1355, piso 32, consultorio 3225, Zapopan, Jal. 45116. Teléfono y WhatsApp: +52 33 1172 8391.

{city_section('guadalajara')}
## Blog

{blog}

## Citas y contacto

- Tijuana y Rosarito por WhatsApp: https://wa.me/526641596633
- Guadalajara por WhatsApp: https://wa.me/523311728391
- Correo: {EMAIL}

## Opcional

- [Mapa del sitio]({BASE}{HTML_SITEMAP})
- [Mapa del sitio (XML)]({BASE}/sitemap.xml)
"""
(ROOT / 'llms.txt').write_text(re.sub(r'\n{3,}', '\n\n', llms), encoding='utf-8')
print(f'sitemap.xml: {len(indexable)} URLs ({len(pages) - len(indexable)} noindex skipped) | llms.txt | {HTML_SITEMAP}')
