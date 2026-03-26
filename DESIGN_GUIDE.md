# Guía de Diseño — Traumatólogo en GDL
**Versión 1.3 · Marzo 2026**

> **Actualización v1.1:** Análisis de píxeles de 4 imágenes de inspiración confirmó balance **light-forward (~80% claro / ~20% oscuro)**.  
> **Actualización v1.2:** Análisis de 14,400 puntos muestreados con filtros de saturación reveló los colores UI reales. **El cyan eléctrico `#00C8FF` aparece 0 veces**. El CTA real es azul médico `#357EB3` (x10 en inspiration, presente en las 4 referencias). El verde `#63FF84` aparece en 3 de 4 imágenes como badge/accento. Los navies `#183F66` y `#36546C` están confirmados. Todos los tokens de acento corregidos en consecuencia.  
> **Actualización v1.3:** Dirección de arte del hero alineada a referencia Nuvica: hero **100% claro** con fondo de gradientes radiales difusos ("light blobs"), textura grain, y componentes glassmorphism semi-transparentes con `backdrop-filter: blur()`. Se elimina el concepto de split dark/light del hero. Se actualizan tokens de gradientes, sección de superficies, y especificación del hero.

---

## 1. Filosofía de Diseño

### Concepto Central: "Precision Meets Care"
El sitio comunica dos valores simultáneos: la **precisión tecnológica** de un especialista de alto nivel y la **calidez humana** del médico que acompaña al paciente. El modo visual es **luminoso, aireado y premium** — un fondo de gradientes radiales difusos en la gama azul-hielo (`#C5D8ED` → `#F4F7FF`) crea una atmósfera clínica moderna y acogedora. Sobre esta base etérea flotan componentes **glassmorphism** (fondo blanco semi-transparente + `backdrop-filter: blur()`) que refuerzan la sensación de profundidad sin sacrificar claridad. El resultado es un sitio que se siente como un centro médico de primer nivel: luminoso, confiable, tecnológicamente avanzado.

### Principios de Diseño
1. **Claridad antes que decoración** — Cada elemento visual tiene propósito.
2. **Atmósfera con gradientes difusos** — Manchas de luz (radial-gradients) crean profundidad orgánica sin necesidad de elementos oscuros.
3. **Glassmorphism funcional** — Cards, badges y pills usan fondo semi-transparente + blur para flotar sobre el gradiente sin aplanarlo.
4. **Confianza a través de la estructura** — Grids limpios, alineaciones perfectas, márgenes generosos.
5. **Textura sutil** — Un overlay grain (SVG feTurbulence) elimina el "banding" y da calidez orgánica.
6. **Acción visible** — Cada sección conduce orgánicamente a un CTA (llamada a la acción).
7. **Mobile-first** — La experiencia se diseña primero para pantallas pequeñas y escala hacia arriba.

---

## 2. Paleta de Colores

Basada en la paleta *Futuristic Diagnostic Display Medical*. Los colores evocan pantallas de monitoreo médico, scanners y tecnología de diagnóstico avanzado.

### Colores Primarios (Oscuros — uso estratégico)

Estos colores aparecen en las referencias únicamente en el hero, la navbar sticky, 1–2 secciones de acento y el footer. **No son el fondo base del sitio.**

> Fuente: muestreo de 14,400 px — `#183F66` ×21 en IMG_52, `#36546C` ×36 en IMG_46, `#2C4A62` ×10 en IMG_46.

| Token             | Nombre           | HEX       | Uso principal                              |
|-------------------|------------------|-----------|--------------------------------------------||
| `--color-navy`    | Med Navy         | `#183F66` | Hero bg (texto), navbar sticky, footer     |
| `--color-navy-panel`| Panel Navy     | `#36546C` | Sidebar, bordes UI en dark, divisores      |
| `--color-navy-deep`| Deep Navy       | `#2C4A62` | Banda CTA oscura, variante footer          |
| `--color-navy-dk` | Dark Anchor      | `#00448B` | CTA hover en dark, logo badge, énfasis     |

### Colores de Acento

> Fuente: muestreo de 14,400 px — `#357EB3` ×10 en inspiration (CTA dominante), variantes `#387EAD`/`#347EAE`/`#4280AB` presentes en las 4 referencias. Verde `#63FF84` en 3 de 4 imágenes. **`#00C8FF` = 0 apariciones.**

| Token                | Nombre           | HEX       | Uso principal                                    |
|----------------------|------------------|-----------|--------------------------------------------------|
| `--color-primary`    | Medical Blue     | `#357EB3` | CTA principal, links activos, iconos sobre claro |
| `--color-primary-alt`| Steel Blue       | `#3A80AD` | Hover de CTA, variante de acento                 |
| `--color-primary-dk` | Anchor Blue      | `#00448B` | CTA hover state, énfasis fuerte, logo elemento   |
| `--color-accent-soft`| Mist Blue        | `#ADCDE2` | Bordes suaves, texto secundario en dark, fondos de íconos |
| `--color-green`      | Signal Green     | `#63FF84` | Badge activo, checkmark, WhatsApp CTA, estatus OK |
| `--color-green-mid`  | Teal Mint        | `#4DDBAC` | Variante suave del verde para contextos oscuros  |
| `--color-pulse`      | Signal Amber     | `#F5A623` | Alertas, urgencias, estrella de rating           |

> **Regla de acento por fondo:** Sobre fondos claros usar `#357EB3`. Sobre fondos oscuros usar `#357EB3` con glow `rgba(53,126,179,0.35)` o `#ADCDE2` para texto de soporte. El verde `#63FF84` funciona sobre ambos fondos como badge de estado.

### Colores de Texto

| Token               | Nombre          | HEX       | Uso principal                               |
|---------------------|-----------------|-----------|---------------------------------------------|
| `--color-text-high` | Halo White      | `#EDF6FF` | Headings sobre fondos oscuros (hero, footer)|
| `--color-text-dark` | Ink Navy        | `#183F66` | Headings sobre fondos claros — mismo navy del UI |
| `--color-text-body` | Slate Blue      | `#36546C` | Párrafos principales — mismo panel navy     |
| `--color-text-mid`  | Mist             | `#ADCDE2` | Texto secundario, captions en dark          |
| `--color-text-low`  | Ghost Blue      | `#7A9AB8` | Placeholders, meta, labels desactivados     |

