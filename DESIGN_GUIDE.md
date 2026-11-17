# Guía de diseño — Doctor de Columna, opción B

Versión 2 · 17 de noviembre de 2026

La referencia vigente es la homepage de opción B en `doctor-de-columna/`, compartida por marca, Tijuana, Guadalajara y Rosarito. Esta guía sustituye la dirección original de navy y azul grisáceo. Las referencias visuales sirven para composición; no deben reintroducir sus colores ni fuentes.

## Paleta vigente

Los tokens compartidos están en `doctor-de-columna/Assets/css/base.css`.

| Uso | Token | Color |
| --- | --- | --- |
| Azul de marca: títulos, botones, secciones azules | `--brand-blue` | `#004b87` |
| Hover del azul | `--brand-blue-hover` | `#003a6b` |
| Azul luminoso: gradiente del logo y acentos | `--brand-blue-bright` | `#1f7fc8` |
| Verde de acción y detalle | `--brand-green` | `#56fc80` |
| Texto e iconos sobre azul de marca | `--color-on-brand` | `#ffffff` |
| Fondo general | `--color-bg-base` | `#f4f7ff` |
| Superficie alterna | `--color-bg-alt` | `#f9fcfe` |
| Tarjetas y formularios | `--color-bg-card` | `#ffffff` |
| Panel suave | `--color-bg-soft` | `#e7eeff` |
| Párrafos y texto secundario en claro | `--color-text-body` / `--color-text-low` | `#4e7391` |
| Texto suave sobre azul | `--color-text-mid` | `#d6e8f5` |
| Bordes claros | `--color-border-lt` | `#c8dff0` |

Los azules pálidos del fondo del hero y las ilustraciones existentes son parte de la atmósfera. No usarlos para reemplazar el azul de marca en botones o secciones.

`--color-navy`, `--color-navy-dk` y `--color-navy-deep` se conservan como aliases de compatibilidad para el azul aprobado y su hover. Sus nombres no indican una paleta navy adicional. En código nuevo, preferir los tokens semánticos de marca.

No usar el navy anterior `#183f66`, el slate `#2c4a62`, ni superficies casi negras como `#081428` o `#0c253a`. El fondo de una sección oscura de UI debe ser el mismo azul `#004b87` de la homepage. Los scrims pueden usar ese azul con transparencia. El negro de fotografías o contenido de video no se recolorea.

El verde es un acento y no sustituye el azul principal en todos los botones. No añadir cyan eléctrico ni nuevos colores de marca. Los colores de Google, WhatsApp y Doctoralia dentro de sus propios logos se conservan.

## Header y contraste

- Al inicio en desktop, el logo y el extremo derecho del CTA se alinean con los extremos del contenido del hero. Las homepages usan el contenedor de 1600 px y sus gutters fluidos; las páginas clínicas usan su `.cb-wrap`. El header permanece transparente, sin borde visible ni sombra.
- Tras 12 px de scroll, el header se contrae a un contenedor flotante centrado de máximo 1280 px: logo y CTA se acercan al centro con una transición de 400 ms mientras la superficie aparece con un fade de 320 ms. La posición vertical se mantiene a 16 px y las esquinas son de 24 px. El hero no se desplaza. En tablet se compacta y se oculta el CTA duplicado. Respetar `prefers-reduced-motion`.
- Sobre claro: marca y navegación azules. El header al hacer scroll usa una superficie de hielo translúcida.
- Sobre una sección azul en desktop: fondo del header en azul de marca; logo completo, wordmark, enlaces y chevrons blancos. En móvil, usar una superficie de hielo opaca con sombra y logo/hamburger azules para que el contenedor se distinga del footer azul. Mantener su geometría al abrir y cerrar el menú.
- Un wordmark con texto recortado sobre un gradiente debe quitar ese gradiente al pasar a blanco. Cambiar solo `color` no basta.
- Marcar las secciones azules con `data-nav-dark`, también cuando están dentro de un partial. `main.js` evalúa la posición real del header flotante y su punto medio al hacer scroll o resize.
- El menú abierto tiene una superficie clara propia. Conserva el logo y los controles azules aunque detrás haya una sección azul. Al cerrarlo recupera la variante correspondiente a la sección actual.
- El logo, el H1 y el tag no deben desplazarse al abrir o cerrar el menú. Compensar el ancho de la barra de scroll y conservar la geometría del header.
- Los dropdowns claros mantienen texto azul; no heredan blanco de sus botones de apertura.
- En desktop, agrupar lesiones y tratamientos en el mega menú «Especialidades», inspirado en la estructura de Romario: dos grupos de enlaces y tarjetas con imágenes a la derecha. Mantener el panel claro y la paleta de opción B. Abrir con hover intencional o click, permitir cruzar el espacio hasta el panel y cerrar con Escape o click fuera. Los enlaces siguen la ciudad actual; Rosarito usa los recursos de Tijuana. En pantallas estrechas se ocultan las imágenes decorativas. El menú móvil conserva sus grupos separados.
- Dentro de lesiones, separar columna lumbar, columna cervical y condiciones de columna en general; no inventar páginas regionales para diagnósticos que abarcan varios segmentos. El mega menú incluye un selector Tijuana / Guadalajara que actualiza todos sus destinos sin cerrarlo. El enlace superior permite abrir la página equivalente en la ciudad elegida (o su homepage cuando no existe un equivalente por ciudad). La selección empieza en la ciudad de la página actual.

