import {
  type CSSProperties,
  type ComponentProps,
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
} from 'react';

import { IconCheck, IconMinus } from '@tabler/icons-react';

import { Slot, StateMask, type SlotProps } from '@/common/components/utils';
import { SizeContext, useComponentSize, type ComponentSize } from '@/common/hooks';
import {
  type AccentProps,
  type RenderProp,
  colorVars,
  mergeObjects,
  resolveRenderProp,
  tv,
} from '@/common/utils';

import { useCheckbox } from './use-checkbox';

const checkboxBox = tv({
  base: [
    'relative inline-flex shrink-0 cursor-pointer items-center justify-center rounded-sm align-middle',
    'inset-ring inset-ring-neutral-border bg-transparent text-transparent',
    'transition-colors duration-fast',
    'data-checked:inset-ring-accent data-checked:bg-accent data-checked:text-on-accent',
    'data-indeterminate:inset-ring-accent data-indeterminate:bg-accent data-indeterminate:text-on-accent',
    'data-disabled:cursor-not-allowed data-disabled:inset-ring-neutral-border data-disabled:bg-neutral-bg-disabled data-disabled:text-neutral-text-disabled',
  ],
  variants: {
    size: {
      sm: 'size-3.5',
      md: 'size-4',
      lg: 'size-5',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const ICON_SIZE: Record<ComponentSize, number> = {
  sm: 10,
  md: 12,
  lg: 13,
};

// ─── Context ─────────────────────────────────────────────────────────────────

interface CheckboxContextValue {
  state: Checkbox.State;
}

const CheckboxContext = createContext<CheckboxContextValue | null>(null);

function useCheckboxContext() {
  const ctx = useContext(CheckboxContext);
  if (!ctx) throw new Error('[IDS] Checkbox.Indicator must be used inside <Checkbox>');
  return ctx;
}

// ─── Checkbox ─────────────────────────────────────────────────────────────────

export function Checkbox({
  size: localSize,
  color,
  className,
  style,
  disabled,
  checked,
  defaultChecked,
  onChange,
  indeterminate,
  children = <Checkbox.Indicator />,
  ...inputProps
}: Checkbox.Props) {
  const size = useComponentSize(localSize);
  const { state, handlers, handleChange, dataProps } = useCheckbox({
    disabled,
    checked,
    defaultChecked,
    onChange,
    indeterminate,
  });

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (inputRef.current) inputRef.current.indeterminate = indeterminate ?? false;
  }, [indeterminate]);

  return (
    <CheckboxContext.Provider value={{ state }}>
      <SizeContext.Provider value={size}>
        <span
          className={checkboxBox({ size, className: resolveRenderProp(className, state) })}
          style={mergeObjects(
            color ? colorVars(color) : undefined,
            resolveRenderProp(style, state),
          )}
          {...dataProps}
          {...handlers}
        >
          <input
            ref={inputRef}
            type="checkbox"
            className="absolute inset-0 m-0 cursor-[inherit] opacity-0"
            disabled={disabled}
            checked={checked}
            defaultChecked={defaultChecked}
            onChange={handleChange}
            {...inputProps}
          />
          {children}
          <StateMask />
        </span>
      </SizeContext.Provider>
    </CheckboxContext.Provider>
  );
}

// ─── Namespace ────────────────────────────────────────────────────────────────

export namespace Checkbox {
  export type State = ReturnType<typeof useCheckbox>['state'];

  export function Indicator({ asChild = false, children }: Indicator.Props) {
    const { state } = useCheckboxContext();
    const size = useComponentSize();

    const icon = state.indeterminate ? (
      <IconMinus size={ICON_SIZE[size]} strokeWidth={3} aria-hidden />
    ) : state.checked ? (
      <IconCheck size={ICON_SIZE[size]} strokeWidth={3} aria-hidden />
    ) : null;

    if (asChild)
      return (
        <SizeContext.Provider value={size}>
          <Slot>{children}</Slot>
        </SizeContext.Provider>
      );
    return <SizeContext.Provider value={size}>{icon}</SizeContext.Provider>;
  }

  export namespace Indicator {
    export type Props = SlotProps;
  }

  export interface Props
    extends
      Omit<
        ComponentProps<'input'>,
        'color' | 'type' | 'size' | 'onChange' | 'className' | 'style' | 'children'
      >,
      AccentProps {
    size?: ComponentSize;
    checked?: boolean;
    defaultChecked?: boolean;
    onChange?: (checked: boolean) => void;
    indeterminate?: boolean;
    children?: ReactNode;
    className?: RenderProp<State, string>;
    style?: RenderProp<State, CSSProperties>;
  }
}
