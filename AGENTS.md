# IDS for React

## Design System Principles

This project implements IDS for React. Refer to [PRINCIPLE.md](PRINCIPLE.md) for the full design principles.

## Environment & Tooling

- Use Bun for installs, scripts, and lockfile updates.
- Run lint/format tasks with Bun (`bun run lint`, `bun run check`).
- Routing is file-based via TanStack Start — run `bun run build` to regenerate route files after adding/removing route files.

## Project Structure

### MVVM & Feature-Based Architecture

This project follows MVVM (Model-View-ViewModel) pattern and feature-based file structure:

- **Features**: `src/features/` — Feature modules organized by domain
  - Each feature contains: `models/`, `viewmodels/`, `views/`, `index.ts`
- **Common**: `src/common/` — Shared code across features
  - `components/` — Reusable UI components
  - `lib/` — Library configurations (api, dayjs, i18n)
  - `utils/` — Utility functions
  - `const/` — Shared constants

### Layer Access Rules

Enforced by `eslint-plugin-boundaries`:

- **View → ViewModel → Model**: Views must access Models only through ViewModels.
  - Views cannot directly access Models.
  - ViewModels cannot reference Views (UI components).
  - Models are the bottom layer and cannot reference ViewModels or Views.

### API Schema Types

- **Do NOT** import types directly from `@/@types/api-schema` outside of model files.
- **DO** import types from each feature's `models/index.ts`.
- Exception: `src/features/*/models/**/*.ts` and `src/common/lib/api.ts` may import directly.

### Cross-Layer Imports

- Use `index.ts` for cross-layer imports. Do not import internal files directly.
  - Example: Import from `@/features/auth` instead of `@/features/auth/viewmodels/use-login`.

## Naming Conventions

Enforced by `eslint-plugin-check-file`:

- All files and folders under `src/` must use **kebab-case**.
  - Examples: `use-auth-prompt.ts`, `notice-card.tsx`, `api-client/`
- Exception: `src/routes/` is exempt — TanStack Router requires its own file naming convention (e.g. `$postId.tsx`, `_layout.tsx`).

## Import Conventions

Enforced by `eslint-plugin-import-x`:

- Import order (each group separated by a blank line):
  1. `builtin`
  2. `external` — `react` and `@tanstack/**` go first within this group
  3. `internal` — path aliases (`@/**`)
  4. `parent` / `sibling` / `index`
  5. `type`
- Use inline type imports: `import { type Foo } from '...'` (not `import type { Foo }`).
- No duplicate imports.
- No unused imports (error).

## Variant Naming Conventions

Do **not** use order-based names like `primary` / `secondary` for component variants. Use visual/structural descriptors instead:

- **`solid`** — filled background (highest emphasis)
- **`soft`** — tinted/muted background (medium emphasis)
- **`outline`** — border only, transparent background (low emphasis)
- **`ghost`** — no border, no background (lowest emphasis)

This applies to all components (Button, Badge, etc.).

## Components Structure

### `src/common/components/`

Split into **`ui/`** (primitives) and other directories (composites/layouts):

#### `ui/` — Primitive components

- No feature/domain imports: do not import from `@/features/*`.
- Do not use `useTranslation`, auth hooks, or feature viewmodels.
- Single-purpose building blocks mapping to one element or a small generic pattern.

#### Other directories — Composite components

- **`layout/`**: Layout-level wrappers (e.g. page shells, navigation frames).

Do **not** put components that use `@/features/*`, `useTranslation`, or feature viewmodels under `ui/`.

### Component Type Conventions

- Use namespace merging for component-related types such as props and state.
- Props must be declared as `interface`, not `type` intersection.
- Use `PropsWithChildren` instead of declaring `children?: ReactNode` directly.
- When extending `ComponentProps<'button'>` (or any HTML element) alongside `AccentProps`, the `color` field conflicts — resolve with `Omit<ComponentProps<'button'>, 'color'>`.

