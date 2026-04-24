import { type ComponentSize } from '@/common/hooks';
import { tv } from '@/common/utils';

export const checkboxBox = tv({
  base: [
    'relative inline-flex shrink-0 cursor-pointer items-center justify-center rounded-sm align-middle',
    'outline outline-neutral-border bg-transparent text-transparent',
    'transition-colors duration-fast',
    'data-checked:outline-accent data-checked:bg-accent data-checked:text-on-accent',
    'data-indeterminate:outline-accent data-indeterminate:bg-accent data-indeterminate:text-on-accent',
    'data-disabled:cursor-not-allowed data-disabled:outline-neutral-border data-disabled:bg-neutral-bg-disabled data-disabled:text-neutral-text-disabled',
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

export const CHECKBOX_ICON_SIZE: Record<ComponentSize, number> = {
  sm: 10,
  md: 12,
  lg: 13,
};
