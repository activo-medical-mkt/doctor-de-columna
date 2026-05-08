# Keyword Strategy — Homepage, Condiciones & Servicios

*Based on: `especialista-en-columna_related_mx_2026-05-04.csv` + `dolor-de-columna_all-keywords_mx_2026-05-04.csv` (both cleaned)*  
*Date: 2026-05-04*

---

## Principles

1. **One primary keyword per page.** Each page owns one intent cluster. Pages should not compete against each other for the same term.
2. **No stuffing.** Keywords appear where they serve the reader: headings, intro paragraphs, alt text, meta. Never forced or repeated mechanically.
3. **Guadalajara signals come from context, not repetition.** One or two explicit geo mentions per page is enough. Local Pack relevance is driven by schema, GMB, and NAP consistency — not by putting "Guadalajara" in every sentence.

---

## Page 1 — Homepage (`/guadalajara/`)

### Intent
Someone looking for a spine specialist to see in Guadalajara. They may use "especialista", "traumatologo", "cirujano" — they want a qualified doctor, not a clinic chain.

### Primary keyword
**`especialista en columna vertebral`** — 880 vol · KD 19

### Supporting keywords
| Keyword | Vol | KD | Role |
|---|---|---|---|
| especialista de columna | 390 | 19 | H2 / intro body |
| traumatologo especialista en columna | 590 | 19 | Bio / trust section |
| cirujano de columna | 210 | 19 | Services section |
| doctor de la columna | 260 | 19 | FAQ / body copy |
| traumatologo en guadalajara | 1,900 | 16 | Bio paragraph (once, naturally) |

> `traumatologo en guadalajara` has the highest volume but is too broad for the site's focus on spine. It belongs **once** in the doctor bio as a factual descriptor ("Traumatólogo especialista en columna vertebral con consulta en Guadalajara"), not in headings. It will still be indexed and contribute local signal.

### Title tag
```
Especialista en Columna Vertebral en Guadalajara — Dr. Francisco Cisneros
```
*(~65 chars — fits without truncation)*

### Meta description
Lead with the primary keyword, include the local signal, close with a CTA:
```
Especialista en columna vertebral en Guadalajara. Diagnóstico y tratamiento de hernia discal, ciática y estenosis espinal. Consulta con cita programada.
```

### H1
```
Especialista en Columna Vertebral en Guadalajara
```

### Placement map
| Element | Keyword used | Notes |
|---|---|---|
| `<title>` | especialista en columna vertebral + Guadalajara | Once |
| `<meta description>` | especialista en columna vertebral + Guadalajara | Once |
| H1 | especialista en columna vertebral + Guadalajara | Once |
| Hero subheading / lead | especialista de columna | Natural variant |
| Services section H2 | cirujano de columna | E.g. "Procedimientos de cirujano de columna..." |
| Doctor bio paragraph | traumatologo especialista en columna | Factual sentence |
| Doctor bio paragraph | traumatologo en guadalajara | Once, natural ("Traumatólogo con consulta en Guadalajara...") |
| FAQ body | doctor de la columna | Answer copy only |
| Schema (`@type: Physician`) | All terms as `description` / `medicalSpecialty` | No visible stuffing |

---

## Page 2 — Condiciones Hub (`/guadalajara/condiciones/`)

### Intent
Someone experiencing back or spine pain who doesn't yet know their diagnosis. They're searching their symptom, not looking for a clinic. The condiciones page educates them on what's causing their pain and points them to the right condition page.

### Primary keyword
**`dolor de columna`** — 1,300 vol · KD 33

### Supporting keywords
| Keyword | Vol | KD | Role |
|---|---|---|---|
| dolor en la columna vertebral | 480 | 25 | H2 / intro section ★ |
| desgaste de columna | 390 | **15** ★★ | Low-competition — section or FAQ |
| contractura muscular espalda baja | 1,000 | **9** ★★★ | Low-competition — symptom card |
| enfermedades de la espalda | 260 | **14** ★★ | Low-competition — section intro |
| problemas de columna | 590 | 31 | Body copy |
| dolor lumbar crónico | 210 | 30 | Condition card |

> `dolor lumbar` (18,100 vol) and `lumbalgia sintomas` (1,600 vol) have KD 44–39 — too competitive for a hub page. They're better served by dedicated individual condition pages.

> `especialista en columna` (1,300 vol) is reserved for the homepage. Do NOT use it here.

### Title tag
```
Dolor de Columna en Guadalajara — Condiciones que Tratamos | Dr. Cisneros
```

### Meta description
```
Dolor de columna vertebral en Guadalajara. Conoce las condiciones que causan tu dolor: hernia discal, ciática, estenosis, escoliosis y más. Diagnóstico preciso desde la primera consulta.
```