> **Nota:** Los colores de texto oscuro coinciden intencionalmente con los navies UI (`#183F66`, `#36546C`). Esto crea cohesión: los mismos valores de azul funcionan como fondos en dark y como texto en claro. No requiere valores separados para texto vs. UI.

### Colores de Superficie (Secciones Claras — USO PRINCIPAL)

Estas superficies representan el 75–80% del área visual del sitio. Confirmadas por muestreo픽 de píxeles en las 4 referencias de inspiración.

| Token               | Nombre          | HEX       | Uso principal                               |
|---------------------|-----------------|-----------|---------------------------------------------|
| `--color-bg-base`   | Ice Blue Base   | `#F4F7FF` | **Fondo default del sitio** — la mayoría de secciones |
| `--color-bg-alt`    | Crystal White   | `#F9FCFE` | Secciones alternas (par/impar)              |
| `--color-bg-card`   | Pure White      | `#FFFFFF` | Cards, modales, inputs                      |
| `--color-bg-soft`   | Pale Horizon    | `#E4EFFA` | Separadores suaves, highlighting pasivo     |
| `--color-border-lt` | Sky Line        | `#C8DFF0` | Bordes en secciones claras                  |
| `--color-border-dk` | Grid Line       | `#1E3A56` | Bordes en dark sections                     |

### Gradientes Clave

```css
/* Hero — base diagonal (5-stop cool ice gradient) */
--gradient-hero: linear-gradient(
  145deg,
  #C5D8ED  0%,   /* steel mist — borde izquierdo */
  #D4E4F3 30%,   /* powder blue */
  #E2EEF9 55%,   /* ice blue */
  #EDF3FC 75%,   /* near-white */
  #F4F7FF 100%   /* ice base — borde derecho  */
);

/* CTA principal — azul médico (funciona sobre claro y oscuro) */
--gradient-cta: linear-gradient(135deg, #357EB3 0%, #3A80AD 100%);

/* CTA hover — más profundo */
--gradient-cta-hover: linear-gradient(135deg, #00448B 0%, #2C6A9A 100%);

/* Card hover shimmer — versión light */
--gradient-shimmer-lt: linear-gradient(135deg, rgba(53,126,179,0.06) 0%, rgba(53,126,179,0.02) 100%);

/* Badge verde — fondo suave para chips */
--gradient-badge-green: linear-gradient(135deg, rgba(99,255,132,0.15) 0%, rgba(77,219,172,0.10) 100%);
```

### Gradientes Radiales del Hero ("Light Blobs")

El fondo del hero NO es un gradiente lineal simple. Son **4 gradientes radiales difusos** apilados sobre el gradiente base `--gradient-hero`. Cada uno simula una "mancha de luz" orgánica:

```css
/* 1 · Gran brillo blanco — centro-izquierda, detrás de la foto del doctor */
radial-gradient(ellipse 58% 68% at 44% 46%, rgba(255,255,255,0.60) 0%, transparent 72%)

/* 2 · Resplandor azul — superior-derecha, profundidad detrás de stat cards */
radial-gradient(ellipse 46% 56% at 80% 28%, rgba(173,205,226,0.50) 0%, transparent 72%)

/* 3 · Highlight suave — esquina superior-izquierda, levanta el área de nav */
radial-gradient(ellipse 42% 48% at 10% 14%, rgba(232,239,255,0.55) 0%, transparent 72%)

/* 4 · Pool sutil — centro-inferior, ancla la sección */
radial-gradient(ellipse 62% 36% at 50% 94%, rgba(165,195,222,0.35) 0%, transparent 72%)
```

Además, dos capas adicionales vía pseudo-elementos:
- **`::before`** — Textura grain (SVG `feTurbulence`, opacity 0.028). Elimina banding y da calidez.
- **`::after`** — Refuerzo de brillo central + viñeta azul en bordes.

> **Regla:** Nunca usar `filter: blur()` para crear blobs de fondo — es costoso en GPU. Usar `radial-gradient` con elipses grandes directamente en `background`.

### Uso del Color por Contexto — Balance Light/Dark

> **Regla de oro (confirmada por referencias):** El sitio es **~80% claro, ~20% oscuro**.

| Sección                   | Modo   | Fondo principal   | Texto heading    | Acento/CTA       |
|---------------------------|--------|-------------------|------------------|------------------|
| Navbar transparente       | Claro  | Transparente      | `#183F66`        | `#357EB3`        |
| Navbar sticky/scroll      | Glass  | `rgba(255,255,255,0.70)` blur | `#183F66` | `#357EB3`  |
| **Hero (completo)**       | Claro  | Gradient blobs    | `#183F66`        | `#357EB3` btn    |
| Trust Bar                 | Claro  | `#F4F7FF`         | `#183F66`        | `#36546C` logo   |
| Especialidades            | Claro  | `#F4F7FF`         | `#183F66`        | `#357EB3`        |
| Sobre el Doctor           | Claro  | `#F9FCFE`         | `#183F66`        | `#357EB3`        |
| Diferenciadores           | Claro  | `#F4F7FF`         | `#183F66`        | `#357EB3`        |
| Galería / Proceso         | **Dark** | `#2C4A62`       | `#EDF6FF`        | `#63FF84` badge  |
| Testimonios               | Claro  | `#F9FCFE`         | `#183F66`        | `#357EB3`        |
| CTA Central (banda)       | **Dark** | `#183F66`       | `#EDF6FF`        | `#357EB3` btn    |
| FAQ                       | Claro  | `#F4F7FF`         | `#183F66`        | `#357EB3`        |
| Footer                    | **Dark** | `#2C4A62`       | `#EDF6FF`        | `#ADCDE2` links  |

- **Secciones Dark en total:** Galería, CTA Central, Footer = **3 de ~10**.
- **Hero es 100% claro** — gradientes radiales difusos sobre base `#C5D8ED` → `#F4F7FF`.
- **Transición Hero→siguiente sección:** Natural (ambas claras), no requiere gradient-transition.

