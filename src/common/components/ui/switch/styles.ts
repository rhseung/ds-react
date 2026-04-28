import { tv } from '@/common/utils';

export const switchTrack = tv({
  base: [
    'relative inline-flex shrink-0 cursor-pointer items-center rounded-full',
    'bg-neutral-border',
    'transition-colors duration-fast',
    'data-checked:bg-accent',
    'data-disabled:cursor-not-allowed data-disabled:opacity-50',
  ],
  variants: {
    size: {
      sm: 'h-5 w-9',   // 20 × 36px
      md: 'h-6 w-11',  // 24 × 44px
      lg: 'h-7 w-14',  // 28 × 56px
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

// thumb 이동 거리 = 트랙 너비 - 썸 크기 - 2px(패딩)
// sm: 36 - 16 - 2 = 18px  md: 44 - 20 - 2 = 22px  lg: 56 - 24 - 2 = 30px
export const switchThumb = tv({
  base: [
    'absolute rounded-full bg-white shadow-sm',
    'pointer-events-none',
    'transition-transform duration-fast ease-press',
    'translate-x-0.5',
  ],
  variants: {
    size: {
      sm: ['size-4', 'data-checked:translate-x-4.5'],
      md: ['size-5', 'data-checked:translate-x-5.5'],
      lg: ['size-6', 'data-checked:translate-x-7.5'],
    },
  },
  defaultVariants: {
    size: 'md',
  },
});