### H1
```
Dolor de Columna Vertebral en Guadalajara
```

### Placement map
| Element | Keyword used | Notes |
|---|---|---|
| `<title>` | dolor de columna + Guadalajara | Once |
| `<meta description>` | dolor de columna vertebral + Guadalajara | Once |
| H1 | dolor de columna vertebral + Guadalajara | Once |
| Intro paragraph | dolor en la columna vertebral | Natural variant, first 100 words |
| Section intro | enfermedades de la espalda | E.g. "Las enfermedades de la espalda más comunes…" |
| Symptom card copy | contractura muscular espalda baja | As one of the symptom descriptions |
| FAQ or sidebar | desgaste de columna | Low-KD, easy win — one question/answer |
| Condition cards | hernia, ciática, estenosis… | Each card handles its own specific term |
| Schema `about` | dolor de columna vertebral | `MedicalCondition` name |

---

## Page 3 — Servicios Hub (`/guadalajara/servicios/`)

### Intent
Someone who already knows they need spine treatment and is looking for a specialist clinic — comparing options, checking services, possibly looking for pricing. The "clinica" framing matches this commercial intent.

### Primary keyword
**`clinica columna vertebral`** — 140 vol · KD 17

### Supporting keywords
| Keyword | Vol | KD | Role |
|---|---|---|---|
| clinica de la columna guadalajara | 90 | **7** ★★ | H2 / intro — lowest competition |
| clinica de la columna en guadalajara jalisco | 30 | **6** ★★ | Long-tail, body copy or schema |
| clinica especialista en columna vertebral | 50 | 19 | Subheading variant |
| cirugia de columna lumbar | 480 | 17 | Services section H2 ★ |
| cirujano de columna | 210 | 19 | Body copy / service cards |
| cuanto cuesta un bloqueo de columna | 110 | **5** ★★ | FAQ or pricing section |
| infiltracion de columna precio | 90 | **3** ★★★ | FAQ or pricing section |

> The KD 3–7 local clinic and pricing terms are the strongest short-term wins. A services page with a pricing FAQ naturally targeting these can rank fast with zero competition.

> `cirujano de columna` also appears on the homepage. Keep it in body copy on servicios — **do not use it in a heading here** to avoid competing with the homepage H2 usage.

### Title tag
```
Clínica de Columna Vertebral en Guadalajara — Servicios del Dr. Cisneros
```

### Meta description
```
Clínica especialista en columna vertebral en Guadalajara. Cirugía mínimamente invasiva, bloqueos epidurales y rehabilitación. Consulta disponible en menos de 48 h.
```

### H1
```
Clínica de Columna Vertebral en Guadalajara
```

### Placement map
| Element | Keyword used | Notes |
|---|---|---|
| `<title>` | clinica columna vertebral + Guadalajara | Once |
| `<meta description>` | clínica especialista en columna vertebral + Guadalajara | Once |
| H1 | clínica de columna vertebral + Guadalajara | Once |
| Intro paragraph | clinica de la columna guadalajara | One natural sentence, first 100 words |
| Services section H2 | cirugia de columna lumbar | E.g. "Procedimientos de cirugía de columna lumbar…" |
| Service card body | cirujano de columna | Once, natural descriptor |
| FAQ question | cuanto cuesta un bloqueo de columna | Word-for-word match — high conversion |
| FAQ question | infiltracion de columna precio | Word-for-word match — high conversion |
| Body copy long-tail | clinica de la columna en guadalajara jalisco | Once |
| Schema (`@type: MedicalClinic`) | address + areaServed: Guadalajara | Structured data |

---

## Cannibalization Prevention

