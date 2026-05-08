# VISUAL-QUALITY.md
## Reglas de Diseño Visual — Traumatólogo GDL
*Extraídas del análisis de 5 imágenes de inspiración (Nuvica Medical Website UI, diseño por Hamida Jannat)*
*Última actualización: mayo 2026*

---

## 1. Espaciado

- **Padding de sección: mínimo 80px vertical** en desktop — nunca menos de `var(--space-24)` (96px). Secciones "apretadas" destruyen la percepción de calidad médica premium.
- **Padding interno de cards: 24–32px** (`var(--space-6)` a `var(--space-8)`). Cards con menos de 20px de padding se ven baratas.
- **Gap entre columnas de cards: 24px** (`var(--space-6)`) — no usar 16px en grids de contenido visual.
- **Separación entre sección y siguiente: nunca usar `<hr>` o borde** — el cambio de fondo (`--cps--white` / `--cps--alt` / etc.) es el único separador visual permitido.
- **Margen del contenedor: mínimo `clamp(16px, 3.2vw, 48px)` a cada lado** — el `.cps-inner` ya lo hace; nunca romperlo con padding-x adicional.
- **Hero: padding-top mínimo 80px + altura de navbar (76px)** — el contenido del hero nunca queda tapado por la barra fija.
- **Estadísticas flotantes (chips)**: cuando se colocan sobre imágenes del hero, separarlos entre sí al menos 16px; no apilarlos sin margen.
- **Espacio entre label de categoría (pill) y el H2 de sección: 12px** — no más de 16px, no menos de 8px.

---

## 2. Tipografía

- **Jerarquía de 4 niveles máximo por sección**: pill-label → H2 → body copy → label/caption. Nunca 5 niveles en un mismo bloque visual.
- **Números estadísticos: `var(--text-h1)` (38–56px), font-weight 800, color `var(--color-navy)`** — los números deben ser el elemento más grande en su sección.
- **Subtítulos de stats (ej. "Pacientes atendidos"): `var(--text-label)` (12px), weight 400, color `var(--color-text-low)`, mayúsculas** — nunca usar el mismo tamaño que el número.
- **H2 de sección: `var(--text-h2)` (28–42px), font-weight 700** — usar `var(--font-heading)` (Inter), nunca Work Sans para encabezados principales.
- **Body copy de sección: `var(--text-body-m)` (16px), weight 400, `var(--color-text-body)`** — no usar body-s (14px) para párrafos explicativos en secciones clave; reservar 14px para cards y captions.
- **Pill/badge label sobre H2: 12–13px, weight 600, uppercase con letter-spacing 0.08em** — siempre con color de acento (verde o azul primario sobre fondo de contraste).
- **Líneas de texto en párrafos de sección: máximo 60–70 caracteres** (`max-width: 65ch` en columnas de texto) — texto más ancho se vuelve difícil de leer y pierde jerarquía.
- **Nunca justificar texto** — solo `text-align: left` para cuerpo, `text-align: center` solo para stats y labels de sección cortos.

---

## 3. Color

