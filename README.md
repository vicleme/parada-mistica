# Parada Mística

🌐 [Português (BR)](README.pt-br.md)

Institutional site that brings together three self-knowledge tools — **Card Readings**, **Ephemeris Calculator**, and **Synastry** — under a single brand and portal.

100% static site: plain HTML, CSS, and JavaScript. No framework, no build step.

## Status

Actively developed. Some pages are intentionally placeholders while the client-facing side (bookings, About page) is finished — they're marked `title="Página ainda não publicada"` ("page not published yet") in the nav rather than left as dead links.

- **Live**: Home, Card Readings (Cartarium), Ephemeris Calculator, Synastry
- **Pending**: About, Blog, Contact, booking flow, login/avatar
- **Also pending**: newsletter signup isn't wired to an email provider yet (see comment in `index.html`)

## Project structure

```
├── index.html              → Home page
├── tiragem-cartas.html      → Tarot/oracle app (Cartarium)
├── efemerides.html          → Transits, synastry, and composite chart
├── sinastria.html           → Synastry calculator (aspects + houses)
│
├── style.css                → Home page and shared shell CSS (header, nav, footer)
├── assets/
│   ├── css/tokens.css       → Design tokens (colors, typography, spacing) — single source of truth
│   ├── fonts/                → Baguet Script font (headings)
│   └── backgrounds/, *.png  → Background images and brand assets (hamsa, logo)
│
├── efemerides/css/          → CSS specific to the ephemeris page
├── sinastria/css/, js/      → CSS and logic specific to the synastry calculator
│
├── js/                       → Shared shell scripts and Cartarium logic
│   ├── theme.js              → Light/dark/system theme toggle
│   ├── nav-dropdown.js       → "Services" dropdown in the nav
│   ├── mobile-menu.js        → Hamburger menu (mobile)
│   └── main.js, spreads.js, systems.js, chatbot.js, ...
│
├── decks/                    → Deck definitions (cigano, kipper, riderwaite, runes, sibila, ...)
├── data/                     → Meaning dictionary and synastry comparison data (JSON)
└── images/                   → Card images, organized by deck
```

## Running locally

There's no build step, so serving the static files directly is enough. Some browsers block local `fetch` of JSON files when opened straight from `file://`, so the safest option is a simple server:

```bash
# Python
python3 -m http.server 8000

# or Node
npx serve .
```

Then visit `http://localhost:8000`.

## Deployment

The repository includes a `netlify.toml` already configured for a static site (no build command, publishing the project root). Connect the repo in Netlify's dashboard and every push to the main branch deploys automatically.

## Notes

- Precision caveats for transits/ephemeris data are documented on the page itself (`efemerides.html`).