| Keyword | Homepage | Condiciones | Servicios | Hernia Lumbar | Hernia Cervical | Cirugía Columna | Ciática |
|---|---|---|---|---|---|---|---|
| especialista en columna vertebral | ✅ Primary | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ |
| especialista en espalda | ✅ Supporting | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ |
| traumatologo en guadalajara | ✅ Bio (once) | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ |
| dolor de columna | ✗ | ✅ Primary | ✗ | ✗ | ✗ | ✗ | ✗ |
| dolor en la columna vertebral | ✗ | ✅ Supporting | ✗ | ✗ | ✗ | ✗ | ✗ |
| desgaste de columna | ✗ | ✅ Supporting | ✗ | ✗ | ✗ | ✗ | ✗ |
| contractura muscular espalda baja | ✗ | ✅ Supporting | ✗ | ✗ | ✗ | ✗ | ✗ |
| clinica columna vertebral | ✗ | ✗ | ✅ Primary | ✗ | ✗ | ✗ | ✗ |
| clinica de la columna guadalajara | ✗ | ✗ | ✅ Supporting | ✗ | ✗ | ✗ | ✗ |
| cirugia de columna lumbar | ✗ | ✗ | ✅ Services H2 | ✗ | ✗ | ✅ Body (variant) | ✗ |
| cirujano de columna | ✅ Homepage body | ✗ | ✅ Body copy only | ✗ | ✗ | ✗ | ✗ |
| cuanto cuesta un bloqueo de columna | ✗ | ✗ | ✅ FAQ | ✗ | ✗ | ✗ | ✗ |
| infiltracion de columna precio | ✗ | ✗ | ✅ FAQ | ✗ | ✗ | ✅ FAQ (surgery funnel) | ✗ |
| hernia de disco lumbar | ✗ | ✗ | ✗ | ✅ Primary | ✗ | ✗ | ✗ |
| hernia lumbar sintomas | ✗ | ✗ | ✗ | ✅ H2 | ✗ | ✗ | ✗ |
| hernia lumbar tratamiento | ✗ | ✗ | ✗ | ✅ H2 | ✗ | ✗ | ✗ |
| cirugia de hernia discal | ✗ | ✗ | ✗ | mention + link | ✗ | ✅ H2 | ✗ |
| cirugia de hernia de disco lumbar | ✗ | ✗ | ✗ | once (text) | ✗ | ✅ Supporting | ✗ |
| hernia de disco cervical | ✗ | ✗ | ✗ | ✗ | ✅ Primary | ✗ | ✗ |
| hernia cervical sintomas graves | ✗ | ✗ | ✗ | ✗ | ✅ Urgency H2 | ✗ | ✗ |
| hernia cervical causas | ✗ | ✗ | ✗ | ✗ | ✅ H2 | ✗ | ✗ |
| cirugia de columna | ✗ | ✗ | ✗ | ✗ | ✗ | ✅ Primary | ✗ |
| hernia de disco operacion | ✗ | ✗ | ✗ | ✗ | ✗ | ✅ Intro (once) | ✗ |
| operacion de columna lumbar con tornillos | ✗ | ✗ | ✗ | ✗ | ✗ | ✅ Section | ✗ |
| recuperacion de operacion de columna con tornillos | ✗ | ✗ | ✗ | ✗ | ✗ | ✅ H2 | ✗ |
| artrodesis lumbar l4 l5 s1 secuelas | ✗ | ✗ | ✗ | ✗ | ✗ | ✅ FAQ | ✗ |
| dolor de pierna despues de cirugia lumbar | ✗ | ✗ | ✗ | ✗ | ✗ | ✅ FAQ | ✗ |
| cuanto cuesta una cirugia de columna | ✗ | ✗ | ✗ | ✗ | ✗ | ✅ FAQ | ✗ |
| cirugia de columna precio | ✗ | ✗ | ✗ | ✗ | ✗ | ✅ FAQ | ✗ |
| operacion de columna precio | ✗ | ✗ | ✗ | ✗ | ✗ | ✅ FAQ | ✗ |
| dolor de ciatica | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✅ Primary |
| ciatica sintomas | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✅ H2 |
| ciatica causas | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✅ H2 |
| especialista en ciatica | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✅ FAQ + CTA |
| falsa ciatica | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✅ Callout |
| lumbago con ciatica | ✗ | ✗ | ✗ | ✅ Supporting | ✗ | ✗ | ✅ mention + link |
| hernia de disco nervio ciatico | ✗ | ✗ | ✗ | ✅ FAQ | ✗ | ✗ | ✅ FAQ (bridge) |
| inyeccion para el nervio ciatico | ✗ | ✗ | ✗ | ✗ | ✗ | ✅ Procedure | ✅ Treatment body |

---

---

## Page 4 — Hernia de Disco Lumbar (`/guadalajara/condiciones/hernia-de-disco-lumbar/`)

### Intent
Someone with back pain who has been told (or suspects) they have a lumbar herniated disc. Mixed informational + commercial: they want to understand what they have, whether they need surgery, and who to see. They are often anxious about surgery and disability.

### Primary keyword
**`hernia de disco lumbar`** — 2,900 vol · KD 31 *(matches URL exactly)*

Also use naturally: `hernia lumbar` (5,400 vol · KD 27) — more searches, slightly lower KD, use as intro variant and in body.

### Supporting keywords — Sections

