# PortfolioOne

An open-source, data-driven portfolio site. The frontend is built with SvelteKit and TypeScript, designed to render from a single validated content manifest rather than hardcoded markup — swap the data source and the whole site updates.

**Repo:** [qamarmustapha/portfolioOne](https://github.com/qamarmustapha/portfolioOne)

## Status

This is **v1** — the frontend currently renders from a local mock manifest (`src/routes/mockData.ts`) rather than a live backend. It's structured so that swapping the mock for a real fetch is a small, contained change (see [Architecture](#architecture) below).

**v2** will connect to a Go backend, add SMTP-based verification/checking, and integrate with [Mustee Ledger](https://ledger.mustee.dev) for cryptographically-verified attestation.

## Tech Stack

- **Framework:** SvelteKit (Svelte 5)
- **Language:** TypeScript
- **Validation:** Zod
- **Styling:** Tailwind CSS
- **UI Components:** bits-ui, shadcn-svelte, Lucide icons, Tabler icons

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- npm

### Installation

```bash
git clone https://github.com/qamarmustapha/portfolioOne.git
cd portfolioOne/frontend
npm install
```

### Development

```bash
npm run dev
```

Runs the dev server with hot reload at `http://localhost:5173` (default Vite port).

### Type Checking

```bash
npm run check
```

Runs `svelte-kit sync` followed by `svelte-check` against the project's `tsconfig.json`. Recommended before every build or commit — `npm run build` alone does **not** type-check.

### Production Build

```bash
npm run build
npm run preview
```

`npm run build` outputs a production build via Vite. `npm run preview` serves that build locally so you can sanity-check it before deploying.

## Architecture

The site loads all content through a single SSR fetch in `+layout.server.ts`. That data is validated against a `PortfolioManifestSchema` (Zod) before it ever reaches a component, and split into typed context chunks using Symbol-keyed accessors — so components consume narrowly-typed slices of the manifest rather than one large untyped blob.

```
src/
├── lib/
│   ├── components/     # UI components
│   └── schema/          # Zod schemas (Manifest)
└── routes/
    ├── +layout.server.ts   # SSR load, validates and splits the manifest
    └── mockData.ts          # v1 mock data source
```

## Roadmap

- [ ] Replace mock data source with live Go backend fetch
- [ ] SMTP-based verification/checking flow
- [ ] Integration with Mustee Ledger for attestation
- [ ] Open-source release of the Go backend alongside the frontend

## License

MIT — see [LICENSE](./LICENSE).# portfolioOne
