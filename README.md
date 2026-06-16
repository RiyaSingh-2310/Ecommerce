# Leegality

A production-grade e-commerce storefront built with React. Browse products from the DummyJSON API, filter and paginate the catalog, and explore a polished shopping experience with authentication, dark mode, and responsive layouts.

## Tech stack

- **React 19** with functional components and hooks
- **Vite** for dev server and builds
- **React Router DOM** for client-side routing
- **Tailwind CSS v4** with a semantic design token system
- **Framer Motion** for page and micro-interactions
- **Axios** for API requests
- **Sonner** for toast notifications
- **Lucide React** for icons
- **React Context** + custom hooks for shared state

## Getting started

### Prerequisites

- Node.js 18+
- npm

### Setup

```bash
# 1. Clone the repository
git clone <repository-url>
cd ecommerce

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev

# 4. Build for production
npm run build

# 5. Preview the production build locally
npm run preview
```

The dev server runs at `http://localhost:5173` by default.

### Demo login

| Field    | Value                      |
|----------|----------------------------|
| Email    | `demo.user@theexample.com` |
| Password | `demoUser@the123`          |

You can also create a new account at `/signup`.

## Features

- Product listing with category, brand, price, and search filters
- URL-persisted filter state (shareable, refresh-safe)
- Paginated catalog via DummyJSON `limit` / `skip`
- Product detail pages with image gallery and reviews
- Simulated auth (login, signup, logout) with `localStorage`
- Dark / light theme with no flash on load
- Expandable header search
- Mobile bottom navigation and filter drawer
- Skeleton loaders, empty states, and error handling with retry

## Project structure

```
src/
├── app/              # Root application shell
├── routes/           # Route definitions and guards
├── layouts/          # Main layout wrappers
├── pages/            # Route-level views
├── components/
│   ├── ui/           # Primitives (Button, Input, Badge)
│   ├── layout/       # Header, search, navigation
│   ├── product/      # Cards, grid, gallery, detail
│   ├── filters/      # Sidebar, drawer, chips
│   ├── auth/         # Login and signup forms
│   ├── loaders/      # Skeleton components
│   └── shared/       # Toasts, errors, transitions
├── styles/           # Design tokens (variables.css), globals, animations
├── hooks/            # useFilters, useProducts, useAuth, useTheme
├── context/          # Auth, theme, and catalog providers
├── services/         # DummyJSON API layer
├── utils/            # Filters, validation, auth storage
└── constants/        # API config, motion presets, tokens
```

## Assumptions

- **Authentication** is simulated client-side. Sessions and registered users are stored in `localStorage`. There is no real backend or JWT flow.
- **Product data** comes entirely from [DummyJSON](https://dummyjson.com). No products, categories, or brands are hardcoded.
- **Wishlist, cart, and orders** are UI placeholders for demonstration. Counts and items are not persisted to a server.
- **User profile** data is local to the browser and resets if storage is cleared.
- **Reviews** on the product detail page are illustrative, derived from the API rating — not fetched from a separate reviews endpoint.
- **Search** filters the current catalog client-side when a query param is present, after products are loaded from the API.

## Architectural decisions

**React Context** keeps auth, theme, and catalog state available without prop drilling. The surface area is small enough that Redux would add ceremony without real benefit.

**Custom hooks** (`useFilters`, `useProducts`, `useAuth`, `useTheme`) isolate side effects and make page components mostly declarative. Filter logic and API fetching stay testable and reusable.

**URL-based filter persistence** was chosen so users can bookmark, share, and use the back button naturally. Filters sync to query params (`category`, `brands`, `minPrice`, `maxPrice`, `page`, `q`) rather than living only in component state.

**Feature-based folders** group UI by domain (product, filters, auth) instead of by file type alone. Pages stay thin; components stay focused.

**Framer Motion** handles route transitions, card hover, drawer animations, and form feedback. CSS alone would work for static states, but motion adds the polish expected in a modern storefront.

**Tailwind CSS** with a centralized design token system in `src/styles/variables.css`. Semantic tokens (`--color-primary`, `--color-surface`, `--color-text-primary`, etc.) power the entire UI via `globals.css` utilities and Tailwind `@theme` mappings. Change a token once and the full application updates.

## API usage

Base URL: `https://dummyjson.com`

| Endpoint               | Usage                          |
|------------------------|--------------------------------|
| `GET /products`        | Listing, pagination, brands    |
| `GET /products/categories` | Category filter options    |
| `GET /products/{id}`   | Product detail page            |

Pagination uses `limit=12` and `skip` based on the current page. Brand and price filters run client-side when active; category and pagination use the API directly when possible.

## Scripts

| Command         | Description              |
|-----------------|--------------------------|
| `npm run dev`   | Start dev server         |
| `npm run build` | Production build         |
| `npm run preview` | Preview production build |
| `npm run lint`  | Run ESLint               |

## License

Private — assessment / portfolio project.