| Keyword | Vol | KD | Section |
|---|---|---|---|
| hernia lumbar sintomas | 1,000 | 23 | Symptoms H2 |
| hernia de disco lumbar sintomas | 320 | **18** ★★ | Symptoms intro sentence |
| sintomas de hernia lumbar | 390 | 22 | Symptoms body copy |
| hernia lumbar tratamiento | 320 | 23 | Treatment H2 |
| hernia de disco lumbar tratamiento | 110 | **19** ★★ | Treatment intro |
| hernia l5 s1 | 320 | **19** ★★ | L-level section mention |
| hernia discal l4 l5 | 260 | 25 | L-level body copy |
| cirugia de hernia de disco lumbar | 90 | 20 | Surgical option section |
| desgaste de disco lumbar | 210 | 23 | Related condition mention |

### Low-KD wins — FAQ (highest ROI, near-zero competition)

| Keyword | Vol | KD | FAQ question |
|---|---|---|---|
| consecuencias de no operarse una hernia discal | 210 | **7** ★★★ | "¿Qué pasa si no me opero?" |
| cuanto cuesta una cirugia de hernia discal | 110 | **7** ★★★ | "¿Cuánto cuesta operar una hernia discal?" |
| especialista hernia discal | 70 | **7** ★★★ | "¿Qué tipo de especialista trata la hernia discal?" |
| calambres en las piernas por hernia discal | 30 | **4** ★★★ | "¿La hernia discal causa calambres en la pierna?" |
| como quitar una hernia sin operacion | 40 | **4** ★★★ | "¿Se puede quitar una hernia sin cirugía?" |
| si tengo hernia de disco puedo trabajar | 590 | **11** ★★★ | "¿Puedo trabajar con hernia de disco?" |
| una hernia discal puede dejar paralitico | 390 | **11** ★★★ | "¿La hernia discal puede causar parálisis?" |
| hernia discal l4 l5 tiene cura | 260 | **12** ★★★ | "¿La hernia L4-L5 tiene cura?" |
| tiempo de recuperacion de operacion de hernia discal l5 s1 | 170 | **10** ★★★ | "¿Cuánto dura la recuperación?" |
| una protusion discal puede desaparecer | 170 | **10** ★★★ | "¿La protusión discal desaparece sola?" |
| se puede vivir con hernia lumbar | 110 | **9** ★★★ | "¿Se puede vivir con una hernia lumbar?" |
| cuanto dura una operacion de hernia discal l5 s1 | 90 | **9** ★★★ | "¿Cuánto dura la operación?" |
| como desinflamar una hernia de disco | 30 | **9** ★★★ | "¿Cómo se desinflamala hernia?" |
| hernia de disco nervio ciatico | 40 | **10** ★★★ | "¿La hernia de disco causa ciática?" |

> **Patient-language opportunity**: `tengo una bolita en la espalda baja y me duele` (260 vol · KD 10) and `tengo una bolita en la espalda baja que se mueve` (110 vol · KD 13) — both describe a disc hernia symptom in plain language. One FAQ entry ("¿Tengo una bola en la espalda baja — puede ser una hernia?") captures these at near-zero KD.

### Title tag
```
Hernia de Disco Lumbar en Guadalajara — Síntomas y Tratamiento | Dr. Cisneros
```

### Meta description
```
Hernia de disco lumbar en Guadalajara. Síntomas, niveles L4-L5-S1, tratamiento conservador y cirugía mínimamente invasiva. El 80% mejora sin cirugía. Dr. Cisneros, CMTO.
```

### H1
```
Hernia de Disco Lumbar en Guadalajara
```

### Placement map

| Element | Keyword | Notes |
|---|---|---|
| `<title>` | hernia de disco lumbar + Guadalajara | Once |
| `<meta description>` | hernia de disco lumbar + L4-L5-S1 | Once |
| H1 | hernia de disco lumbar + Guadalajara | Once |
| Intro paragraph | hernia lumbar | Natural variant, first 100 words |
| Symptoms H2 | hernia lumbar sintomas | Exact match heading |
| Symptoms body | hernia de disco lumbar sintomas | Sentence-level usage |
| L-level callout box | hernia l5 s1 · hernia discal l4 l5 | Level-specific section |
| Treatment H2 | hernia lumbar tratamiento | Exact match heading |
| Treatment body | hernia de disco lumbar tratamiento | Once |
| Surgery mention | cirugia de hernia de disco lumbar | Once in treatment section |
| FAQ × 14 | (all low-KD questions above) | Word-for-word question match |
| Schema FAQ | same questions | JSON-LD `FAQPage` entries |
| Bio/CTA | especialista hernia discal | Natural in CTA sentence |

---

## Page 5 — Hernia Discal Cervical (`/guadalajara/condiciones/hernia-discal-cervical/`)

### Intent
Someone with neck pain, arm numbness, or tingling who has been told they have a cervical herniated disc — or suspects it. Often more anxious than lumbar patients because cervical symptoms (arm weakness, headache, dizziness) are scarier. Searching to understand, find severity, and locate a surgeon.

