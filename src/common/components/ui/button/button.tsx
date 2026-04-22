import { type CSSProperties, type ComponentProps } from 'react';

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
  colorVars,
  mergeObjects,
  resolveRenderProp,
} from '@/common/utils';

import { button } from './styles';
import { useButton, type ButtonStore } from './use-button';

export function Button({
  asChild,
  variant = 'solid',
  tone = 'default',
  size: localSize,
  icon,
  color,
  className,
  style,
  children,
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
}: Button.Props) {
  const size = useComponentSize(localSize);
  const internalStore = useButton({ disabled });
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

  const Comp = asChild ? Slot : 'button';

  return (
    <SizeContext.Provider value={size}>
      <Comp
        disabled={state.disabled}
        className={button({
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
      >
        {resolveRenderProp(children, state)}
        <StateMask />
      </Comp>
    </SizeContext.Provider>
  );
}

export namespace Button {
  export type State = StoreState<ButtonStore>;
  export type Store = ButtonStore;
  export interface Props
    extends
      Omit<ComponentProps<'button'>, 'color' | 'className' | 'style' | 'children'>,
      Omit<VariantProps<typeof button>, 'size'>,
      SlotProps<State>,
      AccentProps {
    size?: ComponentSize;
    icon?: boolean;
    store?: Store;
    className?: RenderProp<State, string>;
    style?: RenderProp<State, CSSProperties>;
  }
}
