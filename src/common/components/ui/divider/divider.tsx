import { type CSSProperties, type ComponentProps } from 'react';

import { type VariantProps } from 'tailwind-variants';

import { Slot, type SlotProps } from '@/common/components/utils';
import { type StoreState, useComponentBehavior } from '@/common/hooks';
import { type RenderProp, resolveRenderProp } from '@/common/utils';

import { divider } from './styles';
import { useDivider, type DividerStore } from './use-divider';

export function Divider({
  orientation,
  className,
  style,
  children,
  asChild = false,
  store,
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
}: Divider.Props) {
  const internalStore = useDivider({ disabled });
  const { state, handlers, dataProps } = useComponentBehavior(internalStore, store, {
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
  const Comp = asChild ? Slot : 'div';

  return (
    <Comp
      role="separator"
      aria-orientation={orientation ?? 'horizontal'}
      className={divider({ orientation, className: resolveRenderProp(className, state) })}
      style={resolveRenderProp(style, state)}
      {...props}
      {...dataProps}
      {...handlers}
    >
      {resolveRenderProp(children, state)}
    </Comp>
  );
}

export namespace Divider {
  export type State = StoreState<DividerStore>;
  export type Store = DividerStore;

  export interface Props
    extends
      Omit<ComponentProps<'div'>, 'className' | 'style' | 'children'>,
      VariantProps<typeof divider>,
      SlotProps<State> {
    store?: Store;
    disabled?: boolean;
    className?: RenderProp<State, string>;
    style?: RenderProp<State, CSSProperties>;
  }
}
