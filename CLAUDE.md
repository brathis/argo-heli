# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## About

This is the website for [argo-heli.ch](https://argo-heli.ch), a Swiss helicopter flight booking service. The Angular app lives in the `argo-heli/` subdirectory.

## Commands

All commands run from `argo-heli/`:

```bash
npm start          # dev server at localhost:4200
npm run build      # production build → dist/argo-heli/browser/
npm run watch      # build in watch mode (development config)
npm test           # unit tests with Karma/Jasmine
npx prettier --write .  # format all files (Tailwind class sorting applied automatically)
```

No lint script is configured; Prettier (with `prettier-plugin-tailwindcss`) handles formatting.

## Architecture

### Component organization

- `src/app/common/` — shared layout components (header, footer, button) and utilities
- `src/app/page/` — one folder per route; smart components live at the top, dumb/presentational components under `_presentational/`

The root `AppComponent` renders `<app-header>`, `<router-outlet>`, and `<app-footer>`.

### Routing & lazy loading

Routes are defined in `app.routes.ts` using standalone component lazy loading (`loadComponent`). The `/flights/:flight` route is parameterized — the flight id maps to entries in `page/flights/flights/_all.ts`, which is the single source of truth for all flight definitions.

Menu visibility is driven by `data: { showInMenu: true/string }` on route objects, not hardcoded in the header.

### State & reactivity

The app uses **Angular Signals** for component-level reactive state and **Reactive Forms** for the booking form. There is no global state library (no NgRx). Change detection is **zoneless** (configured in `app.config.ts`).

### Booking backend abstraction

The booking page injects `BACKEND_SERVICE` (an `InjectionToken`), which can resolve to either `AwsBackendService` (real HTTP POST to the environment's booking endpoint) or `DummyBackendService` (local dev/testing). The interface contract lives in `backend-service.interface.ts`. Switching backends is done via DI, not feature flags.

### Environments & deployment

| Environment | Branch | API endpoint | S3 bucket |
|-------------|--------|-------------|-----------|
| dev | `develop` | `https://api-dev.argo-heli.ch/booking-requests` | `argo-heli-ch-static-website-bucket-dev` |
| prod | `main` | `https://api-prod.argo-heli.ch/booking-requests` | `argo-heli-ch-static-website-bucket-prod` |

GitHub Actions workflows in `.github/workflows/` build and deploy automatically on push to the respective branch (AWS region: `eu-central-2`).

### Internationalisation (i18n)

The app uses `@ngx-translate/core` v17 with `@ngx-translate/http-loader`. Translation files live at `public/i18n/de.json` and `public/i18n/en.json` (served as `/i18n/*.json`).

- Configured in `app.config.ts` via `provideTranslateService` + `provideTranslateHttpLoader({ prefix: '/i18n/', suffix: '.json' })`
- Language is auto-detected from the browser on startup (`app.component.ts`) and defaults to `'de'`
- A DE/EN switcher is rendered inside the nav (`common/header/lang-switcher/`)
- Every component that uses the `| translate` pipe must import `TranslateModule` in its own `imports` array (no shared module)
- Route `title` fields are translation keys (e.g. `'nav.start'`); a custom `TranslateTitleStrategy` in `translate-title.strategy.ts` translates them for the browser document title
- Flight title and synopsis are translated via dynamic keys: `'flights.' + flight.id + '.title'` and `'flights.' + flight.id + '.synopsis'` — the `id` field on each flight object acts as the namespace
- The booking email fallback template is translated via `TranslateService.instant('booking.email.subject', params)` and `'booking.email.body'` with named interpolation params

When adding a new translatable string: add the key to both `de.json` and `en.json`, then use `{{ 'key' | translate }}` in the template (or `translate.instant('key')` in TypeScript).

### Styling

Tailwind CSS 3 with a custom theme: `primary` (blues), `secondary` (yellows), `tertiary` (cyan), and a custom font ("Instrument Sans"). Tailwind classes are always sorted by Prettier — don't manually order them. SCSS is used for component styles where Tailwind alone is insufficient.
