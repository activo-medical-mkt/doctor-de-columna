# Page Building Framework
## From Keywords → Narrative → Layout → Copy → SEO Implementation

This document captures the exact process used to plan and build the `/condiciones/` hub page.
Use it as a repeatable blueprint for any new condition, service, or landing page.

---

## PHASE 1 — SEO KEYWORD RESEARCH
*"What are people actually searching for?"*

Keyword research comes first because it reveals not just how to rank, but what fears, questions, and objections your audience has. The queries define the emotional arc before you write a word of narrative.

### Keyword Research Process
1. Start with the page topic → find 1 primary keyword (high intent + geo)
2. Find 3–5 secondary keywords (condition-specific)
3. Find 5–10 long-tail keywords (question-format, conversational)
4. Map each keyword to a specific section — never stuff multiple into one heading

### Keyword → Section Mapping Template
```
Primary keyword     → H1 (hero)
Secondary keywords  → H2s (one per section)
Long-tail keywords  → Body copy, FAQ questions, card labels
Geo modifier        → At least 1 H2, meta title, meta description, booking CTA
Doctor name         → How It Works H2, Trust H2 (E-E-A-T)
```

> Rule: The queries reveal which sections you need. If people search *"¿siempre necesito cirugía?"*, you need a Before/After section. If they search *"me duele al caminar"*, you need a Pain Hook with that exact phrase.

---

## PHASE 2 — NARRATIVE STRATEGY
*"What story does this page tell?"*

With keywords in hand, answer these three questions before writing any HTML:

### 1. Who is landing here and what is their emotional state?
The visitor arrived via a symptom search — they are in **pain, fear, or confusion**.
They are NOT looking for a doctor yet. They are looking for **recognition** first.
> Rule: earn trust before asking for the appointment.

### 2. What is the one job of this page?
Not to inform — to **convert**. Every section should either:
- Reduce fear
- Build credibility
- Create urgency
- Or provide a path deeper into the site (internal link)

### 3. What are the three objections you must defeat?
For medical pages these are almost always:
1. *"Maybe it'll go away on its own"* → urgency section
2. *"I don't want surgery"* → process section (80% no surgery)
3. *"I don't know if this doctor is legit"* → trust section

---

## PHASE 3 — NARRATIVE ARC
*"The page as a story with a beginning, middle, and end"*

Map every section to a **visitor emotional state**:

```
ARRIVAL       → "Am I in the right place?"           → HERO
RECOGNITION   → "They understand my problem"         → PAIN HOOK
CREDIBILITY   → "These numbers back it up"           → STATS STRIP
EXPLORATION   → "Here's what they treat"             → CONDITIONS GRID
TRUST         → "Now I understand the process"       → HOW IT WORKS
URGENCY       → "I need to act — waiting makes it worse" → BEFORE/AFTER
AUTHORITY     → "The doctor is real and qualified"   → TRUST/DOCTOR
SOCIAL PROOF  → "Real patients got better"           → REVIEWS
OBJECTIONS    → "Last questions answered"            → FAQ
CONVERSION    → "Book now"                           → CTA
```

> Rule: Never put a CTA before you have earned the right to ask.
> The booking section goes LAST because trust must be built first.

---

## PHASE 4 — SECTION-BY-SECTION LAYOUT DECISIONS
*"Which UI pattern works best for each emotional job — adapt before you build"*

> **Rule: ADAPT before NEW.** Before writing any section, scan existing pages for a layout that does the same job. Copy the structure, rename the class prefix, slot in the copy. Only build from scratch if nothing close enough exists.
>
> Pages to scan (in order): `condiciones/index.html` → `index.html` → any matching condition or service page.

---

### UI PATTERN DECISION TABLE

**Check this table before writing any inline section.** Do not default to a plain `<ul>` list or sequential `.step` blocks — map the content shape to the correct interactive component first.

