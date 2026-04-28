import { type CSSProperties, type ComponentProps, type MouseEvent, type ReactElement } from 'react';

import { type VariantProps } from 'tailwind-variants';

import { StateMask } from '@/common/components/utils';
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

import { iconToggle } from './styles';
import { useIconToggle, type IconToggleStore } from './use-icon-toggle';

export function IconToggle({
  variant = 'solid',
  tone = 'default',
  size: localSize,
  icon,
  color,
  className,
  style,
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
}: IconToggle.Props) {
  const size = useComponentSize(localSize);
  const internalStore = useIconToggle({ disabled, pressed, defaultPressed, onPressedChange });
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

  return (
    <SizeContext.Provider value={size}>
      <button
        type="button"
        aria-pressed={state.toggled}
        disabled={state.disabled}
        className={iconToggle({
          variant,
          tone,
          size,
          icon: true,
          className: resolveRenderProp(className, state),
        })}
        style={mergeObjects(colorVars(color), resolveRenderProp(style, state))}
        {...props}
        {...dataProps}
        {...handlers}
        onClick={handleClick}
      >
        {icon}
        <StateMask />
      </button>
    </SizeContext.Provider>
  );
}

export namespace IconToggle {
  export type State = StoreState<IconToggleStore>;
  export type Store = IconToggleStore;
  export type Props = StoreOrControlled<
    Store,
    {
      pressed?: boolean;
      defaultPressed?: boolean;
      onPressedChange?: (pressed: boolean) => void;
      disabled?: boolean;
    },
    Omit<ComponentProps<'button'>, 'color' | 'className' | 'style' | 'children' | 'disabled'> &
      Omit<VariantProps<typeof iconToggle>, 'size' | 'icon'> &
      AccentProps & {
        size?: ComponentSize;
        icon: ReactElement;
        className?: RenderProp<State, string>;
        style?: RenderProp<State, CSSProperties>;
      }
  >;
}