## Tipografía

- Títulos: **Funnel Display**, normalmente peso 600 y sentence case.
- Párrafos: **Inter Regular 400**, tracking aproximado de `-0.025em`.
- Mayúsculas solo en labels breves y eyebrows existentes; no aplicar `text-transform: uppercase` a todos los títulos.
- Mantener el H1 blanco con su gradiente en los heroes que ya lo usan. Las páginas clínicas conservan sus títulos azules.
- Fuentes locales; no restablecer la especificación anterior de Inter para headings y Work Sans para body.

## Composición y componentes

- Superficies luminosas, aire entre bloques y tarjetas con esquinas redondeadas. Las secciones azules son acentos, no el fondo general de toda la página.
- Reutilizar partials, componentes, radios y botones existentes. La flecha es el SVG diagonal ya utilizado en opción B; no reemplazarla por caracteres tipográficos distintos.
- El retrato del doctor no lleva un contorno o stroke decorativo añadido.
- La atmósfera del hero usa el asset y los degradados existentes. No recrearla con una sola mancha saturada.
- No imponer una proporción claro/oscuro que obligue a añadir nuevas secciones oscuras.

## Hero responsive con retrato

La fuente de verdad es `Assets/css/pages/home-hero-responsive-b.css`, cargado después de los estilos originales en las cuatro homepages con retrato. Mantener las columnas reales; no volver a superponer el retrato al texto con márgenes negativos.

- Hasta 768 px: título sobre retrato; imagen limitada a 420 × 560 px. El tag queda a 20 px del header y cerca del H1. Hasta 360 px se oculta el tag opcional.
- 769–1279 px: texto y retrato en columnas. Sin imagen lateral ni insignias. Hasta 900 px se oculta el párrafo de soporte.
- Desde 1280 px: se añade la ilustración lateral; desde 1440 px, las insignias superiores; desde 1600 px, las inferiores.
- En ventanas de hasta 700 px de alto, ocultar párrafo e insignias y reducir el retrato de escritorio.
- Probar los límites de cada breakpoint, landscape y títulos de Guadalajara. No recortar contenido para forzar `100vh`.

## Imágenes y movimiento

Imágenes locales optimizadas a WebP con tamaños explícitos y alt que describa lo visible. Mantener el texto importante como HTML. No colocar información clínica solo en imágenes.

Animar con transform y opacity cuando corresponda. Respetar `prefers-reduced-motion`. El menú se despliega sin cambiar el tamaño ni la posición del logo y sin desplazar el hero de fondo.

## Comprobación y mantenimiento

Al modificar estilos o JavaScript, actualizar los `?v=` correspondientes en el HTML activo. Revisar el hero, un fondo claro, una sección azul y el footer en móvil y escritorio. Probar menú abierto/cerrado y dropdowns; el contraste se evalúa contra la superficie real de cada control.

Las correcciones de schema no autorizan inventar datos médicos ni cambiar el contenido de testimonios. Mantener separadas las modificaciones visuales de los datos clínicos y comerciales.
