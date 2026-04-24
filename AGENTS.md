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
- **`elevated`** — filled background with depth shadow (high emphasis with lift)
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
- When extending `ComponentProps<'button'>` (or any HTML element) alongside `AccentProps`, the `color` field conflicts — resolve with `Omit<ComponentProps<'button'>, 'color'>`.
- Do **not** use `PropsWithChildren`. Declare `children` explicitly as `RenderProp<State, ReactNode>` so consumers can use render children.

#### `{Component}.State` type

Every interactive component must export a `State` type under its namespace. Use `StoreState<XStore>` (from `@/common/hooks`) — do **not** redeclare the same fields manually, and do not use `ReturnType` on `get` directly (generic `get` returns `unknown` via `ReturnType`).

**`State` must be declared before `Props` in the namespace**, because `Props` references `State` via `RenderProp`.

```ts
// use-button.ts — single source of truth
export function useButton(...): Store<{}> {
  // returns { get, handlers, set } — the Store<D> shape
}
export type ButtonStore = ReturnType<typeof useButton>;

// button/index.tsx
import { type StoreState } from '@/common/hooks';
import { type ButtonStore } from './use-button';

export namespace Button {
  export type State = StoreState<ButtonStore>; // ✅ declared first, correctly typed
  export interface Props {                     // ✅ can now reference State
    className?: RenderProp<State, string>;
  }
}
```

`StoreState<S>` extracts the state type from `Store<D>` via parameter inference: `Parameters<NonNullable<Parameters<S['get']>[0]>>[0]`. This correctly resolves where `ReturnType` cannot (generic default not resolved by `ReturnType`).

This avoids the `Button.State` type diverging from the actual runtime state shape.

```tsx
// ✅
export namespace Button {
  export type State = StoreState<ButtonStore>;

  export interface Props
    extends
      Omit<ComponentProps<'button'>, 'color' | 'className' | 'style' | 'children'>,
      Omit<VariantProps<typeof button>, 'size'>,
      SlotProps<State>, // children?: RenderProp<State, ReactNode> comes from here
      AccentProps {
    size?: ComponentSize;
    icon?: boolean;
    className?: RenderProp<State, string>;
    style?: RenderProp<State, CSSProperties>;
  }
}

// ❌
export namespace Button {
  export type Props = ComponentProps<'button'> & AccentProps & { size?: ComponentSize };
}
```

#### State-driven Props (`RenderProp`)

`className`, `style`, `children` accept either a static value **or a function that receives the component's runtime state**. This allows consumers to customize appearance and content based on interaction state without needing external state management.

```ts
// src/common/utils/render.ts
export type RenderProp<S, T> = T | ((state: S) => T);
export function resolveRenderProp<S, T>(value: RenderProp<S, T>, state: S): T;
```

Usage rules:

- Always `Omit<ComponentProps<'el'>, 'className' | 'style' | 'children'>` before redeclaring these with `RenderProp`.
- Resolve all three with `resolveRenderProp(value, state)` inside the component before use.
- Applies to all interactive components that have a `use[Component]` hook.

```tsx
// ✅ state-based className
<Button className={(state) => cn('base', state.hovered && 'ring-2')}>
  확인
</Button>

// ✅ state-based children (render children)
<Toggle>
  {(state) => state.toggled ? '켜짐' : '꺼짐'}
</Toggle>

// ✅ works with asChild — children function resolves first, then Slot merges props
<Button asChild>
  {(state) => <a className={state.focused ? 'focused' : ''}>링크</a>}
</Button>
```

### Hook-based Compound Components with Metadata

For components where items carry metadata (label, disabled, etc.), pass item definitions as an array to the hook instead of using a generic type parameter alone. The hook infers the value union from the array and makes metadata available via context.

