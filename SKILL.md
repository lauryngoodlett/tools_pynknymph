# Pynk Nymph — Brand Design System

A working reference for designers, developers, and AI agents building inside the Pynk Nymph system. Read this **before** modifying anything; the rules are tight on purpose.

---

## What is this?

Pynk Nymph is an inclusive waxing & skincare studio in downtown Richmond, VA. The brand voice is direct, warm, and a little funny — bold without being aggressive, intimate without being cute. The visual system runs on **four colors, two typefaces, and one big idea: clarity is a form of care.**

This project contains the full system across five surfaces:

| File | What it is |
|---|---|
| `index.html` | System hub — entry point, links to all surfaces |
| `brand-guidelines.html` | 23-slide deck of the full brand book |
| `design-system.html` | Printable UI kit reference (tokens, ramp, components) |
| `website.html` | Homepage UI kit applied to a real layout |
| `social.html` | Instagram post + story templates |

---

## File map

```
/
├── index.html              # System hub
├── brand-guidelines.html   # Brand book deck
├── design-system.html      # UI kit
├── website.html            # Web UI kit
├── social.html             # Social kit
├── deck-stage.js           # Deck shell component (do not edit)
├── styles/
│   └── tokens.css          # SINGLE SOURCE OF TRUTH for tokens
└── assets/
    ├── PN_Logo.svg         # PN monogram
    ├── PN_logotype.svg     # Pynk Nymph wordmark (stacked)
    ├── BootyNymph.svg      # Mascot illustration
    ├── cactus-mark-1.svg   # Decorative motif
    ├── cactus-mark-2.svg   # Decorative motif
    ├── sparkle-big.svg     # Decorative sparkle
    ├── sparkle-small.svg   # Decorative sparkle
    └── img/                # Photography + raster assets
```

**Rule:** every page links `styles/tokens.css`. Never inline color or font values that exist as tokens — use the variable.

---

## Color tokens

All colors live in `styles/tokens.css` as CSS custom properties. Use them; don't hand-pick hex values.

### Primary palette

| Token | Hex | Use |
|---|---|---|
| `--pn-aloe-dark` | `#283414` | Default text on light, primary dark surface |
| `--pn-aloe-mid` | `#4a5a2e` | Secondary text, eyebrow labels |
| `--pn-aloe-light` | `#8aa05c` | Accent surface, success-adjacent |
| `--pn-aloe-pale` | `#d8e0bf` | Tinted card thumb, subtle wash |
| `--pn-juicy-fruit` | `#e8425c` | Primary accent (the "pynk") |
| `--pn-dragon-fruit` | `#d4365e` | Hot accent, sale/now badges |
| `--pn-strawberry` | `#c2304a` | Deep accent, used sparingly |
| `--pn-wine` | `#5a1f2c` | Deep surface, photo overlays |
| `--pn-mango` | `#f5c560` | Warm accent, secondary highlight |
| `--pn-mango-50` | `#faf3e3` | Default light surface (the cream) |
| `--pn-mango-1500` | `#1a1208` | Near-black, footers |
| `--pn-pink-pale` | `#fce6e0` | Light pink, on dark surfaces only |
| `--pn-charcoal` | `#3a3a36` | Body text alt, lower contrast |

### Pairing rules

1. **Cream + Aloe Dark** is the default. Use this for 80% of any layout.
2. **Juicy Fruit** is an accent. Never large fields of it. Use for one word, one headline, one button.
3. **Aloe Dark backgrounds** want **Mango-50** or **Pink-pale** text.
4. **Wine** wants **Pink-pale** text. Never wine-on-aloe.
5. Two accent colors per layout is the ceiling.

---

## Typography

Two typefaces. That's the whole stack.

### Display — `Caprasimo` (italic, weight 400 only)

The hand-drawn liquid wordmark feel. Used for **headlines, slide titles, hero type**. Always italic. Always low weight (400). Letter-spacing always negative (`-0.02em` to `-0.025em`). Line-height tight (0.92–1.0).

```css
font-family: var(--pn-display);  /* "Caprasimo", Georgia, serif */
font-style: italic;
font-weight: 400;
letter-spacing: -0.02em;
```

### Sans — `Inter`

Clear UI sans for **body, labels, controls, captions**.

```css
font-family: var(--pn-sans);  /* "Inter", -apple-system, sans-serif */
```

### Mono — `JetBrains Mono`

For **eyebrows, metadata, ALL CAPS labels**. Always uppercase, always `letter-spacing: 0.18em–0.22em`.