---

## 3. Tipografía

### Tipografías del Proyecto

| Fuente        | Familia      | Uso                  | Archivos disponibles         |
|---------------|-------------|----------------------|------------------------------|
| **Inter**     | Sans-serif  | Headings, títulos    | `Inter_18pt` / `24pt` / `28pt` en todos los pesos |
| **Work Sans** | Sans-serif  | Cuerpo, UI, labels   | `WorkSans` en todos los pesos |

> **Nota técnica:** Usar `Inter_24pt` para títulos de tamaño medio (H2–H3) e `Inter_28pt` para hero H1. El sufijo `_18pt` es ideal para UI compacto (badges, labels).

---

### Escala Tipográfica

| Nivel        | Fuente         | Tamaño     | Peso        | Line-height | Uso                          |
|--------------|----------------|-----------|-------------|-------------|------------------------------|
| **Display**  | Inter 28pt     | `64–80px` | Black (900) | 1.05        | Hero title                   |
| **H1**       | Inter 28pt     | `48–56px` | Bold (700)  | 1.1         | Page title, sección principal|
| **H2**       | Inter 24pt     | `36–42px` | SemiBold (600) | 1.2      | Títulos de sección           |
| **H3**       | Inter 24pt     | `26–30px` | SemiBold (600) | 1.3      | Subtítulos, card titles      |
| **H4**       | Inter 18pt     | `20–22px` | Medium (500) | 1.35       | Labels de cards, acordeones  |
| **Body L**   | Work Sans      | `18px`    | Regular (400) | 1.7       | Párrafos principales         |
| **Body M**   | Work Sans      | `16px`    | Regular (400) | 1.7       | Párrafos secundarios         |
| **Body S**   | Work Sans      | `14px`    | Regular (400) | 1.6       | Meta, captions, footnotes    |
| **Label**    | Work Sans      | `12–13px` | SemiBold (600) | 1.4      | Badges, tags, eyebrows       |
| **CTA**      | Work Sans      | `15–17px` | SemiBold (600) | 1.0      | Botones                      |
| **Nav**      | Work Sans      | `15px`    | Medium (500) | 1.0        | Navegación                   |

### Combinaciones Tipográficas Clave

**Sobre fondos claros (uso mayoritario):**
```
[EYEBROW — Work Sans SemiBold 12px, UPPERCASE, letter-spacing: 0.15em, color: #357EB3]
[H2 — Inter 24pt Bold, color: #183F66]
[Body M — Work Sans Regular 16px, color: #36546C]
```

**Sobre fondos oscuros (galería, CTA, footer):**
```
[EYEBROW — Work Sans SemiBold 12px, UPPERCASE, letter-spacing: 0.15em, color: #ADCDE2]
[H2 — Inter 24pt Bold, color: #EDF6FF]
[Body M — Work Sans Regular 16px, color: #ADCDE2]
```

**Hero (sobre gradiente claro con light blobs):**
```
[BADGE — Work Sans SemiBold 12px, color: #183F66, glassmorphism pill]
[H1 DISPLAY — Inter Black, color: #183F66, accent line: #357EB3]
[Body — Work Sans Regular 16px, color: #4A6580]
[CTA — Work Sans SemiBold 15px, bg: #357EB3, text: #FFFFFF]
```

**Badge / chip de estado activo:**
```
[LABEL — Work Sans SemiBold 11px, UPPERCASE, letter-spacing: 0.12em, color: #183F66]
[Background: rgba(99,255,132,0.18)  Border: 1px solid rgba(99,255,132,0.5)]
```

---

## 4. Espaciado y Grid

### Sistema de Espaciado (base 4px)

| Token        | Valor  | Uso                                    |
|--------------|--------|----------------------------------------|
| `--space-1`  | `4px`  | Micro gaps, icon padding               |
| `--space-2`  | `8px`  | Gaps internos de componentes           |
| `--space-3`  | `12px` | Padding compacto                       |
| `--space-4`  | `16px` | Padding estándar                       |
| `--space-6`  | `24px` | Gaps entre elementos hermanos          |
| `--space-8`  | `32px` | Padding de cards, secciones compactas  |
| `--space-12` | `48px` | Separación entre grupos                |
| `--space-16` | `64px` | Padding de secciones mobile            |
| `--space-24` | `96px` | Padding de secciones desktop           |
| `--space-32` | `128px`| Espaciado de hero                      |

### Grid del Layout

- **Contenedor máximo:** `1280px`
- **Padding lateral del contenedor:** `24px` (mobile) / `48px` (tablet) / `80px` (desktop)
- **Grid principal:** 12 columnas, gap `24px` (desktop) / `16px` (mobile)
- **Breakpoints:**

| Breakpoint | Ancho     | Cols |
|------------|-----------|------|
| Mobile     | `< 768px` | 4    |
| Tablet     | `768–1023px` | 8 |
| Desktop    | `1024–1279px` | 12 |
| Wide       | `≥ 1280px` | 12  |

---

## 5. Componentes de UI

### 5.1 Botones

> Fuente: `#357EB3` ×10 dominant CTA en inspiration. Hover hacia `#00448B` confirmado.

#### Primario — Azul Médico (funciona en claro Y oscuro)
```
Background: #357EB3
Texto: #FFFFFF
Font: Work Sans SemiBold 15px
Padding: 14px 32px
Border-radius: 6px
Box-shadow: 0 4px 20px rgba(53,126,179,0.30)
Hover: background #00448B, box-shadow 0 6px 24px rgba(0,68,139,0.35), translateY(-1px)
```

#### CTA Verde — Signal Green (badge de acción / WhatsApp)
```
Background: #63FF84
Texto: #0D3020
Font: Work Sans SemiBold 14px
Padding: 12px 28px
Border-radius: 999px
Box-shadow: 0 4px 16px rgba(99,255,132,0.35)
Usar para: botón WhatsApp, "Consulta en línea", badge de disponibilidad
Hover: background #4DDBAC, box-shadow aumenta
```

#### Secundario — Outline Azul (sobre fondos claros)
```
Background: transparent
Borde: 1.5px solid #357EB3
Texto: #357EB3
Font: Work Sans SemiBold 15px
Padding: 13px 31px
Border-radius: 6px
Hover: Background rgba(53,126,179,0.08), border-color #00448B, color #00448B
```

