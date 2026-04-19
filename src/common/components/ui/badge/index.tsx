import { type ComponentProps } from 'react';

import { type VariantProps } from 'tailwind-variants';

import { SizeContext, useComponentSize, type ComponentSize } from '@/common/hooks';
import { type AccentProps, colorVars, mergeObjects, tv } from '@/common/utils';

const badge = tv({
  base: 'inline-flex items-center rounded-md font-semibold',
  variants: {
    size: {
      sm: 'px-1.5 py-0 text-xs',
      md: 'px-2 py-0.5 text-xs',
      lg: 'px-2.5 py-1 text-sm',
    },
    variant: {
      solid: 'bg-neutral-text text-neutral-bg',
      outline: 'border border-neutral-border bg-transparent text-neutral-text-weak',
      ghost: 'bg-transparent text-neutral-text-weak',
    },
    tone: {
      default: '',
      weak: '',
      contrast: '',
    },
  },
  compoundVariants: [
    { tone: 'default', variant: 'solid', class: 'bg-accent text-on-accent' },
    { tone: 'default', variant: 'outline', class: 'border-accent text-accent' },
    { tone: 'default', variant: 'ghost', class: 'text-accent' },
    { tone: 'weak', variant: 'solid', class: 'bg-accent-weak text-on-accent-weak' },
    { tone: 'weak', variant: 'outline', class: 'border-accent-weak text-accent-weak' },
    { tone: 'weak', variant: 'ghost', class: 'text-accent-weak' },
    { tone: 'contrast', variant: 'solid', class: 'bg-accent-contrast text-on-accent-contrast' },
    { tone: 'contrast', variant: 'outline', class: 'border-accent-contrast text-accent-contrast' },
    { tone: 'contrast', variant: 'ghost', class: 'text-accent-contrast' },
  ],
  defaultVariants: {
    variant: 'solid',
    tone: 'default',
    size: 'md',
  },
});

export function Badge({
  variant = 'solid',
  tone = 'default',
  size: sizeProp,
  color,
  className,
  style,
  children,
  ...props
}: Badge.Props) {
  const size = useComponentSize(sizeProp);

  return (
    <SizeContext.Provider value={size}>
      <span
        className={badge({ variant, tone, size, className })}
        style={mergeObjects(color ? colorVars(color) : undefined, style)}
        {...props}
      >
        {children}
      </span>
    </SizeContext.Provider>
  );
}

export namespace Badge {
  export interface Props
    extends
      Omit<ComponentProps<'span'>, 'color'>,
      Omit<VariantProps<typeof badge>, 'size'>,
      AccentProps {
    size?: ComponentSize;
  }
}
