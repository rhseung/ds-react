import { tv } from '@/common/utils';

export const icon = tv({
  base: 'shrink-0',
  variants: {
    size: {
      sm: 'size-4',
      md: 'size-5',
      lg: 'size-6',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});