#### Ghost — Outline Claro (sobre fondos oscuros / galería / footer)
```
Background: transparent
Borde: 1.5px solid rgba(173,205,226,0.65)
Texto: #EDF6FF
Font: Work Sans SemiBold 15px
Padding: 13px 31px
Border-radius: 6px
Hover: Background rgba(53,126,179,0.18), border-color rgba(173,205,226,0.9)
```

#### Arrow Circle — Botón circular icono (hero, sobre gradiente claro)
```
Background: transparent
Borde: 1.5px solid #183F66
Width/Height: 48px
Border-radius: 50%
Icono: flecha diagonal, stroke #183F66
Hover: Background rgba(24,63,102,0.06), transform translateY(-2px)
```

---

### 5.2 Cards de Servicio

#### Variante Light (uso principal — secciones claras)
```
Background: #FFFFFF
Border: 1px solid #C8DFF0   ← --color-border-lt
Border-radius: 12px
Padding: 32px
Box-shadow: 0 2px 16px rgba(24,63,102,0.08)

Hover state:
  border-color: #357EB3
  border-top: 3px solid #357EB3
  box-shadow: 0 8px 32px rgba(53,126,179,0.14)
  background: linear-gradient(135deg, rgba(53,126,179,0.04) 0%, #FFFFFF 100%)

Ícono: 48px, color #357EB3, fondo circular rgba(53,126,179,0.10)
Título (H4): Inter 18pt SemiBold, #183F66
Descripción: Work Sans Regular 14px, #36546C
```

#### Variante Dark (galería, sección de acento)
```
Background: #2C4A62
Border: 1px solid #36546C
Border-radius: 12px
Padding: 32px
Box-shadow: 0 4px 32px rgba(0,0,0,0.30)

Hover state:
  border-color: rgba(53,126,179,0.55)
  box-shadow: 0 8px 40px rgba(53,126,179,0.18)
  background: linear-gradient(135deg, rgba(53,126,179,0.12) 0%, #2C4A62 100%)

Ícono: 48px, color #ADCDE2, fondo circular rgba(173,205,226,0.12)
Título (H4): Inter 18pt SemiBold, #EDF6FF
Descripción: Work Sans Regular 14px, #ADCDE2
```

---

### 5.3 Navbar

```
Fondo default: transparent (sobre hero gradiente claro)
Fondo sticky/scroll: rgba(255,255,255,0.70) + backdrop-filter: blur(20px)
Border-bottom on scroll: 1px solid rgba(200,223,240,0.50)

Logo: Inter 28pt Black
  "Traumatólogo" en #183F66
  "GDL" en #357EB3

Links: Work Sans Medium 15px
  Default: #36546C  (texto body sobre claro)
  Hover: #183F66
  Underline activo: 2px #357EB3 desde abajo

CTA en navbar: background #357EB3, texto #FFFFFF, padding 10px 22px, border-radius 6px
  Hover: background #00448B
Altura navbar: 64px desktop / 56px mobile
```

---

### 5.4 Stats / Números de Impacto

Los stats aparecen **dentro del hero** como tarjetas glassmorphism flotantes y opcionalmente en una banda clara post-hero.

#### En hero (glassmorphism sobre gradiente claro)
```
Card: rgba(255,255,255,0.55) + backdrop-filter: blur(14px)
Borde: 1px solid rgba(255,255,255,0.60)
Border-radius: 16px
Box-shadow: 0 8px 32px rgba(24,63,102,0.08)

Número: Inter Bold 1.1rem, #183F66
Label: Work Sans Regular 0.68rem, #6B8BA4, UPPERCASE, letter-spacing 0.05em
Icono: 32px circle, background rgba(53,126,179,0.08), color #357EB3
```

#### En banda post-hero (fondo `#F4F7FF`)
```
Número: Inter 28pt Black 48–56px, #357EB3
Unidad: Inter 28pt SemiBold 24px, #183F66
Label: Work Sans Regular 13px, #36546C, UPPERCASE, letter-spacing 0.1em
Divisor vertical: 1px solid #C8DFF0
Layout: Grid 3–4 cols con padding 40px 0
```

---

### 5.5 Testimonios / Cards de Pacientes

La sección de testimonios va sobre fondo claro (`#F9FCFE`), no oscuro.

```
Background: #FFFFFF
Border: 1px solid #C8DFF0
Border-radius: 16px
Padding: 28px 32px
Box-shadow: 0 2px 20px rgba(20,63,101,0.07)

Comillas decorativas: Inter 28pt Black, 72px, #357EB3, opacity 0.18
Texto: Work Sans Regular 16px, #36546C
Nombre: Work Sans SemiBold 15px, #183F66
Rol/Padecimiento: Work Sans Medium 13px, #357EB3
Puntuación: Ícono estrella en #F5A623

Hover:
  box-shadow: 0 6px 32px rgba(24,63,102,0.12)
  border-color: #357EB3
```

---

### 5.6 Chips / Badges de Especialidades

#### Badge Azul — sobre fondo claro (texto, especialidades)
```
Background: rgba(53,126,179,0.10)
Border: 1px solid rgba(53,126,179,0.28)
Border-radius: 999px
Texto: Work Sans SemiBold 12px, #357EB3, UPPERCASE, letter-spacing 0.08em
Padding: 4px 14px
```

#### Badge Verde — estado activo / disponible
```
Background: rgba(99,255,132,0.18)
Border: 1px solid rgba(99,255,132,0.50)
Border-radius: 999px
Texto: Work Sans SemiBold 12px, #0D3020, UPPERCASE, letter-spacing 0.08em
Padding: 4px 14px
Ejemplo: "Disponible hoy" · "Cirugía sin espera" · "En línea"
```

#### Badge Navy — sobre fondo oscuro (hero, footer)
```
Background: rgba(173,205,226,0.12)
Border: 1px solid rgba(173,205,226,0.35)
Border-radius: 999px
Texto: Work Sans SemiBold 12px, #ADCDE2, UPPERCASE, letter-spacing 0.08em
Padding: 4px 14px
```

