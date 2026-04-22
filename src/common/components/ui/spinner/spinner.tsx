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
import { type RenderProp, resolveRenderProp } from '@/common/utils';

import { spinner } from './styles';
import { useSpinner, type SpinnerStore } from './use-spinner';

export function Spinner({
  size: sizeProp,
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
}: Spinner.Props) {
  const size = useComponentSize(sizeProp);
  const internalStore = useSpinner({ disabled });
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
        role="status"
        aria-label="로딩 중"
        className={spinner({ size, className: resolveRenderProp(className, state) })}
        style={resolveRenderProp(style, state)}
        {...props}
        {...dataProps}
        {...handlers}
      >
        {resolveRenderProp(children, state)}
      </Comp>
    </SizeContext.Provider>
  );
}

export namespace Spinner {
  export type State = StoreState<SpinnerStore>;
  export type Store = SpinnerStore;

  export interface Props
    extends
      Omit<ComponentProps<'span'>, 'className' | 'style' | 'children'>,
      Omit<VariantProps<typeof spinner>, 'size'>,
      SlotProps<State> {
    size?: ComponentSize;
    store?: Store;
    disabled?: boolean;
    className?: RenderProp<State, string>;
    style?: RenderProp<State, CSSProperties>;
  }
}