```tsx
// ✅ values + metadata 함께 전달 — value 유니온 자동 추론
const tabs = useTabs([
  { value: 'info', label: '정보' },
  { value: 'review', label: '리뷰', disabled: true },
] as const);

<tabs.Root>
  <tabs.List /> {/* label을 context에서 자동으로 렌더 */}
  <tabs.Panel value="info">...</tabs.Panel>
  <tabs.Panel value="review">...</tabs.Panel> {/* ❌ 'xyz' → 컴파일 오류 */}
</tabs.Root>;
```

The `as const` ensures the value union (`'info' | 'review'`) is inferred at the call site, making incorrect `value` props a compile error. Metadata (label, disabled) is passed to internal components via context — sub-components do not receive it as direct props.

---

### Generic Compound Components (다중 선택 패턴)

`CheckboxGroup`, `RadioGroup`, `Select` 등 **값(value)만 식별자로 가지는** 다중 선택 컴포넌트는 render-prop children을 사용한다. children을 함수로 선언하면 제네릭 `T`로 좁혀진 서브컴포넌트를 인자로 받을 수 있어, 잘못된 `value` 전달이 컴파일 오류가 된다.

```tsx
// ✅ render-prop children — value: T 외 전달 시 컴파일 오류
<CheckboxGroup<Fruit> value={selected} onChange={setSelected}>
  {({ Item, All }) => (
    <>
      <Item value="apple">사과</Item>    {/* value: Fruit ✅ */}
      <Item value="xyz">X</Item>          {/* ❌ 'xyz' is not assignable to Fruit */}
      <All>전체 선택</All>
    </>
  )}
</CheckboxGroup>

// ✅ 정적 children — 네임스페이스 서브컴포넌트 직접 사용 (타입 안전성 없음)
<CheckboxGroup value={selected} onChange={setSelected}>
  <CheckboxGroup.Item value="apple">사과</CheckboxGroup.Item>
</CheckboxGroup>
```

children이 함수인 경우 `T`로 좁혀진 서브컴포넌트 객체(`{ Item, All }` 등)를 인자로 받는다. 정적 children은 `CheckboxGroup.Item` 등 네임스페이스 서브컴포넌트를 직접 사용하며 제네릭 제약이 없다.

---

### Compound Components

- Compound components expose sub-components via namespace, **not** via a `.Root` wrapper.
- The component name itself is the root.

```tsx
// ✅
<TextField>
  <TextField.Input />
</TextField>

// ❌
<TextField.Root>
  <TextField.Input />
</TextField.Root>
```

- Sub-components that need parent props receive them through an internal Context, not directly.
- **Always provide sub-components as the default value of `children`** so that basic usage requires no explicit sub-component declaration. Explicit children enable customization; the default keeps the simple case simple.

#### Sub-component implementation pattern

Sub-components are implemented in their own files (`{component}.{sub}.tsx`) and wired into the parent namespace via `const` assignment + a nested `namespace` block that re-exports the `Props` type. This keeps `Namespace.Sub.Props` accessible while splitting the implementation across files.

```tsx
// ✅ checkbox.indicator.tsx — 서브 컴포넌트 구현 파일
export function CheckboxIndicator({ asChild = false, children }: CheckboxIndicator.Props) {
  const { state } = useCheckboxContext();
  // ...
}

export namespace CheckboxIndicator {
  export type Props = SlotProps;
}

// ✅ checkbox.tsx — 메인 컴포넌트 파일에서 namespace로 연결
import { CheckboxIndicator } from './checkbox.indicator';

export namespace Checkbox {
  export type State = ReturnType<typeof useCheckbox>['state'];

  export const Indicator = CheckboxIndicator;       // 컴포넌트 할당
  export namespace Indicator {
    export type Props = CheckboxIndicator.Props;    // Props re-export → Checkbox.Indicator.Props 유지
  }

  export interface Props { ... }
}

// ❌ namespace re-export 없이 단순 할당 — Props 접근 불가
export namespace Checkbox {
  export const Indicator = CheckboxIndicator; // Checkbox.Indicator.Props 접근 불가
}
```

The nested `export namespace Indicator { export type Props = ... }` re-exports the type so `Checkbox.Indicator.Props` remains discoverable in the IDE — identical to the root `Checkbox.Props` pattern.

