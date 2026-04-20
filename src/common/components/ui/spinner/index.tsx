import { type CSSProperties, type ComponentProps } from 'react';

import { type VariantProps } from 'tailwind-variants';

import { Slot, type SlotProps } from '@/common/components/utils';
import { SizeContext, useComponentSize, type ComponentSize } from '@/common/hooks';
import { type RenderProp, resolveRenderProp, tv } from '@/common/utils';

import { useSpinner } from './use-spinner';

const spinner = tv({
  base: 'inline-block animate-spin rounded-full border-2 border-current border-t-transparent',
  variants: {
    size: {
      sm: 'size-3.5',
      md: 'size-4',
      lg: 'size-4.5',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export function Spinner({
  size: sizeProp,
  className,
  style,
  children,
  asChild = false,
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
  const { state, handlers, dataProps } = useSpinner({
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
  export type State = ReturnType<typeof useSpinner>['state'];

  export interface Props
    extends
      Omit<ComponentProps<'span'>, 'className' | 'style' | 'children'>,
      Omit<VariantProps<typeof spinner>, 'size'>,
      SlotProps<State> {
    size?: ComponentSize;
    disabled?: boolean;
    className?: RenderProp<State, string>;
    style?: RenderProp<State, CSSProperties>;
  }
}