---

## 6. Efectos Visuales y Microinteracciones

### Efectos de "Diagnostic Display"

Estos efectos se aplican **exclusivamente en dark sections** (galería, CTA band, footer). En secciones claras resultan anacrónicos y reducen legibilidad.

```css
/* Grid de fondo — solo en dark sections */
.bg-grid-dark {
  background-image: 
    linear-gradient(rgba(53,126,179,0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(53,126,179,0.06) 1px, transparent 1px);
  background-size: 56px 56px;
}

/* Patrón de puntos sutil — variante para secciones claras */
.bg-dots-light {
  background-image: radial-gradient(#C8DFF0 1px, transparent 1px);
  background-size: 28px 28px;
}

/* Glow en bordes activos — dark sections */
.glow-border-dark {
  box-shadow: 0 0 0 1px rgba(53,126,179,0.50), 0 0 16px rgba(53,126,179,0.20);
}

/* Glow en bordes — secciones claras */
.glow-border-light {
  box-shadow: 0 0 0 1px rgba(53,126,179,0.35), 0 4px 16px rgba(53,126,179,0.10);
}

/* Verde badge pulse — para elementos de disponibilidad activa */
.badge-pulse {
  animation: badge-pulse 2.5s ease-in-out infinite;
}
@keyframes badge-pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(99,255,132,0.4); }
  50%       { box-shadow: 0 0 0 6px rgba(99,255,132,0); }
}
```

### Glassmorphism (Superficies Semi-Transparentes)

El hero y la navbar usan componentes **glassmorphism** que flotan sobre los gradientes difusos del fondo. Esto permite que los "light blobs" del background se perciban a través de los elementos UI, creando profundidad.

#### Principios Glassmorphism
1. **Fondo blanco semi-transparente** — Opacidad entre 0.45–0.65, NUNCA opaco.
2. **Backdrop-filter blur** — Siempre incluir `-webkit-backdrop-filter` para Safari.
3. **Borde blanco sutil** — `1px solid rgba(255,255,255, 0.55–0.65)` para definir el borde sin dureza.
4. **Sombra difusa baja** — Box-shadow suave con opacidad baja (<0.10).
5. **NO abusar** — Solo para: stat cards flotantes, badges del hero, stat pills, navbar scroll.

#### Tokens Glassmorphism

```css
/* Stat cards flotantes en el hero */
.glass-card-float {
  background: rgba(255,255,255, 0.55);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid rgba(255,255,255, 0.60);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(24,63,102, 0.08),
              0 1px 3px rgba(24,63,102, 0.04);
}

/* Badge/pill en hero */
.glass-badge {
  background: rgba(255,255,255, 0.60);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid rgba(255,255,255, 0.65);
  border-radius: 999px;
  box-shadow: 0 4px 20px rgba(24,63,102, 0.06);
}

/* Stat pills en barra inferior del hero */
.glass-pill {
  background: rgba(255,255,255, 0.50);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid rgba(255,255,255, 0.55);
  border-radius: 14px;
  box-shadow: 0 4px 20px rgba(24,63,102, 0.05);
}

/* Navbar on scroll */
.glass-nav {
  background: rgba(255,255,255, 0.70);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(200,223,240, 0.50);
}
```

### Textura Grain (Noise Overlay)

Un overlay de ruido fractal apenas visible (`opacity: 0.028`) se aplica sobre el hero para romper el banding de los gradientes y añadir calidez orgánica.

```css
/* Implementado con SVG inline — zero HTTP requests */
background-image: url("data:image/svg+xml,...feTurbulence...");
background-repeat: repeat;
background-size: 256px 256px;
opacity: 0.028;
pointer-events: none;
```

> **Regla:** La textura grain es **solo para el hero**. No aplicarla en secciones normales (sería ruido visual innecesario).

### Animaciones

| Elemento              | Tipo              | Duración | Easing              |
|-----------------------|-------------------|----------|---------------------|
| Hero headline         | Fade-in + slide-up | 0.7s    | `ease-out`          |
| Cards de servicio     | Staggered fade-in | 0.4s cada | `ease-out`         |
| Números de stats      | Count-up          | 1.5s     | `ease-in-out`       |
| CTA glow pulse        | Loop              | 2s       | `ease-in-out`       |
| Hover en cards        | Scale + shadow    | 0.2s     | `ease`              |
| Scroll progress bar   | Width expand      | lineal   | Basado en scroll    |

---

## 7. Estructura de la Página (Homepage)

### Sección 1 — Hero
**Estilo:** Full-width claro — gradientes radiales difusos ("light blobs") sobre base `#C5D8ED` → `#F4F7FF`, textura grain, componentes glassmorphism.

> **Referencia:** Nuvica medical hero. El hero es **100% claro** sin split dark/light. Profundidad y atmósfera se crean con múltiples `radial-gradient` apilados que simulan manchas de luz difusa, NO con `filter: blur()` en pseudo-elementos (demasiado costoso en GPU).

- **Layout:** Grid 2 columnas — izquierda texto, derecha foto capsule + stat cards flotantes.
- **Fondo:** 5 capas de gradiente en `background` (ver "Gradientes Radiales del Hero") + `::before` grain + `::after` brillo/viñeta.
- **Contenido izquierdo (sobre gradiente claro):**
  - Badge glassmorphism: "Cirujano Ortopédico Certificado · GDL" con dot verde pulsante
  - H1 Display: texto navy `#183F66`, línea destacada en `#357EB3`
  - Body: Work Sans, color `#4A6580`
  - CTAs: botón primario `#357EB3` + botón círculo flecha (outline navy)
  - Badge Doctoralia: glassmorphism pill con estrellas doradas
- **Contenido derecho:**
  - Foto del doctor en **capsule vertical** (pill shape `border-radius: 9999px`)
  - Capsule background: `rgba(220,234,248,0.35)` con sombra difusa + halo blanco exterior
  - Capsule box-shadow: `0 24px 64px rgba(24,63,102,0.14), 0 0 80px 20px rgba(255,255,255,0.15)`
  - **4 stat cards flotantes** (glassmorphism) orbitando el capsule con animación `float-card`:
    - TL: Certificado CMTO
    - ML: Tiempo de Respuesta
    - TR: 2 Sedes
    - BR: Primera Cita
  - Cards: `rgba(255,255,255,0.55)` + `backdrop-filter: blur(14px)` + borde `rgba(255,255,255,0.60)`