- **Fondo oscuro navy (`var(--color-navy)`, `var(--color-navy-panel)`) solo para máximo 1–2 secciones por página**, y solo cuando se necesita contraste dramático (ej. sección de CTA final, comparativa antes/después, o tarjeta de stat destacada). El contenido informativo vive en fondos claros.
- **La variante de card activa/destacada usa el fondo oscuro** (`var(--color-navy)`) con texto `var(--color-text-high)` — nunca usar la variante oscura como tarjeta secundaria.
- **Gradiente de hero: siempre de azul suave a blanco** (`var(--gradient-hero)`). Nunca un hero blanco puro ni un hero con fondo sólido azul oscuro — el gradiente suave transmite limpieza médica.
- **Los pills/badges de categoría usan acento en negativo**: `background: var(--color-green)` o `var(--color-primary)` con texto oscuro/blanco — nunca un badge gris neutro en una sección de contenido.
- **Color de ícono en cards**: mismo color que el acento de la sección. En fondo claro → `var(--color-primary)`. En fondo oscuro → `var(--color-green)` o `var(--color-text-high)`. Nunca ícono gris sobre fondo claro en contenido médico — pierde credibilidad.
- **Verde (`var(--color-green)`, `var(--color-green-mid)`)**: reservar para indicadores de éxito, contadores positivos ("95% satisfacción"), botones de CTA de reserva. No decorativo.
- **`var(--color-text-low)` (#7A9AB8)**: solo para captions y labels secundarios. Verificar que pase contraste AA (4.5:1) antes de usarlo — está al límite sobre fondos claros.
- **Secciones alternas de contenido**: usar `--cps--white` → `--cps--alt` → `--cps--white` en secuencia. Nunca dos `--cps--alt` consecutivos ni dos secciones oscuras seguidas.

---

## 4. Densidad de información

- **Máximo 3 columnas en grids de servicios/condiciones en desktop** — 4 columnas solo para stats numéricas simples (número + label). Más columnas reducen el impacto de cada card.
- **Máximo 4 items en una lista de bullets sin soporte visual** (ícono, número, o card). Si son 5 o más, convertir a slider de cards o grid 2×N.
- **Cards de servicio o condición: máximo 3 líneas de descripción visible** sin "ver más". Si el copy supera 3 líneas, cortar con ellipsis o reestructurar como accordion.
- **Stats numéricas: máximo 4 en una fila** — si hay 5+, dividir en 2 rows o usar un layout 2×2+1.
- **Sección de equipo médico (doctors)**: si hay más de 3 doctores, usar slider/carousel horizontal. Nunca mostrar más de 3 doctores en grid sin interacción.
- **Formularios de reserva**: máximo 2 campos por fila. Campos de texto largo (nombre, mensaje) siempre a ancho completo. El botón de submit siempre ocupa todo el ancho del formulario.
- **Secciones de 2 columnas (imagen + texto)**: el bloque de texto no debe tener más de 4 puntos de lista ni más de 2 párrafos — la columna visual debe "ganar" en peso óptico.
- **Blog/artículos preview**: mostrar máximo 3 cards en la sección de homepage. Cada card necesita imagen + categoría pill + fecha + título + máximo 2 líneas de extracto.

---

## 5. Componentes interactivos

- **Usar slider/carousel cuando hay 4+ items homogéneos** (doctores, testimonios, casos, artículos) — mostrar 2.5–3 items visibles para indicar que hay más.
- **Tabs para comparar tratamientos o categorías mutuamente excluyentes** (ej. Conservador vs Quirúrgico). Nunca más de 5 tabs — si son 6+, convertir a accordion o dropdown.
- **Accordion para FAQ o contenido secundario expandible** — usar siempre `aria-expanded` y soporte de teclado. El estado cerrado muestra solo la pregunta; el abierto revela la respuesta sin salto de layout.
- **El ítem activo de un tab o slider siempre tiene diferenciador visual claro**: borde azul navy, fondo oscuro, o sombra elevada — no solo un cambio de color de texto.
- **Sliders deben mostrar indicadores de posición** (dots o counter "2/4") — nunca un slider sin retroalimentación de cuántos items hay.
- **Botones de navegación de slider (prev/next)**: círculos de ~40px con ícono de flecha, posicionados afuera del área de contenido o superpuestos en los bordes. Nunca botones de texto plano.
- **El componente de reserva/cita**: siempre como sección dedicada o modal — nunca como inline form en medio de contenido informativo.
- **Hover en cards**: elevar con `var(--shadow-card-lt-hover)` + `translateY(-4px)`. Nunca cambiar el color de fondo de la card en hover — solo la sombra y el desplazamiento vertical.

---

## 6. Micro-detalles de calidad

- **Radius de cards: `var(--radius-lg)` (20px)** para cards principales, `var(--radius-md)` (12px) para cards secundarias y badges de departamento, `var(--radius-sm)` (6px) para form inputs y chips pequeños.
- **Sombras de cards en fondo claro: siempre `var(--shadow-card-lt)`** (`0 2px 16px rgba(24,63,102,0.08)`) — nunca usar `box-shadow: none` en cards sobre fondo blanco puro.
- **Sombras de cards en fondo oscuro: `var(--shadow-card-dk)`** — sombra más pronunciada para separar del fondo navy.
- **Íconos prefijo en campos de formulario** (departamento, teléfono, email, fecha): siempre incluir un ícono SVG alineado verticalmente a la izquierda del placeholder. Sin ícono, los campos se ven genéricos.
- **Pills de categoría/badge**: siempre con padding `6px 14px`, nunca solo texto sin fondo. Usar `border-radius: var(--radius-full)` (9999px).
- **Transiciones en interactivos**: usar `var(--transition-base)` (0.25s ease) para hover/focus. Nada más rápido que 0.15s ni más lento que 0.4s para micro-interacciones.
- **Imágenes de hero**: siempre con el sujeto principal (médico) sobre un fondo recortado o con shape/clip — nunca foto rectangular sin tratamiento en el hero.
- **Chips flotantes de estadísticas (sobre hero)**: fondo blanco, `var(--radius-md)`, `var(--shadow-card-lt)`, ícono pequeño a la izquierda + número bold + label light. Máximo 3 chips, no en línea recta — escalonarlos.
- **Numeración en grids de departamentos/servicios**: usar "01", "02"... (2 dígitos con cero) en `var(--text-label)` + color `var(--color-text-low)` posicionado en corner de la card — da estructura sin ruido.
- **Íconos de redes sociales en cards de doctors**: siempre en círculo outline (~32px), no íconos sueltos. Solo mostrar 3–4 redes relevantes, no todas las disponibles.
- **Borde de inputs de formulario**: `1px solid var(--color-border-lt)` en reposo, `1px solid var(--color-primary)` en focus con `box-shadow: 0 0 0 3px rgba(53,126,179,0.15)` — nunca outline por defecto del browser.
- **Botón submit de formulario**: background `var(--gradient-cta)`, ancho completo dentro del form container, height mínimo 52px, font-weight 700 — no un botón de ancho automático en un formulario.

---

## 7. Reglas de sección (layout macros)

- **Sección 2 columnas imagen+texto**: imagen siempre con un elemento de credibilidad superpuesto (badge de años de experiencia, chip de stat, logo de hospital). Nunca foto sola sin contexto.
- **Sección hero**: estructura obligatoria — badge pill → H1 display → body copy → 2 CTAs (primario + secundario) → indicadores de confianza (íconos pequeños: "Atención 24h", "X años de experiencia").
- **Sección de stats**: siempre como franja horizontal autónoma entre dos secciones de contenido — nunca como último bloque antes del footer. El impacto es máximo cuando rompe el ritmo visual.
- **Sección CTA final (antes del footer)**: fondo oscuro navy, headline grande centrado, un solo CTA prominente. No repetir los mismos CTAs del hero.
- **Footer**: nunca en color oscuro si la sección que le precede ya es oscura — asegurar contraste de fondo entre "CTA final" (navy) y footer (blanco o azul muy claro).

---

*Este documento es la fuente de verdad visual del proyecto. Antes de implementar cualquier sección nueva, verificar que las decisiones de diseño cumplan con estas reglas.*
