import { type CSSProperties, type ComponentProps } from 'react';

import { type VariantProps } from 'tailwind-variants';

import { Slot, type SlotProps } from '@/common/components/utils';
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

import { badge } from './styles';
import { useBadge, type BadgeStore } from './use-badge';

export function Badge({
  variant = 'solid',
  tone = 'default',
  size: sizeProp,
  color,
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
}: Badge.Props) {
  const size = useComponentSize(sizeProp);
  const internalStore = useBadge({ disabled });
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
  const Comp = asChild ? Slot : 'span';

  return (
    <SizeContext.Provider value={size}>
      <Comp
        className={badge({ variant, tone, size, className: resolveRenderProp(className, state) })}
        style={mergeObjects(colorVars(color), resolveRenderProp(style, state))}
        {...props}
        {...dataProps}
        {...handlers}
      >
        {resolveRenderProp(children, state)}
      </Comp>
    </SizeContext.Provider>
  );
}

export namespace Badge {
  export type State = StoreState<BadgeStore>;
  export type Store = BadgeStore;

  export interface Props
    extends
      Omit<ComponentProps<'span'>, 'color' | 'className' | 'style' | 'children'>,
      Omit<VariantProps<typeof badge>, 'size'>,
      SlotProps<State>,
      AccentProps {
    size?: ComponentSize;
    store?: Store;
    disabled?: boolean;
    className?: RenderProp<State, string>;
    style?: RenderProp<State, CSSProperties>;
  }
}