### Primary keyword
**`hernia de disco cervical`** — 590 vol · KD 26

Also use naturally: `hernia en el cuello` (590 vol · KD **20**) — same volume, lower KD, more patient-language. Use in H1 subtext or intro.

### Supporting keywords — Sections

| Keyword | Vol | KD | Section |
|---|---|---|---|
| sintomas de hernia cervical | 390 | **17** ★★ | Symptoms H2 |
| hernia de disco cervical sintomas | 390 | **19** ★★ | Symptoms intro sentence |
| hernia discal cervical sintomas | 140 | **14** ★★ | Symptoms body copy |
| hernia cervical causas | 90 | **12** ★★★ | Causes H2 |
| hernia columna cervical | 110 | 22 | Body copy variant |
| hernia de disco en el cuello | 110 | 24 | Intro/body variant |
| disco cervical | 140 | **18** ★★ | Anatomy section |
| que es una hernia cervical | 30 | **19** ★★ | What-is intro paragraph |

### Low-KD wins — FAQ

| Keyword | Vol | KD | FAQ question |
|---|---|---|---|
| hernia cervical sintomas graves | 390 | **12** ★★★ | "¿Cuáles son los síntomas graves de hernia cervical?" |
| como desinflamar hernia discal cervical | 140 | **10** ★★★ | "¿Cómo desinflamar una hernia discal cervical?" |
| hernia cervical causas | 90 | **12** ★★★ | "¿Qué causa la hernia de disco cervical?" |
| cirugia de hernia de disco cervical | 30 | **12** ★★★ | "¿Cuándo se opera una hernia cervical?" |
| como saber si tengo una hernia discal cervical | 30 | **16** ★★ | "¿Cómo sé si tengo hernia cervical?" |

> `hernia cervical sintomas graves` (390 vol · KD **12**) is the single highest-value keyword on this page — 390 monthly searches with near-zero competition. It should appear in a dedicated H2 section ("Síntomas graves de hernia cervical: cuándo consultar de urgencia"), not just in a FAQ.

### Title tag
```
Hernia de Disco Cervical en Guadalajara — Síntomas y Tratamiento | Dr. Cisneros
```

### Meta description
```
Hernia de disco cervical en Guadalajara. Síntomas graves, causas y tratamiento sin cirugía. Especialista en hernia discal cervical. Consulta con cita programada. Dr. Cisneros, CMTO.
```

### H1
```
Hernia de Disco Cervical en Guadalajara
```

### Placement map

| Element | Keyword | Notes |
|---|---|---|
| `<title>` | hernia de disco cervical + Guadalajara | Once |
| `<meta description>` | hernia de disco cervical + especialista | Once |
| H1 | hernia de disco cervical + Guadalajara | Once |
| Intro paragraph | hernia en el cuello | Lower-KD patient language, first 100 words |
| Symptoms H2 | sintomas de hernia cervical | Exact match |
| Symptoms intro | hernia de disco cervical sintomas | Sentence-level |
| Symptoms body | hernia discal cervical sintomas | Variant in list |
| **Urgency H2** | hernia cervical sintomas graves | Dedicated section — highest priority |
| Causes H2 | hernia cervical causas | Exact match |
| Anatomy sidebar | disco cervical | Once, natural |
| FAQ × 5 | (all low-KD questions above) | Word-for-word question match |
| Schema FAQ | same questions | JSON-LD `FAQPage` entries |

### Cannibalization note
- `hernia discal` (22,200 vol · KD 35) and `hernia de disco` (14,800 vol · KD 34) are too competitive for individual condition pages. They belong to a top-level hernia hub if one is ever created. Use them once naturally in the intro but do not target them as primaries here.
- `hernia lumbar` and `hernia de disco lumbar` are **Page 4 only** — do not use them as headings on the cervical page.

---

---

## Page 6 — Cirugía de Columna Vertebral (`/guadalajara/servicios/cirugia-de-columna-vertebral/`)

*Based on: `cirugia-cirujano-columna_cleaned_2026-05-04.csv` (277 rows)*

### Intent
Someone already diagnosed and now evaluating surgery. They are anxious about risks, cost, and recovery — not researching their condition any further. High commercial intent: they want a qualified surgeon in Guadalajara and specific answers to fear-based questions. This page also acts as a **surgical hub** linking down to the individual procedure pages (microdiscectomía, endoscopía, fusión vertebral).

### Primary keyword
**`cirugia de columna`** — 1,000 vol · KD 17

Also use naturally: `operacion de columna` (720 vol · KD **13**) and `cirugia de columna lumbar` (480 vol · KD 17) — patient language variants, use in intro and section headings.

