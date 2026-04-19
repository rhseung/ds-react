import { type ComponentProps } from 'react';

import { type VariantProps } from 'tailwind-variants';

import { Slot, type SlotProps } from '@/common/components/utils';
import { tv } from '@/common/utils';

export const textVariants = tv({
  base: '',
  variants: {
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-2xl',
      '3xl': 'text-3xl',
      '4xl': 'text-4xl',
    },
    weight: {
      thin: 'font-thin',
      extralight: 'font-extralight',
      light: 'font-light',
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
      extrabold: 'font-extrabold',
      black: 'font-black',
    },
    color: {
      'neutral-text': 'text-neutral-text',
      'neutral-text-weak': 'text-neutral-text-weak',
      'neutral-text-disabled': 'text-neutral-text-disabled',
      primary: 'text-primary',
      danger: 'text-danger',
      success: 'text-success',
      warning: 'text-warning',
      info: 'text-info',
    },
  },
  defaultVariants: {
    size: 'md',
    weight: 'normal',
  },
});

export function Text({ asChild, size, weight, color, className, children, ...props }: Text.Props) {
  const Comp = asChild ? Slot : 'span';

  return (
    <Comp className={textVariants({ size, weight, color, className })} {...props}>
      {children}
    </Comp>
  );
}

export namespace Text {
  export type Props = ComponentProps<'span'> & VariantProps<typeof textVariants> & SlotProps;
}
