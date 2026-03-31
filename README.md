# Friend&Friends — B2B Wholesale Website

> A premium, modern wholesale supplier website built with pure HTML, CSS, and JavaScript. No frameworks. No build tools. Deploy anywhere instantly.

---

## Table of Contents

- [Overview](#overview)
- [Live Preview](#live-preview)
- [Project Structure](#project-structure)
- [Pages & Sections](#pages--sections)
- [Design System](#design-system)
- [Typography](#typography)
- [Animations & Interactions](#animations--interactions)
- [Customisation Guide](#customisation-guide)
- [Deployment](#deployment)
- [Browser Support](#browser-support)
- [Technical Notes](#technical-notes)

---

## Overview

**Friend&Friends** is a B2B wholesale supplier website designed to generate business inquiries — not direct purchases. The site is intentionally price-free; every call-to-action directs visitors to submit a requirement, contact the team, or become a partner.

**Core goals of the design:**

- Communicate trust, reliability, and professionalism
- Guide wholesale buyers toward sending requirements
- Present product categories without exposing pricing
- Feel premium — closer to a Stripe or Apple product page than a generic directory listing

---

## Live Preview

To preview locally, simply open `index.html` in any modern browser. No server or build step required.

```bash
# Option 1 — open directly
open index.html

# Option 2 — serve with Python (avoids font CORS issues on some systems)
python3 -m http.server 3000
# then visit http://localhost:3000
```

---

## Project Structure

```
friend-and-friends/
├── index.html        # Full page markup — all 11 sections
├── style.css         # All styles, design tokens, responsive rules
├── script.js         # Scroll animations, nav, form, toast
└── README.md         # This file
```

> No `node_modules`. No `package.json`. No build pipeline. Drop these four files into any host and it works.

---

## Pages & Sections

The homepage is a single-page layout with smooth-scroll navigation. Each section has an `id` that maps to a nav link.

| # | Section | ID | Purpose |
|---|---|---|---|
| 1 | Navbar | — | Sticky navigation with glass effect on scroll |
| 2 | Hero | `#home` | Full-viewport hero with headline, stats, and warehouse illustration |
| 3 | Trust Strip | — | Four trust signals with icons |
| 4 | What We Do | `#about` | Four feature cards: Bulk Supply, Pricing, Catalogue, Partnership |
| 5 | Product Catalogue | `#products` | Six product category cards (no prices) |
| 6 | Custom Sourcing | — | Split layout encouraging custom requirements |
| 7 | How It Works | — | Five-step horizontal process flow |
| 8 | Why Choose Us | — | Five differentiators on a navy background |
| 9 | Requirement Form | `#contact` | Split layout with a shadow-elevated form card |
| 10 | Final CTA | — | Full-width blue gradient call-to-action banner |
| 11 | Footer | — | Brand, links, contact info, social icons |

---

## Design System

All design decisions are encoded as CSS custom properties in `:root` inside `style.css`. Change any token and it propagates site-wide.

### Color Palette

| Token | Hex | Usage |
|---|---|---|
| `--navy` | `#0B1F3A` | Primary brand color, hero background, section backgrounds |
| `--blue` | `#1E40AF` | Secondary — section titles, primary buttons, accents |
| `--blue-mid` | `#2563EB` | Button hover states |
| `--blue-light` | `#3B82F6` | Subtle UI accents, footer logo |
| `--green` | `#10B981` | All CTAs and action buttons only (5% rule) |
| `--green-d` | `#059669` | Green hover state |
| `--white` | `#FFFFFF` | Base background |
| `--grey-bg` | `#F3F4F6` | Alternate section backgrounds |
| `--grey-mid` | `#E5E7EB` | Card borders, dividers |
| `--grey-line` | `#D1D5DB` | Subtle separators |
| `--text-pri` | `#111827` | Body text |
| `--text-sec` | `#6B7280` | Subtext, descriptions |
| `--text-muted` | `#9CA3AF` | Placeholder, minor labels |

The site follows the **80-15-5 rule**: 80% white/grey, 15% navy/blue, 5% green (CTAs only).

### Spacing Scale

An 8-point spacing system. All padding, margin, and gap values derive from these tokens:

| Token | Value | Typical Use |
|---|---|---|
| `--sp-1` | `8px` | Tight gaps (icon padding, small labels) |
| `--sp-2` | `16px` | Inline gaps, form field spacing |
| `--sp-3` | `24px` | Card internal gaps, grid gutters |
| `--sp-4` | `32px` | Card padding, section label margin |
| `--sp-5` | `48px` | Container horizontal padding, larger gaps |
| `--sp-6` | `64px` | Footer padding, form card padding |
| `--sp-7` | `96px` | Section grid gaps, split layout spacing |
| `--sp-8` | `128px` | Section vertical padding (top/bottom) |

### Shadow System

Four tiers of elevation shadows, all derived from the navy brand color:

| Token | Use Case |
|---|---|
| `--shadow-sm` | Subtle depth on small elements (step icons, trust icons) |
| `--shadow-md` | Cards in their resting state |
| `--shadow-lg` | Cards on hover, form card |
| `--shadow-xl` | Hero image, floating badges, hero frame |

### Border Radius

| Token | Value | Used On |
|---|---|---|
| `--radius-sm` | `8px` | Buttons, inputs, icon wraps |
| `--radius-md` | `14px` | Why-choose points, toast |
| `--radius-lg` | `20px` | Feature cards, product cards |
| `--radius-xl` | `28px` | Hero image frame, form card, flex visual |

---

## Typography

Two fonts loaded from Google Fonts:

| Font | Weights | Role |
|---|---|---|
| **Plus Jakarta Sans** | 300, 400, 500, 600, 700, 800 | All UI text — headings, body, labels, buttons |
| **Instrument Serif** | Italic | Italic accent on section titles and hero heading |

### Type Hierarchy

| Element | Size | Weight | Notes |
|---|---|---|---|
| Hero heading | `clamp(2.4rem, 4vw, 3.4rem)` | 800 | Letter-spacing `−0.04em` |
| Section title | `clamp(1.9rem, 3vw, 2.6rem)` | 800 | Italic `em` uses Instrument Serif |
| CTA title | `clamp(2rem, 3.5vw, 3rem)` | 800 | Used in the final CTA band |
| Card title | `1.05rem` | 700 | Letter-spacing `−0.02em` |
| Body / desc | `0.88–1rem` | 400 | Line-height `1.65–1.75` |
| Labels / tags | `0.72–0.78rem` | 700 | Uppercase, spaced `0.18em` |

---

## Animations & Interactions

### Scroll Fade-In

Every major section element carries the `.fade-up` class. On load, they are invisible (`opacity: 0; transform: translateY(32px)`). An `IntersectionObserver` in `script.js` adds `.visible` when the element crosses the viewport threshold, triggering a smooth easing transition.

- Threshold: `10%` of element visible
- Root margin: `−48px` from bottom (triggers slightly before full visibility)
- Staggered delays via `.delay-1`, `.delay-2`, `.delay-3` classes

Hero elements are triggered immediately on load (120ms base delay, +80ms per element) so they animate in without requiring a scroll.

### Hover States

| Element | Hover Effect |
|---|---|
| Feature cards | Lift `−6px`, shadow deepens, gradient top-border slides in |
| Product cards | Lift `−5px`, shadow deepens |
| Primary buttons | Lift `−2px`, shadow widens |
| Ghost / border buttons | Border opacity increases, subtle background tint |
| Nav links | Underline animates in from left |
| Why-choose points | Background tint + border appears |
| Step icons | Blue ring appears with subtle glow |
| Social footer links | Blue tint background |

### Hero Floating Animation

The hero image frame and floating badges use a CSS `@keyframes float` animation — a gentle 6-second vertical oscillation (`0 → −10px → 0`). Each badge has a different `animation-delay` to create an organic, non-synchronised feel.

### Navbar Glass Effect

On scroll past 30px, the navbar gains:
- `background: rgba(255,255,255,0.9)`
- `backdrop-filter: blur(20px) saturate(180%)`
- Subtle bottom border and box-shadow

---

## Customisation Guide

### Changing Brand Name

Search and replace `Friend&Friends` across `index.html`. The logo is built from three `<span>` elements:

```html
<span class="logo-main">Friend</span>
<span class="logo-amp">&</span>
<span class="logo-main">Friends</span>
```

Change `.logo-main` content and adjust `.logo-amp` color if desired.

### Changing Colors

All colors are CSS variables in `:root` at the top of `style.css`. Change one value to update it everywhere:

```css
:root {
  --navy:  #0B1F3A;  /* ← change your primary brand color here */
  --green: #10B981;  /* ← change your CTA color here */
}
```

### Replacing SVG Illustrations

Each section's visual is an inline SVG. To swap for a real photo:

1. Remove the `<div class="hero-img-placeholder">` block
2. Add an `<img>` tag with `style="width:100%; height:100%; object-fit:cover;"`

```html
<!-- Replace this: -->
<div class="hero-img-placeholder">
  <svg>...</svg>
</div>

<!-- With this: -->
<img src="images/warehouse.jpg" alt="Warehouse" style="width:100%;height:100%;object-fit:cover;" />
```

### Adding Real Products

Each product card in the `#products` grid follows this structure:

```html
<div class="product-card">
  <div class="product-img-wrap">
    <img src="images/your-product.jpg" alt="Product Name" />
    <div class="product-img-overlay"></div>
    <div class="product-badge">Category</div>
  </div>
  <div class="product-body">
    <h3 class="product-name">Product Name</h3>
    <p class="product-desc">Short description of the product.</p>
    <div class="product-actions">
      <a href="#contact" class="btn-sm-primary">Request Price</a>
      <a href="#contact" class="btn-sm-ghost">Get Details</a>
    </div>
  </div>
</div>
```

> **Important:** Do not add prices to product cards. The design is intentionally price-free to generate inquiry-based leads.

### Updating Contact Details

Update the footer contact list and the `mailto:` link in the final CTA section:

```html
<!-- Footer contact items -->
<li>Mon–Sat, 10am–7pm</li>
<li>+91 00000 00000</li>
<li>hello@yourcompany.com</li>

<!-- Final CTA email button -->
<a href="mailto:hello@yourcompany.com" class="cta-btn-ghost">Contact Us</a>
```

### Connecting the Form

The form in `script.js` currently simulates a submission (1.8-second delay + toast). To connect it to a real backend:

```javascript
// In script.js, replace the setTimeout block with a real fetch:
const formData = new FormData(form);

fetch('/api/submit-requirement', {
  method: 'POST',
  body: JSON.stringify(Object.fromEntries(formData)),
  headers: { 'Content-Type': 'application/json' },
})
  .then(res => res.json())
  .then(() => {
    btn.innerHTML = originalContent;
    btn.disabled  = false;
    form.reset();
    showToast();
  })
  .catch(() => {
    btn.innerHTML = originalContent;
    btn.disabled  = false;
    // handle error
  });
```

For a no-backend option, services like **Formspree**, **Web3Forms**, or **EmailJS** can receive submissions without any server.

---

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI if needed
npm i -g vercel

# From the project folder
vercel deploy
```

Vercel auto-detects static HTML and deploys with zero configuration.

### Netlify

Drag and drop the project folder at [app.netlify.com/drop](https://app.netlify.com/drop).

Or via CLI:

```bash
npm i -g netlify-cli
netlify deploy --prod --dir .
```

### GitHub Pages

1. Push the folder to a GitHub repository
2. Go to **Settings → Pages**
3. Set source to `main` branch, root folder
4. Your site is live at `https://username.github.io/repo-name`

### Any Static Host

Upload the four files (`index.html`, `style.css`, `script.js`, `README.md`) to any web host that serves static files — Cloudflare Pages, Render, Surge, AWS S3 + CloudFront, etc.

> Google Fonts are loaded via CDN. The site requires an internet connection on first load for fonts to render correctly. If deploying to an intranet or offline environment, download and self-host the fonts locally.

---

## Browser Support

| Browser | Version | Support |
|---|---|---|
| Chrome | 88+ | ✅ Full |
| Firefox | 90+ | ✅ Full |
| Safari | 14+ | ✅ Full (`-webkit-backdrop-filter` included) |
| Edge | 88+ | ✅ Full |
| Opera | 74+ | ✅ Full |
| IE 11 | — | ❌ Not supported |

Features used: CSS custom properties, CSS Grid, `clamp()`, `backdrop-filter`, `IntersectionObserver`, CSS `@keyframes`, `aspect-ratio`.

---

## Technical Notes

### No Frameworks

The entire site is vanilla HTML5, CSS3, and ES6 JavaScript. There is no dependency on React, Vue, Tailwind, Bootstrap, jQuery, or any other library. The Google Fonts `<link>` is the only external resource.

### JavaScript Architecture

`script.js` is wrapped in an IIFE (`immediately invoked function expression`) with `'use strict'` to avoid polluting the global scope. All logic is self-contained.

The five responsibilities of `script.js`:

1. **Sticky navbar** — toggles `.scrolled` class at 30px scroll depth
2. **Scroll animations** — `IntersectionObserver` adds `.visible` to `.fade-up` elements
3. **Mobile nav toggle** — opens/closes `.nav-links` with hamburger-to-× animation
4. **Form handling** — validates required fields, simulates async submission, shows toast
5. **Smooth scroll** — calculates `offsetTop` minus navbar height for perfect anchor positioning

### Performance

- No render-blocking scripts (`script.js` loads at end of `<body>`)
- Google Fonts loaded with `rel="preconnect"` for faster DNS resolution
- All illustrations are inline SVGs — zero image HTTP requests
- CSS animations use `transform` and `opacity` only — GPU-accelerated, no layout thrashing

### Accessibility

- Navbar toggle button has `aria-label="Toggle menu"`
- All SVG icons used decoratively have no accessible names (intentional)
- Form inputs use `<label>` elements correctly
- Color contrast ratios meet WCAG AA for all text on their respective backgrounds
- Focus states are preserved on all interactive elements

---

## License

This code is provided for use with the Friend&Friends brand. Replace placeholder contact details, illustrations, and product content before publishing publicly.

---

*Built with precision. Designed for growth.*
