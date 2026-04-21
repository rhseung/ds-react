import { tv } from '@/common/utils';

export const spinner = tv({
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
