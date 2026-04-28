import { type CSSProperties, type ComponentProps, type ReactElement } from 'react';

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

import { iconButton } from './styles';
import { useIconButton, type IconButtonStore } from './use-icon-button';

export function IconButton({
  variant = 'solid',
  tone = 'default',
  size: localSize,
  icon,
  color,
  className,
  style,
  store: externalStore,
  disabled,
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
}: IconButton.Props) {
  const size = useComponentSize(localSize);
  const internalStore = useIconButton({ disabled });
  const { state, handlers, dataProps } = useComponentBehavior(internalStore, externalStore, {
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

  return (
    <SizeContext.Provider value={size}>
      <button
        type="button"
        disabled={state.disabled}
        className={iconButton({
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
      >
        {icon}
        <StateMask />
      </button>
    </SizeContext.Provider>
  );
}

export namespace IconButton {
  export type State = StoreState<IconButtonStore>;
  export type Store = IconButtonStore;
  export type Props = StoreOrControlled<
    Store,
    { disabled?: boolean },
    Omit<ComponentProps<'button'>, 'color' | 'className' | 'style' | 'children' | 'disabled'> &
      Omit<VariantProps<typeof iconButton>, 'size' | 'icon'> &
      AccentProps & {
        size?: ComponentSize;
        icon: ReactElement;
        className?: RenderProp<State, string>;
        style?: RenderProp<State, CSSProperties>;
      }
  >;
}
