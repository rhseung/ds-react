import { type ComponentSize } from '@/common/hooks';
import { tv } from '@/common/utils';

export const radioBox = tv({
  base: [
    'relative inline-flex shrink-0 cursor-pointer items-center justify-center rounded-full align-middle',
    'inset-ring inset-ring-neutral-border bg-transparent text-transparent',
    'transition-colors duration-fast',
    'data-checked:inset-ring-accent data-checked:bg-accent data-checked:text-on-accent',
    'data-disabled:cursor-not-allowed data-disabled:inset-ring-neutral-border data-disabled:bg-neutral-bg-disabled data-disabled:text-neutral-text-disabled',
  ],
  variants: {
    size: {
      sm: 'size-3.5',
      md: 'size-4',
      lg: 'size-5',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const RADIO_DOT_SIZE: Record<ComponentSize, string> = {
  sm: 'size-1.5',
  md: 'size-2',
  lg: 'size-2.5',
};