```tsx
// Default children — basic usage requires no sub-component declaration
export function Checkbox({ children = <Checkbox.Indicator />, ...props }: Props) { ... }
export function Radio({ children = <Radio.Indicator />, ...props }: Props) { ... }
export function Switch({ children = <Switch.Thumb />, ...props }: Props) { ... }
export function TextField({ children = <TextField.Input />, ...inputProps }: Props) { ... }

// Basic usage — sub-components rendered automatically
<Checkbox defaultChecked />
<Radio defaultChecked />
<Switch defaultChecked />

// Explicit usage — custom sub-component
<Checkbox defaultChecked>
  <Checkbox.Indicator asChild>
    <MyStarIcon />
  </Checkbox.Indicator>
</Checkbox>
```

### `asChild` Pattern

- **All UI components must support `asChild`** — this is a mandatory requirement. Exceptions: `TextField` and `TextArea` (compound components with `.Input` pivot structure incompatible with Slot).
- Use `Slot` to swap the rendered element when `asChild=true`.

```tsx
import { Slot, type SlotProps } from '@/common/components/utils';

const Comp = asChild ? Slot : 'button';
return <Comp {...props}>{children}</Comp>;
```

- Always include `SlotProps<S>` in the component's `Props` interface — `S` is the state type for interactive components, omitted (`SlotProps`) for non-interactive ones.

#### When to split into sub-components

For components that render a single element (Button, Badge, Spinner), `asChild` on the root unambiguously replaces that element.

When a component renders **multiple visually or semantically distinct areas**, putting `asChild` only on the root makes the replacement surface ambiguous. For example, Checkbox renders a `<span>` (wrapper) + `<input>` (hidden form element) + check icon (indicator). Replacing the root via `asChild` would merge the internal `<input>` and indicator into the user's element as children — the structure becomes unclear.

In these cases, **expose each distinct area as a sub-component** with its own `asChild` surface.

```tsx
// ❌ Ambiguous: input and indicator become children of div
<Checkbox asChild defaultChecked>
  <div className="custom-box" />
</Checkbox>

// ✅ Clear: each area is independently replaceable
<Checkbox defaultChecked>
  <Checkbox.Indicator />           {/* default check icon */}
</Checkbox>

<Checkbox defaultChecked>
  <Checkbox.Indicator asChild>
    <MyStarIcon />                 {/* replace only the indicator */}
  </Checkbox.Indicator>
</Checkbox>
```

Components requiring this treatment and their planned sub-components:

| Component               | Root                         | Sub-components                                                                                                                                 |
| ----------------------- | ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `Checkbox`              | wrapper + hidden `<input>`   | `Checkbox.Indicator` (check / indeterminate icon)                                                                                              |
| (planned) `Radio`       | wrapper + hidden `<input>`   | `Radio.Indicator` (selection dot)                                                                                                              |
| (planned) `Switch`      | track wrapper                | `Switch.Thumb`                                                                                                                                 |
| (planned) `Slider`      | track wrapper                | `Slider.Track`, `Slider.Thumb`                                                                                                                 |
| (planned) `Progress`    | track wrapper                | `Progress.Indicator` (filled bar)                                                                                                              |
| (planned) `NumberField` | input + spinner buttons      | `NumberField.Increment`, `NumberField.Decrement`                                                                                               |
| (planned) `TelField`    | input + country selector     | `TelField.CountrySelect` (flag + country code button)                                                                                          |
| (planned) `Tag`         | label + remove button        | `Tag.CloseButton`                                                                                                                              |
| (planned) `ScrollArea`  | scroll container + scrollbar | `ScrollArea.Scrollbar`                                                                                                                         |
| (planned) `Calendar`    | header + day grid            | `Calendar.Header`, `Calendar.PrevButton`, `Calendar.NextButton`, `Calendar.Grid`, `Calendar.Day`                                               |
| (planned) `DatePicker`  | trigger + floating panel     | `DatePicker.Trigger`, `DatePicker.Calendar`                                                                                                    |
| (planned) `TimePicker`  | trigger + floating panel     | `TimePicker.Trigger`, `TimePicker.Column`                                                                                                      |
| (planned) `ColorPicker` | trigger + floating panel     | `ColorPicker.Trigger`, `ColorPicker.Saturation`, `ColorPicker.HueSlider`, `ColorPicker.AlphaSlider`, `ColorPicker.Input`, `ColorPicker.Swatch` |