### Supporting keywords — Sections

| Keyword | Vol | KD | Section |
|---|---|---|---|
| hernia de disco operacion | 2,400 | 19 | Intro paragraph (high-volume entry point) |
| cirugia de hernia discal | 720 | 23 | Procedure types section — H2 |
| operacion de columna lumbar con tornillos | 880 | **12** ★★★ | Instrumentation / types section |
| cirugia de columna lumbar l5 s1 | 260 | **10** ★★★ | L-level callout — H2 or box |
| cirugia de columna cervical | 170 | 20 | Cervical surgery mention |
| operacion hernia discal | 260 | 17 | Body copy variant |
| es peligroso operarse de hernia discal | 390 | 19 | Risk section H2 ★ |
| operacion de hernia discal riesgos | 390 | 20 | Risk section body |
| recuperacion de operacion de columna con tornillos | 480 | **10** ★★★ | Recovery section H2 |

### Low-KD wins — FAQ (highest ROI, near-zero competition)

| Keyword | Vol | KD | FAQ question |
|---|---|---|---|
| dolor de pierna despues de cirugia lumbar | 320 | **7** ★★★ | "¿Por qué me duele la pierna después de la cirugía?" |
| artrodesis lumbar l4 l5 s1 secuelas | 320 | **8** ★★★ | "¿Cuáles son las secuelas de la artrodesis lumbar?" |
| barras y tornillos en la columna | 170 | **8** ★★★ | "¿Para qué sirven las barras y tornillos en la columna?" |
| me operaron de la columna y no puedo caminar | 210 | **9** ★★★ | "Me operaron de la columna y no puedo caminar, ¿es normal?" |
| protesis de disco lumbar precio | 210 | **11** ★★★ | "¿Cuánto cuesta una prótesis de disco lumbar?" |
| cuanto cuesta una operacion de hernia discal l5 s1 | 210 | **15** ★★ | "¿Cuánto cuesta operar una hernia discal L5-S1?" |
| cuanto cuesta una cirugia de columna | 110 | **2** ★★★ | "¿Cuánto cuesta una cirugía de columna en Guadalajara?" |
| operacion de columna precio | 110 | **6** ★★★ | "¿Cuál es el precio de una operación de columna?" |
| cirugia de columna precio | 70 | **2** ★★★ | "¿Cuál es el costo de una cirugía de columna?" |
| infiltracion de columna precio | 90 | **3** ★★★ | "¿Cuánto cuesta una infiltración de columna?" |

> **Pricing cluster (KD 2–6)**: `cuanto cuesta una cirugia de columna` (KD 2), `cirugia de columna precio` (KD 2), `infiltracion de columna precio` (KD 3), `operacion de columna precio` (KD 6) — four separate pricing FAQs that together cover ~380 monthly searches with virtually zero competition. No other spine page on the site should answer these; funnel all pricing intent here.

> **Post-op anxiety cluster (KD 7–9)**: `dolor de pierna despues de cirugia lumbar` (KD 7), `artrodesis lumbar l4 l5 s1 secuelas` (KD 8), `barras y tornillos en la columna` (KD 8), `me operaron y no puedo caminar` (KD 9) — these are conversion-critical. A patient who finds reassuring answers here trusts the surgeon enough to book.

### Title tag
```
Cirugía de Columna Vertebral en Guadalajara — Dr. Francisco Cisneros
```

### Meta description
```
Cirugía de columna vertebral en Guadalajara: microdiscectomía, artrodesis y endoscopía. Riesgos, recuperación y precios. Especialista CMTO con más de 15 años de experiencia.
```

### H1
```
Cirugía de Columna Vertebral en Guadalajara
```

### Placement map

| Element | Keyword | Notes |
|---|---|---|
| `<title>` | cirugia de columna vertebral + Guadalajara | Once |
| `<meta description>` | cirugía de columna vertebral + riesgos, recuperación, precios | Once |
| H1 | cirugía de columna vertebral + Guadalajara | Once |
| Intro paragraph | hernia de disco operacion · operacion de columna | High-volume entry point, first 100 words |
| Intro paragraph | cirugia de columna lumbar | Natural variant |
| Procedures section H2 | cirugia de hernia discal | "Cirugía de hernia discal y otras procedimientos" |
| Instrumentation callout | operacion de columna lumbar con tornillos | Callout box or section |
| L-level section | cirugia de columna lumbar l5 s1 | Dedicated H2 or info box |
| Cervical mention | cirugia de columna cervical | One sentence, links to hernia cervical page |
| Risk section H2 | es peligroso operarse de hernia discal | "¿Es peligroso operarse de la columna?" |
| Risk body | operacion de hernia discal riesgos | Body copy |
| Recovery H2 | recuperacion de operacion de columna con tornillos | "Recuperación después de cirugía de columna" |
| FAQ × 10 | (all low-KD questions above) | Word-for-word question match |
| Schema FAQ | same questions | JSON-LD `FAQPage` entries |
| Internal links | microdiscectomia · endoscopia · fusion-vertebral | Link to each procedure subpage |