#### `{Component}.State` type

Every interactive component must export a `State` type under its namespace. Derive it from the hook's return type — do **not** redeclare the same fields manually.

```ts
// use-button.ts — single source of truth
export function useButton(...) {
  return { state, handlers, dataProps };
}

// button/index.tsx
export namespace Button {
  export interface Props { ... }
  export type State = ReturnType<typeof useButton>['state']; // ✅ derived, never duplicated
}
```

This avoids the `Button.State` type diverging from the actual runtime state shape.

```tsx
// ✅
export namespace Button {
  export interface Props
    extends
      Omit<ComponentProps<'button'>, 'color'>,
      Omit<VariantProps<typeof button>, 'size'>,
      SlotProps,
      AccentProps {
    size?: ComponentSize;
    icon?: boolean;
  }
}

// ❌
export namespace Button {
  export type Props = ComponentProps<'button'> & AccentProps & { size?: ComponentSize };
}
```

### Hook-based Compound Components with Metadata

For components where items carry metadata (label, disabled, etc.), pass item definitions as an array to the hook instead of using a generic type parameter alone. The hook infers the value union from the array and makes metadata available via context.

```tsx
// ✅ values + metadata 함께 전달 — value 유니온 자동 추론
const tabs = useTabs([
  { value: 'info',    label: '정보' },
  { value: 'review',  label: '리뷰', disabled: true },
] as const);

<tabs.Root>
  <tabs.List />          {/* label을 context에서 자동으로 렌더 */}
  <tabs.Panel value="info">...</tabs.Panel>
  <tabs.Panel value="review">...</tabs.Panel>  {/* ❌ 'xyz' → 컴파일 오류 */}
</tabs.Root>
```

The `as const` ensures the value union (`'info' | 'review'`) is inferred at the call site, making incorrect `value` props a compile error. Metadata (label, disabled) is passed to internal components via context — sub-components do not receive it as direct props.

---

### Compound Components

- Compound components expose sub-components via namespace, **not** via a `.Root` wrapper.
- The component name itself is the root.

```tsx
// ✅
<TextField>
  <TextField.Inner />
</TextField>

// ❌
<TextField.Root>
  <TextField.Inner />
</TextField.Root>
```

- Sub-components that need parent props receive them through an internal Context, not directly.
- If a sub-component (e.g. `Inner`) must always be present, provide it as the default value of `children`.

```tsx
export function TextField({ children = <TextField.Inner />, ...inputProps }: Props) {
  return (
    <InnerContext.Provider value={inputProps}>
      <div>{children}</div>
    </InnerContext.Provider>
  );
}
```

### `asChild` Pattern

- To allow the rendered element to be swapped by the consumer, support an `asChild` prop using `Slot`.

```tsx
import { Slot, type SlotProps } from '@/common/components/utils';

const Comp = asChild ? Slot : 'button';
return <Comp {...props}>{children}</Comp>;
```

- Include `SlotProps` in the component's `Props` interface.

### Size System

- All UI components support a `size?: ComponentSize` prop (`'sm' | 'md' | 'lg'`).
- Call `useComponentSize(localSize)` to resolve the effective size: explicit prop wins over inherited context.
- **All** UI components with a `size` prop **must** wrap their output with `<SizeContext.Provider value={size}>`, even leaf components like Spinner or Avatar. This is required because `asChild` may cause any component to render children.
- Button height scale (reference for all components): `sm` = h-8, `md` = h-9, `lg` = h-10.

```tsx
import { SizeContext, useComponentSize, type ComponentSize } from '@/common/hooks';

function MyComponent({ size: localSize, children }: Props) {
  const size = useComponentSize(localSize);
  return (
    <SizeContext.Provider value={size}>
      <div className={myVariants({ size })}>{children}</div>
    </SizeContext.Provider>
  );
}
```

### Interaction State & State Mask

#### Data attribute-based state

