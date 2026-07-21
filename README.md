# AYDOĞDU LOKANTASI — Website

A single-page promotional website for a traditional Turkish esnaf lokantası (tradesmen's restaurant) in Bostancı, Ataşehir — featuring a content management system for non-technical editors.

**Live site:** `https://johnalfred2.github.io/aydogdulokanta/`  
**CMS admin:** `https://johnalfred2.github.io/aydogdulokanta/admin/`

---

## Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **HTML** | Semantic HTML5 + Bootstrap 5.2.3 | Layout, grid, responsive utilities |
| **CSS** | Custom stylesheet (`style.css`) | Brand colors, typography, animations |
| **Icons** | Lucide (inline SVGs) + Font Awesome 6.6 | Category icons, social media |
| **JavaScript** | Vanilla ES5 | Scroll behavior, active tab tracking, sticky header, back-to-top, loader |
| **CMS** | Sveltia CMS (`@sveltia/cms`) | Content editing for non-technical users |
| **Data layer** | `data.json` | Single source of truth for all editable content |
| **Hosting** | GitHub Pages | Free static hosting with CDN |
| **Auth** | GitHub Personal Access Token (PAT) | CMS authentication (no OAuth server needed) |

---

## Project Structure

```
aydogdulokanta/
├── index.html                # Single-page site
├── data.json                 # All editable content (menu, hours, contact, hero)
├── admin/
│   ├── index.html            # Sveltia CMS entry point
│   └── config.yml            # CMS field definitions (collections, widgets)
├── assets/
│   ├── css/style.css         # All custom styles (~850 lines)
│   ├── js/
│   │   ├── script.js         # Sticky menu, active tabs, scroll, header, loader
│   │   └── render.js         # Fetches data.json, populates page dynamically
│   ├── icons/                # Lucide SVG icons for categories
│   └── images/               # Logo (cropped version)
├── ana_yemek.jpg             # Food photo (used as placeholder)
├── logo.png                  # Site logo
└── admin/config.yml          # Sveltia CMS configuration
```

---

## Content Management System

### How it works

1. **Editor visits** `https://johnalfred2.github.io/aydogdulokanta/admin/`
2. Clicks **"Sign In with Token"** and pastes a GitHub Personal Access Token  
   *(One-time setup — token is stored in the browser)*
3. Edits content through a clean form UI (prices, names, descriptions, hours, photos, etc.)
4. Saves → Sveltia CMS commits changes to `data.json` on GitHub  
   → GitHub Pages auto-deploys → site updates in 1–2 minutes

### Editable fields

| Section | Fields |
|---|---|
| **Restaurant Info** | Name, year badge, tagline, description, CTA button text, phone number, video paths (desktop + mobile) |
| **Menu Categories** | 5 categories (Çorbalar, Ana Yemek, Döner, Tatlılar, İçecekler) with name, image, items (name, description, price, featured label) |
| **Working Hours** | 7 days, editable per day |
| **Contact** | Address, Google Maps URL, phone |

### Page rendering

The site displays content from `data.json` at runtime via `render.js`. If `data.json` is unreachable, the page falls back to hardcoded HTML content.

---

## Key Implementation Details

### Sticky Category Tabs
- The category tabs bar becomes `position: fixed` when scrolled past the header
- Active tab tracking uses a scroll-based trigger line that accounts for the sticky bar height
- Clicking a tab sets active immediately and scrolls to the section
- Mobile touch devices have hover effects disabled to prevent persistent tap states

### Hero Video
- Two separate `<video>` sources: desktop (shown on `md+` breakpoints) and mobile (shown below `md`)
- Both paths are editable in the CMS
- Video background fills the banner with `object-fit: cover`

### Responsive Banner
- Banner height is content-determined with `60vh` base (desktop) / `70vh` (mobile) — *configurable via CSS*
- Background gradient falls back behind the video
- Overlay improves text readability against video

### Back-to-Top Button
- Hidden by default, appears after scrolling past 300px
- Animated upward bounce on hover (desktop only — disabled on touch devices)

### Cache Strategy
- `data.json` is fetched with `{ cache: 'no-cache' }` to ensure fresh content
- HTML includes `Cache-Control: no-cache` meta tags
- CSS/JS assets use version query parameters (`?v=1.0` — bump on changes)

---

## Deployment

### GitHub Pages
The site is automatically deployed from the `main` branch via GitHub Pages:

1. Push changes to `main`
2. GitHub builds and deploys automatically (~1–2 minutes)
3. Site updates at `https://johnalfred2.github.io/aydogdulokanta/`

### Updating CSS/JS
After changing `style.css`, `script.js`, or `render.js`:
1. Increment the version number in `index.html`:
   - `style.css?v=1.0` → `style.css?v=1.1`
   - `script.js?v=1.0` → `script.js?v=1.1`
   - `render.js?v=1.0` → `render.js?v=1.1`
2. Commit and push

This forces browsers to download the new files instead of using cached versions.

---

## Development Notes

### Adding menu items
New items can be added through the Sveltia CMS admin interface. Each category supports a dynamic list of items. To add items programmatically, edit `data.json` and add new entries to the `categories[].items[]` array.

### Changing category icons
Icons are inline SVGs from [Lucide](https://lucide.dev/icons/). To change an icon:
1. Find the corresponding SVG path from Lucide
2. Replace the `<path>` elements in the inline SVG within `index.html`
3. Also update the SVG file in `assets/icons/` for future reference

### Modifying CMS field definitions
Edit `admin/config.yml` to add or modify fields. Each field in the CMS maps to a key in `data.json`. The widget type determines the input UI:
- `string` → text input
- `text` → textarea
- `number` → numeric input
- `image` → file uploader
- `list` → repeatable item list
- `object` → nested group of fields

---

## License

All rights reserved. © AYDOĞDU LOKANTASI.
