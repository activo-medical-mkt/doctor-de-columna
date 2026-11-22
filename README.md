# doctordecolumna.com

Sitio del Dr. Francisco Cisneros Oliva, traumatólogo y cirujano de columna (Tijuana, Rosarito y Guadalajara).

## Diseño

La paleta y las reglas vigentes de opción B están en [DESIGN_GUIDE.md](DESIGN_GUIDE.md). Las instrucciones para mantenerlas están en [AGENTS.md](AGENTS.md).

## Estructura

- `doctor-de-columna/`: el sitio publicado (HTML estático). Su contenido se sirve en la raíz del dominio.
  - `partials/`: fragmentos HTML que `Assets/js/loader.js` inserta en las páginas mediante `data-include`.
  - `_headers` y `_redirects`: encabezados (CSP, caché) y redirecciones 301 que aplica Cloudflare.
  - `sitemap.xml`, `llms.txt`, `mapa-del-sitio/`: generados por `tools/build-seo-files.py` (no editar a mano).
- `tools/build-seo-files.py`: regenera el sitemap, `llms.txt` y el mapa del sitio a partir de las páginas reales.
- `wrangler.jsonc`: configuración del Worker de Cloudflare que publica `doctor-de-columna/`.

## Vista previa local

```powershell
python -m http.server 4173 --directory doctor-de-columna
```

Abre http://127.0.0.1:4173/. Agrega `?reset` a cualquier URL para volver a mostrar el aviso de cookies.

## Después de agregar, quitar o renombrar páginas

```powershell
python tools\build-seo-files.py
```

Las páginas con `noindex` (aviso de privacidad, 404) quedan fuera de `sitemap.xml` automáticamente.

## Publicar

Cada push a `main` en `activo-medical-mkt/doctor-de-columna` se publica en Cloudflare. Para publicar manualmente:

```powershell
npx.cmd wrangler deploy
```

Al cambiar CSS o JS, actualiza su `?v=` en el HTML: `Assets/css` y `Assets/js` se sirven con caché de un año.

El CSS y el JS están minificados en el mismo archivo (`python tools/minify_assets.py`; `--pretty ARCHIVO` imprime una versión legible). Los originales legibles están en el tag `backup-pre-minify-2026-11-21`.

La versión anterior del sitio está en el historial de git (commit `6e86d07`).