Never use CSS/Tailwind pseudo-classes (`:hover`, `:active`, `:focus`, `:focus-visible`) for interactive state styling. Instead, use `data-*` attributes generated at runtime by `useInteraction`.

Reasons:

- CSS pseudo-classes have known browser/environment bugs.
- Custom states beyond the standard four — such as `data-toggled` — can be introduced with the same mechanism, with no extra cost.

#### `use[Component]` hook pattern

Do **not** call `useInteraction` directly inside a component. Always wrap it in a component-specific hook (`use-button.ts`, `use-toggle.ts`, etc.) that returns `state`, `handlers`, and `dataProps` together. See `use-button.ts` and `use-toggle.ts` as reference implementations.

```ts
// use-button.ts
export function useButton({ disabled, onClick, ...eventHandlers }: UseButtonOptions = {}) {
  const { state, handlers } = useInteraction({ disabled, ...eventHandlers });
  return {
    state,
    handlers: { ...handlers, onClick },
    dataProps: interactionDataProps(state), // e.g. { 'data-hovered': true, ... }
  };
}
```

To add a custom state, extend `state` before passing it to `interactionDataProps`.

```ts
// use-toggle.ts — adding a 'toggled' state
const newState = { ...state, toggled };
return {
  state: newState,
  handlers: { ...handlers, onClick: handleClick },
  dataProps: interactionDataProps(newState), // 'data-toggled' is generated automatically
};
```

#### Using in components

Spread `dataProps` and `handlers` onto the element, then style each state with Tailwind's `data-[state]:` variant.

```tsx
const { handlers, dataProps } = useToggle({ disabled, pressed, onPressedChange, ... });

<button
  className="relative ... data-active:scale-[0.98] data-toggled:bg-accent data-disabled:opacity-50"
  {...dataProps}
  {...handlers}
>
  {children}
  <StateMask />
</button>
```

`<StateMask />` renders a `currentColor` semi-transparent overlay that conveys hover/active feedback without dedicated hover color tokens. The parent must have `position: relative`.

### CSS Token System

IDS uses a three-layer token architecture. Always reference tokens at the highest layer available.

```text
Primitives (palette.css)  →  Semantic tokens (semantic.css, base.css)  →  Tailwind utilities (tailwind.css)
--ids-gray-200                --ids-neutral-border                          border-neutral-border
```

**Never reference primitive tokens directly in component code.** Use semantic tokens or Tailwind utilities only.

#### Token layers

| Layer     | File                                     | Example                                       | Purpose                                |
| --------- | ---------------------------------------- | --------------------------------------------- | -------------------------------------- |
| Primitive | `palette.css`                            | `--ids-gray-200`                              | Raw values — do not use in components  |
| Semantic  | `semantic.css`, `base.css`, `motion.css` | `--ids-neutral-border`, `--ids-duration-fast` | Role-based tokens for components       |
| Tailwind  | `tailwind.css`                           | `border-neutral-border`, `duration-fast`      | Mapped to Tailwind via `@theme inline` |

#### Motion tokens

Use Tailwind motion utilities backed by `--ids-*` tokens. Do not hard-code durations or easings.

```tsx
// ✅
className="transition-transform duration-fast ease-press"

// ❌
className="transition-transform duration-100"
style={{ transitionTimingFunction: 'cubic-bezier(0.2, 0, 0, 1)' }}
```

Available duration utilities: `duration-fast` (100ms), `duration-normal` (200ms), `duration-slow` (300ms), `duration-slower` (500ms).
Available easing utilities: `ease-standard`, `ease-decelerate`, `ease-accelerate`, `ease-press`.

#### Dark mode

Theme is toggled via `data-theme="light" | "dark"` on the root element — **not** via Tailwind's `dark:` media-query variant. All semantic tokens are defined under `[data-theme='dark']` selectors in `semantic.css`.

#### Adding new tokens

