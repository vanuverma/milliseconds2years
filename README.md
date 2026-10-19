# ⏱ Milliseconds to Years — Time Unit Converter

A fast, free, and lightweight time unit converter built with **Vite + React + TypeScript**. Enter any value in any field and all other units update instantly — no forms, no submit buttons, no lag.

**Live site → [milliseconds2years](https://github.com/vanuverma/milliseconds2years/)**

---

## Features

- **Real-time conversion** — all 8 units sync the moment you type
- **Single source of truth** — every value is derived from one internal millisecond state, preventing rounding drift
- **SEO optimised** — JSON-LD structured data, FAQ rich results, semantic HTML
- **Dark mode** — respects `prefers-color-scheme` automatically
- **Fully responsive** — 4-column grid on desktop down to single column on mobile
- **Zero dependencies** beyond React — no conversion library needed

## Supported Units

| Unit | Milliseconds |
|------|-------------|
| 1 Second | 1,000 ms |
| 1 Minute | 60,000 ms |
| 1 Hour | 3,600,000 ms |
| 1 Day | 86,400,000 ms |
| 1 Week | 604,800,000 ms |
| 1 Month *(30 days)* | 2,592,000,000 ms |
| 1 Year *(365 days)* | 31,536,000,000 ms |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm v9 or higher

### Install & run locally

```bash
# Clone the repo
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name

# Install dependencies
npm install

# Start the dev server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build for production

```bash
npm run build
```

Output is written to `dist/`. Preview it locally with:

```bash
npm run preview
```

---

## Deployment

The site deploys automatically to **GitHub Pages** via GitHub Actions on every push to `main`.

```
.github/
└── workflows/
    └── deploy.yml   ← builds and deploys on push to main
```

To set it up in a new repo:

1. Go to **Settings → Pages → Source** and select **GitHub Actions**
2. Update `base` in `vite.config.ts` to match your repository name:
   ```ts
   base: '/your-repo-name/',
   ```
3. Push to `main` — the workflow handles the rest

---

## Project Structure

```
src/
├── App.tsx        # Main component — converter, FAQ, conversion table
├── App.css        # Component styles (uses variables from index.css)
├── index.css      # Global styles, CSS variables, dark mode tokens
└── main.tsx       # React entry point
```

---

## How the Conversion Works

Every input field converts its value to a total number of milliseconds, which is stored as a single piece of state. All other fields read from that shared state by dividing by their own factor — so there is no chain of conversions and no accumulated rounding error.

```ts
// On input change
setTotalMs(inputValue * unit.factor);

// Each field displays
value={totalMs / unit.factor}
```

---

## Tech Stack

- [Vite](https://vitejs.dev/) — build tool
- [React 18](https://react.dev/) — UI
- [TypeScript](https://www.typescriptlang.org/) — type safety
- [GitHub Actions](https://github.com/features/actions) — CI/CD
- [GitHub Pages](https://pages.github.com/) — hosting

---

## License

[MIT](LICENSE)