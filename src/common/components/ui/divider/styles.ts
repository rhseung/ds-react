import { tv } from '@/common/utils';

export const divider = tv({
  base: 'shrink-0 bg-neutral-border',
  variants: {
    orientation: {
      horizontal: 'h-px w-full',
      vertical: 'h-full w-px',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
});
