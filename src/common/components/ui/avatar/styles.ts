import { tv } from '@/common/utils';

export const avatar = tv({
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