| Content shape | Item count | Prescribed pattern | Reference |
|---|---|---|---|
| Symptom list | any | 2-col `.cp-sym-card` grid with left accent border | `dolor-ciatica-guadalajara/index.html` |
| Causes / risk factors | ≤ 4 | 2×2 CSS grid cards (`list-style:none`, border, shadow) | — |
| Causes / risk factors | 5–8 | **Auto-advancing slider** — 2-up desktop / 1-up mobile, prev/next chevron buttons, dot indicators, 4.5 s interval | `dolor-ciatica-guadalajara/index.html` → `.causa-slider-wrap` |
| Treatment options — **parallel alternatives** (patient chooses one path) | 2 | **Tab UI** (`role="tablist"`) — each tab has a label + subtitle explaining the decision criterion. **Never PASO/step format.** | `dolor-ciatica-guadalajara/index.html` → `.tx-tabs` |
| Treatment options — single sequential protocol | 3–4 | Numbered horizontal timeline → vertical stack on mobile | `condiciones/index.html` |
| FAQ | 5–6 | `<details>`/`<summary>` accordion + `FAQPage` JSON-LD | `dolor-ciatica-guadalajara/index.html` → `.cp-faq-list` |
| Before / After comparison | 2 cols | 2-col contrast panel — dark navy left (without treatment), white + green border right (with treatment) | `dolor-ciatica-guadalajara/index.html` |
| Single mid-content CTA / page link | 1 | `btn-outline` pill in its own `<div style="margin-top:1rem">` — **never** appended inline to a `<p>` | `dolor-ciatica-guadalajara/index.html` |

**Hard rules enforced by this table:**
1. **5+ causes or risk factors → slider, not `<ul>`.** A bullet list of 8 items is a wall of text that no one reads.
2. **Two patient-choice treatment paths → tabs, never PASO steps.** PASO / numbered steps imply a sequential process the user follows. Treatment alternatives are not sequential.
3. **Mid-section page links → `btn-outline` button, never inline text bolted onto a paragraph.** Inline links inside body copy are fine for contextual references; a standalone navigation action needs a button.

**Tab UI — copy-paste scaffold:**
```html
<div class="tx-tabs" id="tx-tabs">
  <div class="tx-tab-list" role="tablist">
    <button class="tx-tab-btn active" role="tab" aria-selected="true"
            aria-controls="tx-panel-a" id="tx-tab-a" type="button">
      <span class="tx-tab-label">Tab A label</span>
      <span class="tx-tab-sub">Decision criterion or stat (e.g. "Primera opción · 80 % de los casos")</span>
    </button>
    <button class="tx-tab-btn" role="tab" aria-selected="false"
            aria-controls="tx-panel-b" id="tx-tab-b" type="button">
      <span class="tx-tab-label">Tab B label</span>
      <span class="tx-tab-sub">When this path applies</span>
    </button>
  </div>
  <div class="tx-panel active" id="tx-panel-a" role="tabpanel" aria-labelledby="tx-tab-a">
    <!-- panel A content -->
  </div>
  <div class="tx-panel" id="tx-panel-b" role="tabpanel" aria-labelledby="tx-tab-b">
    <!-- panel B content -->
  </div>
</div>
```
Required CSS (add to `<style>` block before media queries):
```css
.tx-tabs { margin-top: 2rem; }
.tx-tab-list { display:flex; border-bottom:2px solid var(--color-border-lt); }
.tx-tab-btn { flex:1; display:flex; flex-direction:column; align-items:flex-start; gap:.2rem; padding:1rem 1.5rem 1.1rem; background:none; border:none; border-bottom:3px solid transparent; margin-bottom:-2px; cursor:pointer; text-align:left; transition:border-color .2s,background .2s; border-radius:var(--radius-lg) var(--radius-lg) 0 0; }
.tx-tab-btn:hover { background:var(--color-bg-alt); }
.tx-tab-btn.active { border-bottom-color:var(--color-primary); background:var(--color-bg-alt); }
.tx-tab-label { font-family:var(--font-heading); font-size:.975rem; font-weight:700; color:var(--color-navy); line-height:1.3; }
.tx-tab-btn.active .tx-tab-label { color:var(--color-primary); }
.tx-tab-sub { font-family:var(--font-body); font-size:.78rem; color:#6B8BA4; }
.tx-panel { display:none; background:var(--color-bg-alt); border:1px solid var(--color-border-lt); border-top:none; border-radius:0 0 var(--radius-lg) var(--radius-lg); padding:1.75rem; }
.tx-panel.active { display:block; }
```
Required JS (add inline `<script>` before `</body>`):
```js
(function () {
  var tabs = document.querySelectorAll('.tx-tab-btn');
  tabs.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var target = btn.getAttribute('aria-controls');
      tabs.forEach(function (b) { b.classList.remove('active'); b.setAttribute('aria-selected','false'); });
      document.querySelectorAll('.tx-panel').forEach(function (p) { p.classList.remove('active'); });
      btn.classList.add('active'); btn.setAttribute('aria-selected','true');
      document.getElementById(target).classList.add('active');
    });
  });
})();
```

**Slider pattern:** See `.causa-slider-wrap` in `condiciones/dolor-ciatica-guadalajara/index.html` for the complete CSS + JS. Rename the class prefix (e.g. `causa-` → `[page]-`) when adapting to avoid conflicts.

