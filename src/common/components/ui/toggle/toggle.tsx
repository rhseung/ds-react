import { type CSSProperties, type ComponentProps, type MouseEvent } from 'react';

import { type VariantProps } from 'tailwind-variants';

import { Slot, type SlotProps, StateMask } from '@/common/components/utils';
import {
  SizeContext,
  type StoreState,
  useComponentBehavior,
  useComponentSize,
  type ComponentSize,
} from '@/common/hooks';
import {
  type AccentProps,
  type RenderProp,
  type StoreOrControlled,
  colorVars,
  mergeObjects,
  resolveRenderProp,
} from '@/common/utils';

import { toggle } from './styles';
import { useToggle, type ToggleStore } from './use-toggle';

export function Toggle({
  asChild,
  variant = 'solid',
  tone = 'default',
  size: localSize,
  icon,
  color,
  className,
  style,
  children,
  store,
  disabled,
  pressed,
  defaultPressed,
  onPressedChange,
  onClick,
  onPointerEnter,
  onPointerLeave,
  onPointerDown,
  onPointerUp,
  onPointerCancel,
  onFocus,
  onBlur,
  onKeyDown,
  onKeyUp,
  ...props
}: Toggle.Props) {
  const size = useComponentSize(localSize);
  const internalStore = useToggle({ disabled, pressed, defaultPressed, onPressedChange });
  const {
    state,
    store: activeStore,
    handlers,
    dataProps,
  } = useComponentBehavior(internalStore, store, {
    onPointerEnter,
    onPointerLeave,
    onPointerDown,
    onPointerUp,
    onPointerCancel,
    onFocus,
    onBlur,
    onKeyDown,
    onKeyUp,
  });

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    activeStore.set((prev) => ({ toggled: !prev.toggled }));
    onClick?.(e);
  };

  const Comp = asChild ? Slot : 'button';

  return (
    <SizeContext.Provider value={size}>
      <Comp
        type="button"
        aria-pressed={state.toggled}
        disabled={state.disabled}
        className={toggle({
          variant,
          tone,
          size,
          icon,
          className: resolveRenderProp(className, state),
        })}
        style={mergeObjects(colorVars(color), resolveRenderProp(style, state))}
        {...props}
        {...dataProps}
        {...handlers}
        onClick={handleClick}
      >
        {resolveRenderProp(children, state)}
        <StateMask />
      </Comp>
    </SizeContext.Provider>
  );
}

export namespace Toggle {
  export type State = StoreState<ToggleStore>;
  export type Store = ToggleStore;

  export type Props = StoreOrControlled<
    Store,
    {
      pressed?: boolean;
      defaultPressed?: boolean;
      onPressedChange?: (pressed: boolean) => void;
      disabled?: boolean;
    },
    Omit<ComponentProps<'button'>, 'color' | 'className' | 'style' | 'children' | 'disabled'> &
      Omit<VariantProps<typeof toggle>, 'size'> &
      SlotProps<State> &
      AccentProps & {
        size?: ComponentSize;
        icon?: boolean;
        className?: RenderProp<State, string>;
        style?: RenderProp<State, CSSProperties>;
      }
  >;
}
