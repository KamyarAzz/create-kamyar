# __APP_TITLE__

React 19 + Vite + TypeScript, Tailwind v4, React Router, Zustand, lucide-react
icons.

## Commands

- `npm run dev` – dev server on http://localhost:5173
- `npm run build` – type-check and build
- `npm run lint` – ESLint
- `npm run format` – format `src/` with Prettier (`format:check` to only check)

Before calling a change done, run `format`, `build` and `lint`, then go through
the component checklist below.

Git hooks (Husky): pre-commit runs lint-staged (ESLint + Prettier on staged
files), pre-push builds the app. Don't skip them with `--no-verify`.

## Components

- One component per file, one job per component. Split layout pieces (navbar,
  header, footer) into their own components instead of one big layout file.
- Pages only put sections together. Each section (card, list, table, bar,
  form) is its own component in the feature's `components/` folder.

### Size and repetition (hard rules)

- A page file stays under ~80 lines and any other component under ~100 lines.
  Over that, split it before finishing.
- Never repeat markup. When the same element appears twice with the same
  classes (table header cells, table cells, list items, tiles, buttons), make
  it a component and pass what differs as props.
- Inside `.map()`, render one component per item
  (`<ResultRow key={r.id} result={r} />`), not more than a few lines of
  inline JSX.
- Work out derived values (scores, labels, colour classes) in the component
  that shows them, or in `src/lib/`, not in a parent page.
- Generic building blocks (table cells, section cards, headings) go in
  `src/components/` so every feature can use them.

### Checklist for every new or changed component

1. Is the file over the line limit? Split it.
2. Is any markup repeated? Turn it into a component with props.
3. Is there a block you could give a name? Make it its own component.
4. Could another feature use it? Put it in `src/components/`.

- Components use a default export, named after the file:
  `export default function Navbar() {}` in `Navbar.tsx`.
- Keep static config and lists out of components. Put them in `src/data/`
  (e.g. `navItems.ts`) and import them.
- Reusable components get their content through typed props, never hard-coded
  text or data.
- Define a component's props as an `interface` named `<Component>Props` above
  the component.

## Code style

- Prettier owns formatting (`.prettierrc`): double quotes, semicolons, no
  spaces inside braces (`import {NavLink} from "react-router";`), 80 characters
  per line, Tailwind classes sorted. Run `npm run format` after editing instead
  of formatting by hand.
- Use `import type` for type-only imports.
- Short comments only where the code isn't obvious.

## Styling

- Tailwind classes with the theme tokens from `src/styles/index.css`
  (`bg-brand`, `text-muted`, `border-line`, …). No hard-coded hex colours in
  components; add a token to `@theme` when you need a new colour.
- Use the canonical Tailwind class whenever one exists. Spacing and sizes are
  4px per step, so divide pixels by 4: `w-[18px]` → `w-4.5`,
  `min-h-[52px]` → `min-h-13`. Use `[…]` only when no class fits (e.g.
  `text-[15px]`, `rounded-[10px]`).
- Mobile first: base classes for phones, `md:` for desktop.
- Accessible by default: real `<button>` / `<a>` / `<label>`, `aria-label` on
  icon-only buttons, `aria-hidden` on decorative icons, touch targets at least
  44px (`min-h-11`).

## Structure (`src/`)

The project starts with a small example in each folder (the `home` feature,
`Button`, `greeting`, `counterStore`, `pluralize`, the `counter`/`home`/`ui`
types) to show where things go. Rename or replace them as the app grows.

- `app/` – router and app layout
- `features/<feature>/` – one section of the app:
  - `pages/` – components a route renders (the destination in `AppRouter`),
    named `<Name>Page.tsx`
  - `components/` – components used only by this feature
  - `hooks/` – state and logic for this feature's pages, so pages stay small
  - Create a folder only when it has a file in it.
- `components/` – shared UI
- `data/` – static data, config and sample data
- `stores/` – Zustand stores
- `lib/` – helper functions
- `types/` – one file per feature or area (`users.ts`, `ui.ts`), all re-exported
  from `types/index.ts`. Always import from `types`, never from a single file
  inside it.