---

### §1 · HERO
**Job:** Establish credibility in under 3 seconds.
**Pattern:** 2-column — doctor photo left (pill/capsule shape) + headline + badge + CTA right.
**Why:** Face = instant trust. Name + credential = authority. Badge = specificity ("Especialista de Columna · Guadalajara").
**Mobile:** Text first (badge + H1 + CTA) → full-bleed arch photo below. CTA pill pinned at bottom of photo.
**Internal links:** None needed. This is the anchor.
**Key elements:**
- Animated green pulse badge dot
- Stat cards (CMTO, 80%, conditions count)
- Single primary CTA (WhatsApp)
- Spine image as subtle right-edge background accent

---

### §2 · PAIN HOOK — *"¿Reconoces alguno de estos síntomas?"*
**Job:** Make the visitor feel seen before they scroll away.
**Pattern:** Tappable symptom selector cards (2×2 grid desktop, swipeable on mobile).
**Why cards over text:** Interactive = engagement. Each card = internal link. Scannable on mobile.
**Card anatomy:**
```
[ Icon ]
Short symptom label (colloquial, not medical)
On hover/tap → one-liner outcome + "Ver condición →" link
```
**Copy rule:** Write in second person, colloquial Spanish. NOT *"hernia discal"* — YES *"me duele al caminar"*.
**Internal links:** Each card → most relevant `/condiciones/*` page.
**SEO value:** Seeds long-tail symptom keywords naturally.

---

### §3 · STATS STRIP ✅ *(existing partial)*
**Job:** Validate the pain hook with hard numbers.
**Pattern:** Horizontal strip of 3–4 numbered facts.
**Why here:** Numbers immediately after emotional recognition = credibility spike.
**No changes needed** — reuse `partials/stats.html`.

---

### §4 · CONDITIONS GRID ✅ *(existing partial)*
**Job:** Let the visitor find their specific condition.
**Pattern:** Sticky intro left + 2-col clickable card grid right.
**Why sticky intro:** Keeps context visible as user scans cards. Reduces cognitive load.
**Internal links:** Every card → individual `/condiciones/*` page.
**SEO tweak:** H2 should include geo keyword. Add intro `<p>` seeding `Guadalajara`, `lumbar`, `cervical`.

---

### §5 · HOW IT WORKS — *"Así funciona tu atención"*
**Job:** Kill fear of the unknown. Answer "what happens if I go?"
**Pattern:** Horizontal numbered timeline (desktop) → vertical stacked steps (mobile).
**Why timeline over list:** Linear = reassuring. Shows there's a clear path, not chaos.
**Step count:** 4 max. More = overwhelming.
**Step anatomy:**
```
Numbered node → connected line → next node
Title (bold) + 2-line body copy
Step 3 always includes "80% sin cirugía" + link to /servicios/
```
**Internal links:** Step 3 → `/servicios/` or specific treatment page.

---

### §6 · BEFORE/AFTER OBJECTION CRUSHER — *"¿Qué pasa si espero?"*
**Job:** Create urgency without being manipulative.
**Pattern:** Split 2-column contrast panel. Dark/muted left, light/brand right.
**Why contrast:** Visual binary forces comparison. Muted left = pain state. Bright right = relief state.
**Copy rule:** Left column = concrete negative outcomes (not fear-mongering, just honest).
Right column = concrete positive outcomes tied to early action.
**No internal links needed** — this is a pure conversion section.
**Eyebrow:** "El Costo de Esperar"

---

### §7 · TRUST / DOCTOR ✅ *(existing partial)*
**Job:** Prove the doctor is real, qualified, and local.
**Pattern:** Photo + credentials + certifications + cédula.
**Why it goes here:** User has already been educated about conditions and process.
Now they need to confirm *"can this specific doctor help me?"*
**E-E-A-T requirements:** Name, cédula, CMTO board cert, years of experience, city.

---

### §8 · PATIENT REVIEWS ✅ *(existing partial)*
**Job:** Social proof — real people got better.
**Pattern:** Card slider or grid of 3–4 reviews with name, condition treated, outcome.
**Why after trust:** Reviews validate the doctor section. Order matters.

---

### §9 · FAQ
**Job:** Remove last objections. Feed Google featured snippets.
**Pattern:** Accordion (expand/collapse). Max 6 questions.
**Why accordion:** Keeps page scannable. Each answer can be long without wall-of-text problem.
**Schema:** Always include `FAQPage` JSON-LD — directly feeds People Also Ask boxes.
**Question selection rule:** Use actual Google autocomplete queries for your primary keywords.
Each answer should:
1. Answer the question in the first sentence (for featured snippet)
2. Add context in sentences 2–3
3. End with a contextual internal link