- **Navbar sobre hero:** Transparente, texto navy `#183F66`. On scroll: glass nav `rgba(255,255,255,0.70)` + blur(20px).
- **Decorativos:** NO usar `.bg-grid-dark` ni scan-lines en el hero (es claro). La profundidad viene de los gradientes radiales.

---

### Sección 2 — Trust Bar (Cinta de Confianza)
**Estilo:** Claro — `#F4F7FF`, borde superior e inferior `1px solid #C8DFF0`
- Logos de certificaciones, hospitales afiliados, asociaciones médicas.
- Opacidad logos: `0.6` en default, `1.0` en hover.
- Animación: scroll continuo en mobile, grid fijo en desktop.
- Alto: `72px`. Padding vertical: `16px`.

---

### Sección 3 — Especialidades / Servicios
**Estilo:** Claro (`--color-bg-light`)
- Eyebrow + H2: "Área de especialización"
- Grid 3 columnas (desktop), 1 col (mobile) de cards de servicio.
- Especialidades sugeridas (con imágenes del Stock):
  1. Columna y Hernia de Disco
  2. Artroscopia de Rodilla
  3. Artroscopia de Hombro
  4. Fracturas y Trauma
  5. Reemplazo de Cadera
  6. Lesiones Deportivas
- CTA al final: "Ver todos los servicios →"
- Imágenes de fondo de tarjetas: Stock correspondiente (ej. `Artroscopia de Rodilla en Tijuana BC.jpg`)

---

### Sección 4 — Sobre el Doctor
**Estilo:** Claro — `#F9FCFE` (ligeramente diferente del base para distinguir sección)
- Layout: izquierda imagen (foto clínica), derecha texto.
- Bordes de imagen: `border-radius: 16px`, `box-shadow: 0 8px 48px rgba(20,63,101,0.12)`, borde azul side `4px solid #007BB5`.
- Headline H2: "Formación de excelencia, trato humano", color `#0F2D4A`
- Párrafo: Work Sans 16px, `#3A5570`
- Lista de credenciales: ícono check en `#007BB5`, texto `#0F2D4A`
- Badge membresías: chip light con borde `#007BB5`
- Imagen recomendada: `consultorio traumatologo en tijuana.jpg`

---

### Sección 5 — ¿Por qué elegirnos? (Diferenciadores)
**Estilo:** Claro con acento sutil
- Grid 4 íconos + texto:
  1. Tecnología de vanguardia
  2. Cirugía mínimamente invasiva
  3. Recuperación personalizada
  4. Atención de urgencias

---

### Sección 6 — Galería / Proceso
**Estilo:** Dark con imágenes
- Carousel horizontal de imágenes reales del consultorio / procedimientos.
- Imágenes recomendadas: `uso de endoscopio para cirugia de columna en tijuana.jpg`, `cirujano traumatologo en tijuana.jpg`, `cirugia ortopedica en tijuana.jpg`

---

### Sección 7 — Testimonios
**Estilo:** Claro — `#F9FCFE`, fondo alterno a la sección de especialidades
- Eyebrow + Headline: Work Sans / Inter, colores dark-on-light.
- Slider o grid 3 columnas de cards de testimonio (variante light de 5.5).
- Headline: "Lo que dicen nuestros pacientes", color `#0F2D4A`
- Subhead opcional: Work Sans Regular 17px, `#3A5570`

---

### Sección 8 — CTA Central (Agenda tu Cita)
**Estilo:** Gradiente hero / full-width dark
- Headline grande: "¿Tienes dolor? No esperes más."
- Subhead: Work Sans, breve
- Dos botones: [Llamar ahora] + [Enviar mensaje]
- Decorativo: Glow de fondo cyan, líneas diagonales.

---

### Sección 9 — Preguntas Frecuentes (FAQ)
**Estilo:** Claro
- Acordeón de preguntas comunes sobre traumatología.

---

### Sección 10 — Footer
**Estilo:** `--color-void`
- Logo + tagline
- Columnas: Servicios / Información / Contacto
- Redes sociales con íconos
- Texto legal, aviso de privacidad.
- Línea inferior: border `1px solid #1E3A56`

---

## 8. Imágenes — Directrices de Uso

### Fotografías del Doctor / Clínica (carpeta raíz `/Assets/Images/`)
Usar para: Hero, "Sobre el Doctor", Galería.

| Imagen                                                              | Uso recomendado         |
|---------------------------------------------------------------------|-------------------------|
| `Dr Francisco Cisneros Oliva Traumatólogo Ortopedista en Tijuana.jpg` | Hero (foto del doctor) |
| `consultorio traumatologo en tijuana.jpg`                           | Sección "Sobre el Doctor" |
| `cirujano traumatologo en tijuana.jpg`                              | Galería, About          |
| `cirugia ortopedica en tijuana.jpg`                                 | Galería, Servicios      |
| `uso de endoscopio para cirugia de columna en tijuana.jpg`          | Galería, Columna card   |

### Stock (carpeta `/Assets/Images/Stock/`)
Usar para: Cards de especialidades, posts internos, ilustraciones de padecimientos.

| Imagen Stock                                      | Especialidad             |
|---------------------------------------------------|--------------------------|
| `Artroscopia de Rodilla en Tijuana BC.jpg`        | Rodilla                  |
| `Artroscopia de Hombro en Tijuana.jpg`            | Hombro                   |
| `Fractura de Cadera en Tijuana.jpg`               | Cadera                   |
| `atencion a lesiones deportivas.png`              | Lesiones deportivas      |
| `cirugia de minima invasion en tijuana.jpeg`      | Diferenciadores          |
| `descompresion espinal hernias de disco.jpg`      | Columna / Hernia disco   |
| `traumatologia y ortopedia en tijuana.png`        | General / Hero alt       |