### Cannibalization notes
- `hernia de disco operacion` (2,400 vol · KD 19) is used in the **intro only** — it's the bridge term patients use before they know the procedure name. The hernia condition pages should not use it in headings.
- `cirugia de hernia discal` (720 vol · KD 23) **moves here** from the hernia lumbar page. The hernia lumbar page can mention surgery once ("en algunos casos se requiere cirugía — ver cirugía de columna") and link here.
- `cuanto cuesta una cirugia de columna` and all pricing terms are **exclusive to this page** — do not answer surgery prices on the servicios hub or any other page.
- `artrodesis lumbar l4 l5 s1 secuelas` is **exclusive to this page** — do not duplicate on the fusion-vertebral subpage.

---

---

## Page 7 — Ciática (`/guadalajara/condiciones/dolor-ciatica/`)

*Based on: `ciatica_cleaned_2026-05-04.csv` (930 rows)*

### Intent
Someone with pain radiating from the low back down the leg — they may not know the word "ciática" yet, or they know it and want to understand severity and treatment options. Mixed informational + commercial intent: "¿es grave la ciática?" sits alongside "¿qué especialista la trata?". High volume but also high competition in the generic informational tier; the wins come from diagnostic FAQ terms and the near-zero-KD specialist/procedural cluster.

### Primary keyword
**`dolor de ciatica`** — 22,200 vol · KD 37

Also use naturally: `ciatica` (40,500 vol · KD 42) and `nervio ciatico` (60,500 vol · KD 46) — both are too competitive to target as primaries but will be indexed through natural usage. `ciatica sintomas` (2,400 vol · KD **25**) is the best supporting H2 target.

### Supporting keywords — Sections

| Keyword | Vol | KD | Section |
|---|---|---|---|
| ciatica sintomas | 2,400 | **25** ★★ | Symptoms H2 |
| dolor de ciatica sintomas | 2,400 | **19** ★★ | Symptoms intro sentence |
| sintomas del nervio ciatico | 2,400 | **23** ★★ | Symptoms body copy |
| ciatica causas | 3,600 | **26** ★★ | Causes H2 |
| causas de la ciatica | 260 | **11** ★★★ | Causes intro — lowest-KD variant |
| lumbago con ciatica | 1,900 | 31 | Related condition callout |
| ciatica tratamiento | 2,400 | 28 | Treatment H2 |
| inyeccion para el nervio ciatico | 1,900 | 33 | Treatment section (injection option) |
| falsa ciatica | 1,600 | **19** ★★ | Differential diagnosis callout |
| falsa ciatica sintomas | 140 | **13** ★★★ | Differential diagnosis body |
| resonancia magnetica lumbar ciatica | 480 | **18** ★★ | Diagnosis section |
| tipos de ciatica | 720 | **15** ★★★ | Callout box |

### Low-KD wins — FAQ (highest ROI, near-zero competition)

| Keyword | Vol | KD | FAQ question |
|---|---|---|---|
| especialista en ciatica | 320 | **4** ★★★ | "¿Qué especialista trata la ciática?" |
| especialista en nervio ciatico | 260 | **5** ★★★ | "¿A qué especialista voy por el nervio ciático?" |
| que especialista trata el nervio ciatico | 110 | **2** ★★★ | Long-tail match for same question |
| traumatologo especialista en nervio ciatico | 140 | **4** ★★★ | Specialist CTA — mentions exact specialty |
| es peligroso el nervio ciatico | 3,600 | **25** | "¿Es peligroso el nervio ciático?" — anxiety FAQ |
| nervio ciatico dañado se recupera | 170 | **11** ★★★ | "¿El nervio ciático dañado se puede recuperar?" |
| dolor de ciatica cuanto dura | 170 | **10** ★★★ | "¿Cuánto dura el dolor de ciática?" |
| es bueno caminar para la ciatica | 110 | **9** ★★★ | "¿Es bueno caminar con ciática?" |
| ciatica caminar o reposo | 110 | **15** ★★ | "¿Con ciática es mejor caminar o guardar reposo?" |
| no puedo caminar por la ciatica | 40 | **11** ★★★ | "No puedo caminar por la ciática — ¿qué hago?" |
| como saber si es dolor de ciatica | 170 | **15** ★★ | "¿Cómo sé si mi dolor es ciática?" |
| porque da la ciatica en la pierna | 170 | **11** ★★★ | "¿Por qué da la ciática en la pierna?" |
| el nervio ciatico se opera | 140 | **10** ★★★ | "¿El nervio ciático se opera?" — bridges to cirugia page |
| hernia de disco nervio ciatico | 40 | **10** ★★★ | "¿La hernia de disco causa ciática?" — internal link |
| infiltracion ciatica | 30 | **10** ★★★ | "¿En qué consiste la infiltración para la ciática?" |

