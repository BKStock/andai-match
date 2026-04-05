# PayPay Match — Design System
> Google Stitch Format · v1.0 · 2026-04-05

---

## 1. Visual Theme & Atmosphere

**Identity**: Premium fintech for the Japanese market. Utility-first, trust-forward, dark by default.

**Mood**: Confident, fast, secure. The visual language communicates that value flows efficiently — like a circuit board that just works.

**Primary influence**: Revolut's dense-data clarity + Stripe's typographic precision + local fintech apps' utilitarian density.

**Dark theme** is the canonical design. Light theme is a first-class citizen, not an afterthought.

| Dimension | Dark | Light |
|---|---|---|
| Background feel | Deep space, near-black | Clean off-white, iOS-like |
| Brand red | Saturated, glowing | Saturated, grounded |
| Surfaces | Layered dark cards | White cards on grey |
| Borders | Subtle glow | Muted hairlines |

**Motion philosophy**: Purposeful only. Entrance animations fade-up on scroll (55ms ease). Hover: 200ms ease. No decorative looping animations except the LIVE pulse dot.

---

## 2. Color Palette & Roles

### Background Layers
```
--bg:       #060608   ← Page canvas (dark) / #F2F2F7 (light)
--surface:  #0F0F14   ← Cards, panels / #FFFFFF (light)
--elevated: #161620   ← Inputs, nested cards / #F8F8FC (light)
--border:   rgba(255,255,255,0.06)  ← Dividers / rgba(0,0,0,0.07) (light)
--border-strong: rgba(255,255,255,0.12)  ← Hover/focus borders
```

### Brand & Accent
```
--red:      #E53935   ← Primary brand, CTAs, active states
--red-l:    #FF5252   ← Gradient start
--red-d:    #C62828   ← Gradient end
--red-gradient: linear-gradient(135deg, #FF5252, #C62828)

--green:    #00E5A0   ← USDT, success, positive values, live indicators
--gold:     #FFB300   ← Points (PayPayポイント), warnings
--purple:   #7C4DFF   ← P2P marketplace, matching
--blue:     #1565C0   ← Blockchain/TronScan links
```

### Text Hierarchy
```
--text:    #FFFFFF / #0A0A14       ← Primary content
--text-2:  rgba(255,255,255,0.5)  ← Labels, secondary info
--text-3:  rgba(255,255,255,0.2)  ← Disabled, placeholder, footnotes
```

### Color Role Semantics
| Color | Use Case |
|---|---|
| Red | Primary CTA, active tabs, MoneyLight badge, error |
| Green | USDT values, success states, positive rates, LIVE dot |
| Gold | Point balances, pending states, warning |
| Purple | P2P exchange, matching animation, tier progression |
| Mono | All numeric values, hashes, rates, JetBrains Mono font |

---

## 3. Typography Rules

### Font Stack
```
Logo / Display Headings:  'Syne', sans-serif
Body / UI:                'DM Sans', 'Noto Sans JP', sans-serif
Micro / Labels:           'Inter', sans-serif
Numbers / Hashes / Code:  'JetBrains Mono', monospace
```

### Type Scale
| Token | Size | Weight | Font | Usage |
|---|---|---|---|---|
| display | clamp(28px, 8vw, 46px) | 800 | Syne | Hero H1 |
| h1 | clamp(20px, 5vw, 28px) | 800 | Syne | Section titles |
| h2 | 18–20px | 800 | Syne | Card headings |
| h3 | 14–15px | 700 | DM Sans | Subheadings |
| body-lg | 15px | 400/500 | DM Sans | Primary body |
| body | 13–14px | 400/500 | DM Sans | Standard body |
| caption | 11–12px | 400/600 | DM Sans / Inter | Labels, metadata |
| label | 10–11px | 700 | Inter | Uppercase section labels, tags |
| mono | 11–15px | 500/700 | JetBrains Mono | Rates, hashes, balances |

### Letter Spacing
- Section labels (uppercase): `letter-spacing: 2px`
- Logo: `letter-spacing: -0.5px`
- Display: `letter-spacing: -1.5px`
- Mono numbers: `letter-spacing: 0` (default)
- CTA buttons: `letter-spacing: 0.2px`

### Line Height
- Headlines: 1.12–1.18
- Body: 1.65
- Labels: 1.4

---

## 4. Component Stylings

### Buttons
```
.btn-primary
  Background: var(--red-gradient)
  Padding: 15px 28px
  Border-radius: 14px
  Font: DM Sans 700 15px
  Shadow: 0 8px 32px rgba(229,57,53,0.35)
  Hover: translateY(-2px) + shadow-red-hover

.btn-ghost
  Background: transparent
  Border: 1px solid var(--border-strong)
  Padding: 15px 22px
  Border-radius: 14px
  Hover: background var(--surface), border rgba(229,57,53,0.3)
```

