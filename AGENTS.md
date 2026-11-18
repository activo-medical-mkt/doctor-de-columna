# Visual direction for this project

- The active site is `doctor-de-columna/`. Use its current option B homepage as the visual source of truth.
- Read `DESIGN_GUIDE.md` before changing UI. Its current palette replaces the original navy design direction.
- Use the shared tokens in `doctor-de-columna/Assets/css/base.css`: brand blue `#004b87`, blue hover `#003a6b`, bright blue `#1f7fc8`, green `#56fc80`, ice surface `#f4f7ff`, and white.
- Do not introduce navy, near-black blue, or slate-blue surfaces from older versions or references. Legacy `--color-navy*` variables are compatibility aliases for the approved brand blues, not permission to add another navy.
- Keep light text and icons on brand-blue surfaces. Over `[data-nav-dark]` regions, the desktop header uses its white logo lockup and links; the mobile header uses an opaque ice surface with a subtle shadow and the blue logo/hamburger, so the floating container stays distinct from the footer. Opening the mobile menu keeps that light surface and blue controls without shifting the logo.
- Mark new dark brand-blue sections with `data-nav-dark`, including sections inserted through partials. Check both mobile and desktop, and the open-menu state.
- Preserve the homepage's Funnel Display headings, Inter body text, soft surfaces, rounded cards, and existing arrow style. Do not revive the old Inter-heading / Work Sans-body specification.
- Keep portrait-hero breakpoints in `Assets/css/pages/home-hero-responsive-b.css`; do not reintroduce negative margins that place the portrait over copy. Those rules stop at 1599px: at 1600px and wider the original option B hero (440px portrait, badges floating over the images) is the approved look.
- Desktop header: transparent and aligned to the hero's full content width at the top; on scroll, smoothly move logo and booking action inward into the centered 1280 px floating container. This deliberate scroll motion is separate from opening the mobile menu, which must not shift its logo or page content.
- Desktop navigation is Sobre mí / Endoscopia de columna / Especialidades / Ubicaciones / Opiniones (the two dropdowns side by side). Sobre mí links to the current city's homepage `#doctor` section, or `/#doctor` outside city folders. Opiniones links to `/opiniones/`. The logo retains the homepage link; do not restore a separate Inicio item. Endoscopia links to the current city's page; outside a city folder it carries `data-gdl-href` so the homepage city chooser asks Tijuana or Guadalajara. The mobile menu lists Sobre mí first and Endoscopia de columna next, with Opiniones replacing Pacientes. Especialidades combines spine conditions and treatments in one light mega-menu, using Romario's grouped structure with image cards at the far right and city-specific links. Keep mobile Condiciones and Servicios groups separate.
- Group mega-menu conditions into lumbar, cervical and general spine conditions where the existing content supports it. Its Tijuana / Guadalajara selector changes every menu destination while keeping the panel open, with a direct link to the equivalent page in the chosen city; default to the current page's city.
- Do not include a Contacto link in the mobile menu; retain the booking CTA and Ubicaciones group.
- English Tijuana homepage: `/en/tijuana/`, built with `python scripts/build_en_tijuana.py` from the Spanish layout and reviewed catalogs in `scripts/locales/`. Rebuild after changes to the Tijuana homepage or shared interaction scripts, then run `python tools/build-seo-files.py`. Keep reciprocal ES/EN links on the two homepages. Do not create links to untranslated English detail pages; label existing Spanish destinations. Generic Spanish generators must skip `/en/`.
- When changing CSS or JavaScript, update the corresponding `?v=` references in the active HTML pages.

# Editing text safely (Spanish accents)

The site is Spanish and every file is UTF-8. Text has been corrupted repeatedly (accented letters replaced by a question mark, or "í" turned into two odd characters) by sending it through Windows PowerShell 5.1, which pipes ASCII/cp1252 to other programs. To avoid it:

- Never put non-ASCII text (á é í ó ú ñ ¿ ¡ « » — →) inside a PowerShell command, here-string or `| python -` pipe. PowerShell must only carry ASCII.
- Edit files with the editor/file tools, which write UTF-8. For scripted or bulk edits, save the script as a `.py` file with those tools and run `python path\to\script.py`; read and write with `encoding='utf-8'`.
- If PowerShell must write a file, use `[IO.File]::WriteAllText($path, $text, (New-Object Text.UTF8Encoding $false))`, never `Set-Content`/`Out-File`/`>` without an explicit UTF-8 encoding, and only with ASCII content.
- Garbled accents printed in the console are often a display issue only; verify the file itself (read it as UTF-8 or check the browser) before "fixing" anything.
- Before committing, run `python scripts/check-mojibake.py --all`. The pre-commit hook runs it on staged files and blocks commits with corrupted text.