---

### §10 · BOOKING CTA ✅ *(existing partial)*
**Job:** Convert. Hard ask only after full trust is built.
**Pattern:** Full-width section with H2 + subtext + primary CTA + secondary note.
**Why last:** Conversion rate is highest when CTA comes after full narrative arc.
**Copy:** H2 includes geo. Subtext removes friction ("Sin lista de espera. Consulta con cita programada.").

---

## PHASE 4.5 — DESIGN APPLICATION
*"Apply the design system to every section — don't invent, reference"*

### Primary references (in priority order)
1. **Homepage hero** (`index.html` → `.hero` section) — the gold standard for visual style, spacing, and component patterns. When in doubt, match it exactly.
2. **`DESIGN_GUIDE.md`** — the full token library, component specs, and rules. Read the relevant section before touching a new component type.

### The 6 decisions to make per page

**1. Background treatment**
Almost always: `linear-gradient(145deg, #C5D8ED → #F4F7FF)` for hero, `#F4F7FF` flat for body sections, `#FFFFFF` for cards.
Dark accent bands (navy `#183F66`) max one per page — typically the booking CTA.
See `DESIGN_GUIDE.md §2` for token reference.

**2. Card surface type**
Three options — pick one per context, don't mix on the same page:
- **Glassmorphism** → `background: rgba(255,255,255,0.72); backdrop-filter: blur(12px)` — hero overlays, floating badges
- **Solid white** → `background: #FFFFFF; box-shadow: 0 2px 16px rgba(24,63,102,0.08)` — content cards, review cards
- **Tinted** → `background: rgba(197,216,237,0.25)` — subtle stat cards, secondary panels
See `DESIGN_GUIDE.md §5` for full component specs.

**3. Doctor/person photo treatment**
Always: pill/capsule shape (`border-radius: 9999px; overflow: hidden`). Never a hard rectangle, never a circle.
Left column on desktop. Full-bleed arch on mobile (≤ 768px), text floated over bottom third.
Reference: homepage hero `.hero-photo-frame` + `.hero-photo-capsule`.

**4. Background image blending** (decorative images like spine, anatomy, etc.)
Low opacity (0.20–0.30) + `mask-image` fade on the `<img>` element itself.
Never `mix-blend-mode`. Never opacity alone without a mask — it leaves visible edges.
```css
.bg-img img {
  opacity: 0.28;
  mask-image: linear-gradient(to right, transparent 0%, black 40%, black 70%, transparent 100%);
  -webkit-mask-image: linear-gradient(to right, transparent 0%, black 40%, black 70%, transparent 100%);
}
```

**5. Typography**
Headings: Work Sans, font-weight 700. Body: Inter, font-weight 400/500.
H1: `clamp(2rem, 5vw, 3.25rem)`. H2: `clamp(1.5rem, 3.5vw, 2.25rem)`.
Never set raw px sizes — always `clamp()` for fluid scaling.
See `DESIGN_GUIDE.md §3`.

**6. Mobile breakpoints**
Single breakpoint at `768px` for layout collapse (2-col → 1-col).
`1023px` for nav-level adjustments only.
**Critical rule:** media query blocks MUST be placed LAST in the `<style>` block. Any base rule declared after a media query overrides it. Use `!important` on mobile hides (`display: none`) as a safety net.

### What NOT to invent
- No new color tokens — use only what's in `DESIGN_GUIDE.md §2 + §12`
- No new font weights or sizes outside the type scale
- No new component patterns — extend existing ones (badge, pill, card, CTA button)
- No `mix-blend-mode` on photos
- No dark hero backgrounds — the system is light-forward (80/20 light/dark)

---

## PHASE 5 — COPY TONE GUIDE
*"How to write for this specific audience — with keywords already embedded from Phase 1"*

### Voice
- Empathetic but authoritative. Not clinical, not salesy.
- Write to one person, not a crowd. Use "tú" throughout.
- Acknowledge the pain before offering the solution.

### Rules
1. Lead with the problem, follow with the solution
2. Use colloquial symptom language in emotional sections ("me duele al caminar")
3. Use clinical terms in credibility sections ("hernia discal L4-L5") with natural translation
4. Every statistic needs context: not just "80%" but "el 80% de pacientes mejora sin cirugía"
5. CTAs should remove friction: "Consultar mi Caso" beats "Agendar Cita" on condition pages

