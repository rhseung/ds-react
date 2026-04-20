import { type CSSProperties, type ComponentProps } from 'react';

import { Slot, type SlotProps } from '@/common/components/utils';
import { SizeContext, useComponentSize, type ComponentSize } from '@/common/hooks';
import { type AccentProps, type RenderProp, colorVars, mergeObjects, resolveRenderProp, tv } from '@/common/utils';

import { useAvatar } from './use-avatar';

const avatar = tv({
  base: 'inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full font-semibold',
  variants: {
    size: {
      sm: 'size-6 text-xs',
      md: 'size-8 text-sm',
      lg: 'size-10 text-base',
    },
    tone: {
      default: 'bg-accent text-on-accent',
      weak: 'bg-accent-weak text-on-accent-weak',
      contrast: 'bg-accent-contrast text-on-accent-contrast',
    },
  },
  defaultVariants: {
    size: 'md',
    tone: 'default',
  },
});

export function Avatar({
  src,
  name,
  alt,
  size: localSize,
  tone = 'default',
  color,
  className,
  style,
  asChild = false,
  children,
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
}: Avatar.Props) {
  const size = useComponentSize(localSize);
  const { state, handlers, dataProps } = useAvatar({
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
  const cls = avatar({ size, tone, className: resolveRenderProp(className, state) });
  const styles = mergeObjects(color ? colorVars(color) : undefined, resolveRenderProp(style, state));

  if (asChild) {
    return (
      <SizeContext.Provider value={size}>
        <Slot className={cls} style={styles} {...props} {...dataProps} {...handlers}>
          {resolveRenderProp(children, state)}
        </Slot>
      </SizeContext.Provider>
    );
  }

  const initials = name
    ? name
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : '?';

  return (
    <SizeContext.Provider value={size}>
      {src ? (
        <img src={src} alt={alt ?? name ?? ''} className={cls} style={styles} {...props} {...dataProps} {...handlers} />
      ) : (
        <span className={cls} style={styles} {...props} {...dataProps} {...handlers}>
          {initials}
        </span>
      )}
    </SizeContext.Provider>
  );
}

export namespace Avatar {
  export type State = ReturnType<typeof useAvatar>['state'];

  export interface Props
    extends Omit<ComponentProps<'img'>, 'color' | 'className' | 'style' | 'children'>,
      SlotProps<State>,
      AccentProps {
    size?: ComponentSize;
    tone?: 'default' | 'weak' | 'contrast';
    name?: string;
    disabled?: boolean;
    className?: RenderProp<State, string>;
    style?: RenderProp<State, CSSProperties>;
  }
}