```css
font-family: var(--pn-mono);
text-transform: uppercase;
letter-spacing: 0.2em;
```

### Type ramp

| Role | Size | Family |
|---|---|---|
| Display XL (hero) | `clamp(72px, 9vw, 168px)` | Caprasimo italic |
| Display L (section) | `clamp(48px, 5.5vw, 96px)` | Caprasimo italic |
| Display M (card) | `30–48px` | Caprasimo italic |
| Body L | `18px / 1.6` | Inter |
| Body | `15–16px / 1.6` | Inter |
| Eyebrow | `11–13px, +0.2em tracking, uppercase` | JetBrains Mono |

---

## Spacing & radius

| Token | Value | Use |
|---|---|---|
| `--pn-r-card` | `20px` | Cards, image containers |
| `--pn-r-pill` | `999px` | Buttons, motif pills |
| `--pn-r-sm` | `8px` | Small surfaces, badges |

Layout grid is 12-column with 24–32px gutters. Section padding: `96px 50px` desktop, `64px 24px` mobile.

---

## Components

The canonical references live in `design-system.html`. Below is the cheat sheet.

### Buttons

```html
<a class="btn btn-primary">Book now</a>     <!-- juicy-fruit fill, white text -->
<a class="btn btn-dark">Learn more</a>      <!-- aloe-dark fill, mango-50 text -->
<a class="btn btn-ghost">View pricing →</a> <!-- transparent, aloe-dark border -->
```

All buttons are `border-radius: 999px`, padding `14px 28px`, font Inter 500.

### Cards

Two variants:
- **Photo card** — image top (16:10 or 1:1), white footer with eyebrow + title + caption.
- **Color card** — solid swatch top, oversized italic Caprasimo text, white footer.

### Marquees

The horizontal scrolling text strip is a brand signature. Two stock variants exist as `.pn-scroll-aloe` (aloe-light bg) and `.pn-scroll-pink` (juicy-fruit bg). Always use the diamond `◆` separator. Animation lives in `tokens.css`.

### Motifs

Decorative SVGs in `assets/`. Use sparingly — one motif per section, never overlapping the wordmark.

- `sparkle-big.svg` / `sparkle-small.svg` — accent stars
- `cactus-mark-1.svg` / `cactus-mark-2.svg` — section dividers
- `BootyNymph.svg` — mascot, **only on full-bleed hero or playful contexts**

---

## Voice & copy rules

1. **Direct over coy.** "Get your ass waxed." not "Pamper your posterior."
2. **Lowercase headlines** when set in Caprasimo. The italic + lowercase carries the warmth.
3. **Periods on headlines.** Hard stops feel decisive.
4. **Mono labels are uppercase** and use the diamond `◆` as a marker glyph.
5. **No exclamation points** in marketing copy. Confidence doesn't shout.
6. **"For every body"** is the inclusivity tagline. Never "for everyone" or "for all bodies."

---

## Do / Don't

### ✅ Do
- Pair Caprasimo italic with mono eyebrow labels
- Use Mango-50 cream as the default page background
- Set headlines tight (line-height 0.92–1.0, negative letter-spacing)
- Let one accent color carry the page; use it sparingly
- Use full-bleed photography with text overlays for impact

### ❌ Don't
- Use Caprasimo upright (it only ships in italic 400)
- Use any color outside the token set
- Mix more than two accent colors in one layout
- Use the mascot as decoration on every page (it's a moment, not a pattern)
- Add gradient backgrounds, rounded-corner cards with left-border accents, or AI-generated illustrations — none are on-brand

---

## Working with this system

### Editing the deck (`brand-guidelines.html`)

The deck uses a custom `<deck-stage>` web component (`deck-stage.js`). Each slide is a direct child `<section>` of `<deck-stage>`. The component handles scaling, keyboard nav (←/→/space), and the slide counter. **Do not edit `deck-stage.js`** — it's a shared shell.

To add a slide: append a new `<section>` with a `data-screen-label` attribute matching its number (e.g. `data-screen-label="24 New Slide"`).

### Editing tokens

All token changes go in `styles/tokens.css`. Touching it ripples to every page. If you add a new token, document it here too.

### Adding a new page

1. Link `<link rel="stylesheet" href="styles/tokens.css" />`
2. Set `body { background: var(--pn-mango-50); color: var(--pn-aloe-dark); }`
3. Open with the `.pn-topbar` pattern (see `index.html`)
4. Use the existing component patterns from `design-system.html` — don't reinvent

---

## Credits

Brand & design system: Off Hours Creative · 2026
Built for: Pynk Nymph · Richmond, VA