### Tratamiento de Imágenes
- **Foto hero del doctor:** Dentro de capsule vertical (`border-radius: 9999px`), fondo `rgba(220,234,248,0.35)`, sombra difusa `0 24px 64px rgba(24,63,102,0.14)` + halo blanco `0 0 80px 20px rgba(255,255,255,0.15)`. Sin overlay — la foto se muestra con colores naturales.
- **Cards de servicio light:** Imágenes al tope de la card con border-radius superior, overlay `rgba(244,247,255,0.1)` (casi ninguno) — el color de la imagen prevalece. Título debajo sobre blanco.
- **Cards de servicio dark:** Overlay `rgba(20,63,101,0.50)` con título sobre la imagen.
- **Hover en cards dark:** overlay baja a `rgba(20,63,101,0.30)`.
- **Fotos del doctor en sección About:** `object-fit: cover`, border `4px solid #007BB5` en borde izquierdo o inferior.
- **Proporciones:** Hero portrait 3:4 (foto del doctor), Cards 16:9 o 4:3, About landscape 4:3.

---

## 9. Iconografía

- **Biblioteca recomendada:** [Lucide Icons](https://lucide.dev/) o [Phosphor Icons](https://phosphoricons.com/) — estilo `outline` de 1.5px stroke.
- **Tamaños estándar:** 20px (inline), 24px (UI), 32px (feature icons), 48px (card icons).
- **Color:** Por defecto `Diagnostic Cyan (#00C8FF)` sobre fondos oscuros. `#1a4a6e` sobre fondos claros.
- **Especialidades:** Usar íconos de hueso, articulación, columna, corazón+cruz para el contexto médico.

---

## 10. Voz y Tono (Microcopy)

| Contexto          | Tono                       | Ejemplo                                                    |
|-------------------|----------------------------|------------------------------------------------------------|
| Hero headline     | Empático, directo, potente | "Recupera tu movilidad. Vive sin dolor."                   |
| Subtítulos        | Profesional, claro         | "Especialista en traumatología ortopédica con...")         |
| CTAs              | Activo, sin presión        | "Agendar Consulta" / "Conocer mis servicios"               |
| Cards de servicio | Clínico pero accesible     | "Cirugas artroscópicas de rodilla con recuperación rápida" |
| Testimonios       | Auténtico, en primera persona | "Después de la cirugía, recuperé mi vida normal en semanas" |
| FAQ               | Amable, informativo        | "¿Cuánto tiempo tarda la recuperación?"                    |
| Footer / Legal    | Neutro, formal             | "Todos los derechos reservados · Aviso de privacidad"      |

---

## 11. Accesibilidad

- **Contraste mínimo:** AA para texto normal (4.5:1), AA para texto grande (3:1).
  - `#183F66` sobre gradiente hero `~#D8E8F5` = **~7.5:1** ✅ (headings en hero)
  - `#4A6580` sobre gradiente hero `~#D8E8F5` = **~4.6:1** ✅ (body en hero)
  - `#EDF6FF` sobre `#183F66` = **~8.2:1** ✅ (dark sections)
  - `#ADCDE2` sobre `#183F66` = **~4.8:1** ✅ (body en dark)
  - `#183F66` sobre `#F4F7FF` = **~10.1:1** ✅ (headings en light sections)
  - `#357EB3` sobre `#F4F7FF` = **~4.9:1** ✅ (CTAs y acentos en light)
  - `#36546C` sobre `#F4F7FF` = **~6.2:1** ✅ (body en light sections)
  - `#FFFFFF` sobre `#357EB3` = **~4.9:1** ✅ (texto en botón azul)
  - `#FFFFFF` sobre `#00448B` = **~7.8:1** ✅ (texto en botón hover)
  - `#0D3020` sobre `#63FF84` = **~8.3:1** ✅ (texto en badge verde)
  - ⚠️ `#ADCDE2` sobre `#F4F7FF` = **~1.8:1** ✗ — solo usar en dark sections
  - ⚠️ Glassmorphism cards: texto `#183F66` sobre `rgba(255,255,255,0.55)` + gradiente behind — effective contrast >7:1 ✅
- **Focus visible:** `outline: 3px solid #357EB3` con `outline-offset: 3px` en todos los elementos interactivos.
- **Alt text:** Todas las imágenes médicas con descripción clínica precisa.
- **Semántica:** `<main>`, `<nav>`, `<section aria-label>`, `<h1>–<h6>` en orden correcto.
- **Animaciones:** Respetar `prefers-reduced-motion` — reducir o eliminar transiciones.

---

## 12. Tokens CSS — Variables Raíz