> **Current status**: `Checkbox` is implemented with `Checkbox.Indicator` sub-component (namespace merging, `Checkbox.Indicator.Props` accessible). All entries marked "planned" have not yet been implemented.

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

Do **not** call `useInteraction` directly inside a component. Always wrap it in a component-specific hook (`use-button.ts`, `use-toggle.ts`, etc.) that returns a `Store<D>` — `{ get, handlers, set }`. See `use-button.ts` and `use-toggle.ts` as reference implementations.

```ts
// use-button.ts
export function useButton({ disabled = false }: UseButtonOptions = {}): Store<{}> {
  const [disabledState, setDisabled] = useState(disabled);
  const { state: interaction, handlers } = useInteraction<HTMLButtonElement>({
    disabled: disabledState,
  });
  const state = { ...interaction, disabled: disabledState };

  return {
    handlers,
    get<T = typeof state>(selector?: (s: typeof state) => T): T {
      return (selector ? selector(state) : state) as T;
    },
    set(partialOrFn) {
      const p = isFunction(partialOrFn) ? partialOrFn(state) : partialOrFn;
      if (p.disabled != null) setDisabled(p.disabled);
    },
  };
}
export type ButtonStore = ReturnType<typeof useButton>;
```

`store.get()` supports an optional **selector** for deriving values without exposing raw state:

```ts
store.get(); // full state snapshot
store.get((s) => s.disabled); // single field
store.get((s) => s.value.length > 0); // derived — "filled" state
store.get((s) => s.hovered || s.focused); // compound condition
```

To add a custom state, extend `state` before returning.

```ts
// use-toggle.ts — adding a 'toggled' state
const state = { ...interaction, disabled: disabledState, toggled };
return {
  handlers,
  get<T = typeof state>(selector?: (s: typeof state) => T): T {
    return (selector ? selector(state) : state) as T;
  },
  set(partialOrFn) { ... },
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

Each component lives in a **folder named after the component** (kebab-case). The folder is split into the following files:

| File                    | Purpose                                                                        | Required                 |
| ----------------------- | ------------------------------------------------------------------------------ | ------------------------ |
| `index.tsx`             | Barrel — `export * from './{component}'` only                                  | Always                   |
| `{component}.tsx`       | Main component function + `export namespace` (const assignments, State, Props) | Always                   |
| `styles.ts`             | `tv()` variant definitions and any size/icon constant maps                     | Always                   |
| `use-{component}.ts`    | Component hook returning `state`, `handlers`, `dataProps`                      | Always                   |
| `context.ts`            | `createContext` + provider value type + `use{Component}Context` hook           | Compound components only |
| `{component}.{sub}.tsx` | Sub-component implementation + its own `namespace {Sub} { Props }`             | Per sub-component        |
| `index.stories.tsx`     | Storybook stories                                                              | Always                   |

```text
button/
  index.tsx               # export * from './button'
  button.tsx              # Button function + Button namespace
  styles.ts               # button = tv({...})
  use-button.ts           # useButton hook
  index.stories.tsx

checkbox/
  index.tsx               # export * from './checkbox'
  checkbox.tsx            # Checkbox function + Checkbox namespace (const Indicator = CheckboxIndicator)
  styles.ts               # checkboxBox = tv({...}), CHECKBOX_ICON_SIZE
  context.ts              # CheckboxContext, useCheckboxContext
  checkbox.indicator.tsx  # CheckboxIndicator function + CheckboxIndicator.Props namespace
  use-checkbox.ts         # useCheckbox hook
  index.stories.tsx
```

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