New design tokens belong in `src/styles/` CSS files, not inline in components. After defining a `--ids-*` variable, map it to a Tailwind utility in `tailwind.css` via `@theme inline`.

### Color System

- All interactive components extend `AccentProps` (`color?: Color`, `tone?: Tone`).
- `color`: `'primary' | 'secondary' | 'tertiary'` — brand color selection.
- `tone`: `'default' | 'weak' | 'contrast'` — emphasis level.
- When `color` is provided, inject CSS variables with `colorVars(color)`.
- In Tailwind classes, always use semantic accent tokens (`bg-accent`, `text-on-accent`, `inset-ring-accent`, etc.), never hard-coded color values like `bg-blue-500`.

### Icon System

- All icon components must be created with `createIcon`. Always wrap library icons (e.g. lucide-react) — never use them directly.
- Never define `ICON_SIZE` objects inside components. Icon size is resolved automatically via `SizeContext`.
- Icon files live in `src/common/components/ui/icon/icons/<name>.tsx`.
- Variant names follow the visual descriptor convention: `outline` (default), `filled`, `duo`. Using an undefined variant is a compile error.

```tsx
// ✅
export const SearchIcon = createIcon({
  outline: (props) => <Search {...props} />,
  filled:  (props) => <SearchFilled {...props} />,
});

<SearchIcon />
<SearchIcon variant="filled" />

// ❌
const ICON_SIZE = { sm: 16, md: 20, lg: 24 };
<SearchIcon size={ICON_SIZE[size]} />
```

### Component Folder & Storybook

- Each component lives in a **folder named after the component** (kebab-case).
- **Implementation**: `index.tsx` inside that folder.
- **Storybook**: `index.stories.tsx` in the same folder.
- Component-specific hooks go in the same folder (`use-<component>.ts`).
- Story `title` uses a domain prefix for sidebar grouping:
  - `UI/` — `src/common/components/ui/` (e.g. `UI/Button`)
  - `<Feature>/` — `src/features/<feature>/views/components/` (e.g. `Notice/NoticeCard`)
- Omit Storybook for components that depend on auth context.

### Storybook Story Structure

Follow this ordering for each component's stories:

| Story                | Purpose                                                                      |
| -------------------- | ---------------------------------------------------------------------------- |
| `Default`            | Single interactive component — all props controllable via the Controls panel |
| `Overview`           | Grid of variant × color × tone combinations                                  |
| `Sizes`              | Side-by-side comparison of sm / md / lg                                      |
| `ContextPropagation` | Verifies `SizeContext` inheritance and explicit prop override                |
| Feature stories      | Real-world usage examples (`WithSlots`, `Controlled`, `Loading`, etc.)       |

- Do not create a separate story for every combination. Anything controllable via Controls belongs in `Default`.
- Any component with a `size` prop must include `Sizes` and `ContextPropagation` stories.

### Storybook Setup

- **Dark / Light mode**: toggled via the toolbar. Applies `data-theme="dark"` / `data-theme="light"` to the root element. Tailwind's `dark:` variant responds to this attribute.
- **i18n locale**: toggled via the toolbar. Switches between `ko` and `en`. dayjs locale syncs automatically via the `languageChanged` event.

## Commits & PRs

- Title format: `<type>: <title>`
- `<title>` uses imperative mood (e.g., add, fix, update).
- `<type>` options:
  - `feat`: New feature or capability.
  - `fix`: Bug or incorrect behavior fix.
  - `docs`: Documentation-only changes.
  - `style`: Code style/format changes with no behavior impact.
  - `refactor`: Code structure improvements without behavior changes.
  - `test`: Adds or updates tests.
  - `chore`: Maintenance tasks that don't affect runtime behavior.
  - `ci`: Changes to CI/CD configuration.

## LLM Guidance

- Responses must be in Korean.
- Follow requested formats (especially commit/PR titles).
- Avoid destructive commands (e.g., `git reset --hard`) unless explicitly requested.