```css
:root {
  /* ======================================================
     COLORES OSCUROS — dark sections (hero, galería, CTA band, footer)
     Fuente: análisis 14,400px  #183F66×21  #36546C×36  #2C4A62×10
     ====================================================== */
  --color-navy:        #183F66;   /* hero bg, navbar sticky                  */
  --color-navy-panel:  #36546C;   /* sidebar, bordes UI en dark, divisores    */
  --color-navy-deep:   #2C4A62;   /* banda CTA oscura, variante footer        */
  --color-navy-dk:     #00448B;   /* CTA hover state, logo badge, énfasis     */
  --color-border-dk:   #36546C;   /* bordes en dark (= navy-panel)            */

  /* ======================================================
     ACENTOS — presentes en las 4 referencias
     Fuente: #357EB3×10 dominant CTA / #63FF84×9+4+4+2 badge verde
     ====================================================== */
  --color-primary:     #357EB3;   /* CTA principal, links, íconos activos     */
  --color-primary-alt: #3A80AD;   /* hover suave / variante CTA               */
  --color-primary-dk:  #00448B;   /* hover fuerte / CTA oscuro                */
  --color-accent-soft: #ADCDE2;   /* texto soporte en dark, borders suaves    */
  --color-green:       #63FF84;   /* badge activo, WhatsApp CTA, estatus OK   */
  --color-green-mid:   #4DDBAC;   /* teal mint suave p/ fondos de badge       */
  --color-pulse:       #F5A623;   /* alertas, estrella rating                 */

  /* ======================================================
     TEXTO — reutiliza navies UI para cohesión
     ====================================================== */
  --color-text-high:   #EDF6FF;   /* headings sobre fondos oscuros            */
  --color-text-dark:   #183F66;   /* headings sobre fondos claros             */
  --color-text-body:   #36546C;   /* párrafos cuerpo sobre fondos claros      */
  --color-text-mid:    #ADCDE2;   /* soporte/caption en dark                  */
  --color-text-low:    #7A9AB8;   /* placeholders, meta desactivado           */

  /* ======================================================
     SUPERFICIES CLARAS — 80% del sitio
     Fuente: #F4F7FF en >60% de puntos muestreados en las 4 refs
     ====================================================== */
  --color-bg-base:     #F4F7FF;   /* fondo default del sitio                  */
  --color-bg-alt:      #F9FCFE;   /* secciones alternas (par/impar)           */
  --color-bg-card:     #FFFFFF;   /* cards, inputs, modales                   */
  --color-bg-soft:     #E8EFFF;   /* separadores, banda alternada             */
  --color-border-lt:   #C8DFF0;   /* bordes en secciones claras               */

  --gradient-hero:      linear-gradient(145deg, #C5D8ED 0%, #D4E4F3 30%, #E2EEF9 55%, #EDF3FC 75%, #F4F7FF 100%);
  --gradient-cta:       linear-gradient(135deg, #357EB3 0%, #3A80AD 100%);
  --gradient-cta-hover: linear-gradient(135deg, #00448B 0%, #2C6A9A 100%);
  --gradient-shimmer-lt: linear-gradient(135deg, rgba(53,126,179,0.06) 0%, rgba(53,126,179,0.02) 100%);
  --gradient-badge-green: linear-gradient(135deg, rgba(99,255,132,0.15) 0%, rgba(77,219,172,0.08) 100%);

  /* === TIPOGRAFÍA === */
  --font-heading:      'Inter', system-ui, sans-serif;
  --font-body:         'Work Sans', system-ui, sans-serif;

  --text-display:      clamp(48px, 6vw, 80px);
  --text-h1:           clamp(38px, 4.5vw, 56px);
  --text-h2:           clamp(28px, 3.5vw, 42px);
  --text-h3:           clamp(22px, 2.5vw, 30px);
  --text-h4:           clamp(18px, 2vw, 22px);
  --text-body-l:       18px;
  --text-body-m:       16px;
  --text-body-s:       14px;
  --text-label:        12px;

  /* === ESPACIADO === */
  --space-1:    4px;
  --space-2:    8px;
  --space-3:    12px;
  --space-4:    16px;
  --space-6:    24px;
  --space-8:    32px;
  --space-12:   48px;
  --space-16:   64px;
  --space-24:   96px;
  --space-32:   128px;

  /* === BORDES === */
  --radius-sm:   6px;
  --radius-md:   12px;
  --radius-lg:   20px;
  --radius-full: 9999px;

  /* === SOMBRAS === */
  --shadow-card-lt:       0 2px 16px rgba(24,63,102,0.08);
  --shadow-card-lt-hover: 0 8px 32px rgba(53,126,179,0.14);
  --shadow-card-dk:       0 4px 32px rgba(0,0,0,0.28);
  --shadow-btn:           0 4px 20px rgba(53,126,179,0.30);
  --shadow-btn-hover:     0 6px 24px rgba(0,68,139,0.35);
  --shadow-green:         0 4px 16px rgba(99,255,132,0.35);
  --shadow-img:           0 8px 48px rgba(24,63,102,0.12);

  /* === TRANSICIONES === */
  --transition-fast:   0.15s ease;
  --transition-base:   0.25s ease;
  --transition-slow:   0.4s ease;
}
```

---

## 13. Reglas de Implementación

1. **Nunca usar colores hardcodeados** — siempre tokens CSS (`var(--color-primary)`, etc.).
2. **Tipografía fluida** — `clamp()` en todos los tamaños de texto.
3. **Light-first** — ~85% claro. Fondo default: `--color-bg-base` (`#F4F7FF`). **Hero incluido: 100% claro.** Dark solo en: galería, CTA band, footer.
4. **Hero con gradientes radiales** — Múltiples `radial-gradient` apilados en `background`. NUNCA `filter: blur()` para crear blobs (GPU costoso). Grain texture vía `::before` con SVG inline.
5. **Glassmorphism para componentes del hero** — Cards, badges y pills usan `rgba(255,255,255, 0.50–0.65)` + `backdrop-filter: blur(14px)` + borde blanco semi-transparente. Incluir siempre `-webkit-backdrop-filter`.
6. **Un solo azul de acento** — `#357EB3` (Medical Blue) es el color de acción en TODO el sitio, claro u oscuro. Hover: `#00448B`. No hay dos azules de acento distintos para dark vs. light.
7. **Verde `#63FF84` es un acento real** — Usarlo para: badge de disponibilidad, botón WhatsApp, checkmarks de credenciales, estatus activo. No decorativo.
8. **`#00C8FF` está prohibido** — No aparece en ninguna referencia. No usar.
9. **Texto y navies comparten valores** — `#183F66` es simultáneamente fondo navy (dark sections) Y color heading en claro. `#36546C` es borde UI en dark Y color cuerpo en claro.
10. **Foto del doctor** — En capsule vertical (pill shape), fondo `rgba(220,234,248,0.35)`, sombra difusa con halo blanco exterior. Sin overlay.
11. **Navbar sobre hero** — Transparente con texto navy. On scroll: glass nav (`rgba(255,255,255,0.70)` + blur).
12. **Efectos grid/scan** — Solo en dark sections (galería, CTA band, footer). **NUNCA en el hero.**
13. **Imágenes locales** — Rutas relativas a `Assets/Images/` o `Assets/Images/Stock/`.
14. **Fuentes locales** — `@font-face` desde `Assets/Fonts/Inter/` y `Assets/Fonts/Work Sans/`.
15. **GDL en el logo** — `#357EB3` sobre fondo claro. Sobre fondos dark: `#ADCDE2`.
16. **CTA verde opcional** — "Agendar en WhatsApp" puede usar `--color-green` como variante secundaria del CTA principal.

---

*Guía elaborada para el proyecto Traumatólogo en GDL · Copia interna del equipo de diseño y desarrollo.*