### Cards
```
Standard Card:
  Background: var(--surface)
  Border: 1px solid var(--border)
  Border-radius: 20px
  Box-shadow: 0 1px 4px rgba(0,0,0,0.15)
  Hover: translateY(-2px), border-strong, shadow-md

Feature Card: Same + 16px→18px internal padding
Rate Table: overflow:hidden variant, no individual shadow
Hero Card: border-radius 24px, border-strong, shadow-lg
P2P Card: Dark gradient bg, purple border tint, purple glow shadow
```

### Tags / Badges
```
.live-badge    green, pill shape, animated dot
.tag-exclusive red tint, "限定" label
.tag-best      green tint, "推奨" label
.hero-badge-v4 red tint pill with pulse animation
.step-badge    green tint, small pill on step items
```

### Rate Display
```
Positive / USDT values: var(--green), JetBrains Mono 700
Gold / Point values:    var(--gold), JetBrains Mono 700
Rate percentage:        var(--red), JetBrains Mono 700
```

### FAQ Accordion
```
List: surface card with border, border-radius 20px
Item: border-bottom dividers
Question: 18px padding, pointer, hover bg
Chevron: rotates 180° on open (0.3s ease)
Answer: max-height 0→250px (0.35s cubic-bezier)
```

### Form Inputs
```
Background: var(--elevated)
Border: 1px solid var(--border)
Border-radius: 12px
Padding: 13px 16px
Focus: border-color var(--red), box-shadow 0 0 0 2px rgba(229,57,53,0.15)
Font: DM Sans 15px
```

### Toggles
```
Width: 44px, Height: 24px
Inactive: var(--border)
Active: var(--red) or var(--green) depending on context
Knob: white circle, transition left:2px → left:22px
```

---

## 5. Layout Principles

### Spacing Grid
8px base unit. Common values: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64px.

### Page Structure (Mobile-first)
```
Fixed nav:   height 60px (top)
Fixed tabs:  height 46px (below nav)
Main:        padding-top 106px, padding-bottom 80px
Bottom nav:  height ~54px + safe-area (fixed bottom)
```

### Content Width
Single-column mobile layout: `padding: 0 20px` on all sections.
`max-width: 640px; margin: 0 auto` for section inners if needed.

### Section Rhythm
```
lp-section:   padding: 32px 20px (standard)
hero section: padding: 56px 20px 48px (expanded)
footer:       padding: 36px 20px 24px
```

### Grid Patterns
```
2-column grid (features, trust, doc options): grid-template-columns: 1fr 1fr; gap: 12px
3-column grid (metrics, freq): grid-template-columns: repeat(3, 1fr); gap: 8–12px
4-column grid (sell type, tier badges): grid-template-columns: repeat(4, 1fr); gap: 8px
Rate/compare tables: grid-template-columns: 1fr auto auto
```

### Card Group Pattern
For lists of cards/items (rates, steps, FAQ, compare):
- Background on container = `var(--surface)`
- Individual items separated by `border-bottom: 1px solid var(--border)`
- Container has single `border-radius: 20px` + `overflow: hidden`
- This creates a cohesive grouped card pattern (iOS Settings style)

---

## 6. Depth & Elevation

Three elevation levels, each with a corresponding shadow and border treatment:

| Level | Usage | Shadow | Border | Background |
|---|---|---|---|---|
| Base | Page canvas | none | none | `var(--bg)` |
| Raised | Cards, panels | `0 1px 4px rgba(0,0,0,0.15)` | `1px solid var(--border)` | `var(--surface)` |
| Float | Inputs, nested items | `0 4px 16px rgba(0,0,0,0.2)` | `1px solid var(--border-strong)` | `var(--elevated)` |
| Overlay | Hero card, modals | `0 8px 32px rgba(0,0,0,0.3)` | `1px solid var(--border-strong)` | `var(--surface)` |

### Atmospheric Depth (Hero)
Use multi-layered radial gradients for depth illusion:
```css
radial-gradient(ellipse 120% 90% at 50% -20%, rgba(229,57,53,0.20) ...)  /* red glow */
radial-gradient(ellipse 80% 60% at 15% 110%, rgba(0,229,160,0.07) ...)   /* green corner */
radial-gradient(ellipse 60% 50% at 85% 90%, rgba(124,77,255,0.07) ...)   /* purple corner */
```

### Special Glow Effects
- Red CTA shadow: `0 8px 32px rgba(229,57,53,0.35)` → hover `0 12px 40px rgba(229,57,53,0.45)`
- Step number shadow: `0 4px 12px rgba(229,57,53,0.3)`
- P2P card shadow: `0 4px 24px rgba(124,77,255,0.08)`

---

## 7. Do's and Don'ts

### Do's
- **DO** use Syne 800 for all display headings and the logo
- **DO** use JetBrains Mono for all numeric values, rates, hashes, and balances
- **DO** use the grouped-card pattern (container surface + dividers) for lists
- **DO** maintain consistent 20px horizontal padding across all sections
- **DO** include a LIVE badge with animated pulse dot on real-time data
- **DO** use section labels (uppercase, 10px, Inter 700, letter-spacing 2px) above every major section
- **DO** use `translateY(-2px)` hover lift on interactive cards and primary buttons
- **DO** use `transition: 0.2s ease` for micro-interactions
- **DO** provide both `.jp-text` and `.en-text` elements for bilingual UI
- **DO** use radial gradient backgrounds for depth in hero and feature sections
- **DO** use `rgba` borders rather than solid colors for borders on dark backgrounds
- **DO** apply `box-shadow: var(--shadow-red)` on all primary red buttons