### What to avoid
- Passive voice in headings
- Medical jargon without explanation in pain-hook sections
- Multiple CTAs competing in the same section
- Generic copy that could apply to any doctor in any city

---

## PHASE 6 — ON-PAGE SEO IMPLEMENTATION
*"Applying the keyword research to every element"*

### On-Page SEO Checklist (per page)
```
[ ] <title>          → Primary keyword + geo + brand (55–60 chars)
[ ] <meta desc>      → Primary keyword + differentiator + CTA (150–155 chars)
[ ] <h1>             → Primary keyword, naturally phrased, no geo required
[ ] First H2         → Secondary keyword
[ ] Geo H2           → At least one heading includes city name
[ ] Doctor name H2   → For E-E-A-T on medical pages
[ ] FAQ JSON-LD      → FAQPage schema with 5–6 real questions
[ ] BreadcrumbList   → JSON-LD breadcrumb matching visible breadcrumb
[ ] Canonical URL    → Self-referencing canonical
[ ] Internal links   → Minimum 6–8 contextual links to related pages
[ ] Image alt text   → Descriptive, includes condition + geo where natural
[ ] Word count       → 800+ words of body copy across all sections
```

### Internal Linking Strategy
Every page should link to:
- 2–3 other `/condiciones/*` pages (related conditions)
- 1–2 `/servicios/*` pages (treatment options)
- 1 `/servicios/consulta-especialista-*` (conversion path)
- The hub page if on a child page (`/condiciones/` from any condition page)

Anchor text rule: use the target page's primary keyword as anchor. Never "click here" or "ver más".

### Local SEO Boosters
- Include `Guadalajara, Jalisco` (not just "Guadalajara") in at least one paragraph
- Mention specific colonias or landmarks if relevant (Zapopan, Tlaquepaque, Área Metropolitana)
- Use `LocalBusiness` + `Physician` schema on every page
- `addressLocality: Guadalajara`, `addressRegion: Jalisco`, `addressCountry: MX`

---

## REPLICATION CHECKLIST
*Use this when building a new page*

```
PHASE 1 — SEO KEYWORD RESEARCH
[ ] 1 primary keyword (high intent + geo)
[ ] 3-5 secondary keywords
[ ] 5-10 long-tail question-format keywords
[ ] All keywords mapped to specific sections

PHASE 2 — NARRATIVE STRATEGY
[ ] Identified visitor emotional state on arrival
[ ] Defined the one job of the page
[ ] Listed the 3 objections to defeat

PHASE 3 — NARRATIVE ARC
[ ] Mapped each section to a visitor emotional state
[ ] Confirmed CTA is positioned after trust is built

PHASE 4 — LAYOUT
[ ] Hero: photo + credential badge + primary CTA
[ ] Pain Hook: interactive symptom cards → internal links
[ ] Stats Strip: numbers that validate
[ ] Conditions/Services Grid: exploration with internal links
[ ] How It Works: 4-step timeline killing fear of process
[ ] Before/After: urgency without manipulation
[ ] Trust: doctor credentials + E-E-A-T signals
[ ] Reviews: social proof
[ ] FAQ: 5-6 accordion items + JSON-LD
[ ] Booking CTA: geo + friction-removal copy

PHASE 4.5 — DESIGN APPLICATION
[ ] Background: hero gradient + flat body + white cards (no new colors)
[ ] Card surface type chosen (glassmorphism / solid white / tinted)
[ ] Doctor photo: pill capsule shape, left col desktop, arch mobile
[ ] Decorative bg image: low opacity + mask-image fade (no mix-blend-mode)
[ ] All headings use clamp() fluid sizing (no raw px)
[ ] Media queries placed LAST in <style> block
[ ] Cross-checked against homepage hero for visual consistency
[ ] Cross-checked against DESIGN_GUIDE.md for any new component used

PHASE 5 — COPY
[ ] Second person (tú) throughout
[ ] Colloquial symptom language in pain hook
[ ] Clinical terms with translations in trust sections
[ ] Every stat has context
[ ] CTA copy is friction-reducing

PHASE 6 — ON-PAGE SEO IMPLEMENTATION
[ ] Primary keyword mapped to H1
[ ] Geo modifier in at least one H2
[ ] Doctor name in at least one H2
[ ] FAQPage JSON-LD with real questions
[ ] BreadcrumbList JSON-LD
[ ] Self-referencing canonical
[ ] 6-8 internal links with keyword-rich anchors
[ ] Meta title 55-60 chars with primary keyword + geo
[ ] Meta description 150-155 chars with differentiator + CTA
[ ] Image alt texts include condition + geo
```