> **Specialist cluster (KD 2–5)**: `que especialista trata el nervio ciatico` (KD 2), `especialista en ciatica` (KD 4), `traumatologo especialista en nervio ciatico` (KD 4), `especialista en nervio ciatico` (KD 5) — four FAQ entries or a single "¿Qué especialista trata la ciática?" section that uses all four naturally. Combined ~830 monthly searches at near-zero KD, with a direct conversion path to booking.

> **Pregnancy cluster**: `ciatica embarazo` (260 · KD 15) and `nervio ciatico en el embarazo` (210 · KD 15) and `dolor de ciatica en el embarazo` (880 · KD 18) — three variants with low-ish KD. One callout ("Ciática durante el embarazo") captures all three and adds topical authority without competing with a dedicated OB page.

### Title tag
```
Dolor de Ciática en Guadalajara — Síntomas y Tratamiento | Dr. Cisneros
```

### Meta description
```
Dolor de ciática en Guadalajara: síntomas, causas, cuánto dura y tratamiento con o sin cirugía. Especialista en nervio ciático. Consulta con cita programada. Dr. Cisneros, CMTO.
```

### H1
```
Dolor de Ciática en Guadalajara
```

### Placement map

| Element | Keyword | Notes |
|---|---|---|
| `<title>` | dolor de ciatica + Guadalajara | Once |
| `<meta description>` | dolor de ciática + especialista, síntomas, tratamiento | Once |
| H1 | dolor de ciática + Guadalajara | Once |
| Intro paragraph | ciatica · nervio ciatico | High-volume variants, first 100 words |
| Symptoms H2 | ciatica sintomas | Exact match heading |
| Symptoms intro | dolor de ciatica sintomas | Sentence-level |
| Symptoms body | sintomas del nervio ciatico | Variant in list |
| Causes H2 | ciatica causas | Exact match heading |
| Causes intro | causas de la ciatica | Lowest-KD variant, first sentence |
| Callout box | tipos de ciatica | "Tipos de ciática: lumbar, piriforme, etc." |
| Callout box | falsa ciatica · falsa ciatica sintomas | Differential diagnosis note |
| Related condition | lumbago con ciatica | One sentence linking to hernia lumbar page |
| Treatment H2 | ciatica tratamiento | Exact match heading |
| Treatment body | inyeccion para el nervio ciatico | One natural mention + links to cirugia page |
| Diagnosis mention | resonancia magnetica lumbar ciatica | Once, natural — "el diagnóstico incluye una resonancia magnética" |
| Pregnancy callout | ciatica embarazo · dolor de ciatica en el embarazo | Dedicated callout box |
| FAQ × 15 | (all low-KD questions above) | Word-for-word question match |
| Schema FAQ | same questions | JSON-LD `FAQPage` entries |
| CTA section | especialista en ciatica · traumatologo especialista en nervio ciatico | Natural in booking CTA |

### Cannibalization notes
- `dolor de ciatica` is **exclusive to this page** — it must not appear as a heading or primary term on the condiciones hub or any other page.
- `lumbago con ciatica` is used **once** here as a linking mention → points to the hernia lumbar page. The hernia lumbar page owns it as a supporting term.
- `inyeccion para el nervio ciatico` appears here in the treatment section AND on the cirugia page. Acceptable because the intent is slightly different (general treatment option here vs. procedure detail there). Do not use it in headings on both pages.
- `hernia de disco nervio ciatico` (KD 10) is a bridge term — used once in a FAQ here and once on the hernia lumbar page. Neither page targets it as a primary.

---

## Guadalajara Signal — How to Maintain Without Stuffing

- **Title & H1**: Include "Guadalajara" once — it carries the most weight.
- **Body copy**: Use it in the intro paragraph and the CTA section. Skip it in informational middle sections (anatomy, symptoms, causes).
- **Schema markup**: `address.addressLocality`, `areaServed`, `geo` coordinates — this is where most local signal should come from, invisible to readers.
- **NAP consistency**: Name, address, phone number identical across the site, GMB, and any directory listings.
- **Internal links**: Condition and service pages should link back to the homepage and condiciones hub using the target keyword as anchor text (e.g. `especialista en columna vertebral en Guadalajara`).