### Don'ts
- **DON'T** use emojis in professional content sections (hero, how-it-works, features, trust, FAQ, footer)
- **DON'T** use `any` colors outside the design token set
- **DON'T** use `font-weight` below 500 for UI elements at 13px or smaller
- **DON'T** use border-radius above 24px for content cards (hero card max)
- **DON'T** use `box-shadow` with spread greater than 40px on red elements
- **DON'T** use pure `#000000` or `#FFFFFF` — use `--bg` and `--text` tokens
- **DON'T** mix themed components with hardcoded colors (always use CSS vars)
- **DON'T** use more than 3 accent colors in a single section
- **DON'T** apply hover effects to non-interactive elements
- **DON'T** use percentage widths for text elements — use `max-width` constraints

---

## 8. Responsive Behavior

### Breakpoint Strategy
Mobile-first, single breakpoint at `480px` (small phones), `640px` (standard).

```css
/* Default = mobile (320–428px viewport) */
/* @media (min-width: 480px) = wider phones */
/* @media (min-width: 640px) = tablet/desktop */
```

### Key Responsive Rules

| Component | Mobile | >= 480px |
|---|---|---|
| Hero H1 | `clamp(28px, 8vw, 46px)` | Larger end applies |
| Section title | `clamp(20px, 5vw, 28px)` | Larger end applies |
| Features grid | 1fr 1fr (2-col) | 1fr 1fr (stays 2-col) |
| Trust grid | 1fr 1fr (2-col) | 1fr 1fr (stays 2-col) |
| Metrics grid | 3-col fixed | 3-col fixed |
| Footer links | 2-col grid | 2-col → 4-col |
| Hero conv card | `max-width: 380px; width: 100%` | Centered |

### Fixed Elements
- Nav: `position: fixed; top: 0` — always full width
- Tabs: `position: fixed; top: 60px` — scrollable horizontally
- Bottom nav: `position: fixed; bottom: 0` — always full width with safe area

### Safe Areas
```css
.bnav { padding-bottom: env(safe-area-inset-bottom); }
```

### Text Truncation
Long hashes/addresses: `word-break: break-all` with `font-family: JetBrains Mono`

### Overflow Prevention
```css
body { overflow-x: hidden; }
.tabs { overflow-x: auto; scrollbar-width: none; }
```

---

## 9. Agent Prompt Guide

Use this section to regenerate or extend UI in this design system.

### Style Primer
```
Design system: PayPay Match fintech. Mobile-first, dark theme default.
Font stack: Syne 800 (headings/logo), DM Sans (UI body), Inter (labels/metadata), JetBrains Mono (numbers/code).
Color tokens: --red #E53935, --green #00E5A0, --gold #FFB300, --purple #7C4DFF.
Background: #060608 (dark) / #F2F2F7 (light), Surface: #0F0F14 / #FFFFFF.
Border: rgba(255,255,255,0.06). Text: #FFFFFF / rgba(255,255,255,0.5) / rgba(255,255,255,0.2).
```

### Component Generation Prompt Template
```
Create a [COMPONENT] for PayPay Match using:
- Font: DM Sans for text, Syne 800 for titles, JetBrains Mono for numbers
- Colors: surface var(--surface), border var(--border), red var(--red)
- Border-radius: 20px for cards, 100px for pills/tags
- Padding: 16-20px internal card padding
- Transitions: 0.2s ease on hover (translateY(-2px) lift)
- Dark/light theme support via CSS custom properties
- No emojis — use SVG icons or CSS shapes
```

### Section Addition Prompt
```
Add a new LP section to PayPay Match:
- Follow the pattern: section-label (10px Inter 700 red uppercase) + section-title (Syne 800) + section-sub
- Use .lp-section class with padding: 32px 20px
- Add .reveal class for scroll animation (JS will add .visible on intersection)
- Place before the FAQ section, after [PREVIOUS SECTION]
- Keep all design tokens as CSS var() references
- Support both data-theme="dark" and data-theme="light"
```

### Dark/Light Override Pattern
```css
/* Default (dark) */
.component { background: var(--surface); color: var(--text); }

/* Light overrides only when needed */
[data-theme="light"] .component { box-shadow: 0 1px 4px rgba(0,0,0,0.08); }
```

### Bilingual (JP/EN) Pattern
```html
<span class="jp-text">日本語</span>
<span class="en-text">English</span>
```
```css
[data-lang="en"] .jp-text { display: none; }
[data-lang="ja"] .en-text { display: none; }
```

### Rate/Number Display Pattern
```html
<span class="rate-val-v4 rv-green">6.50 USDT</span>
```
Always: JetBrains Mono, font-weight 700, color via semantic class (rv-green/rv-gold/rv-red).
