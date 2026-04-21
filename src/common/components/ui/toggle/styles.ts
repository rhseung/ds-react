import { tv } from '@/common/utils';

export const toggle = tv({
  base: [
    'relative inline-flex items-center justify-center',
    'rounded-lg',
    'font-semibold',
    'cursor-pointer transition-transform duration-fast ease-press data-active:scale-[0.98]',
    'data-disabled:cursor-not-allowed data-disabled:text-neutral-text-disabled',
  ],
  variants: {
    size: {
      sm: 'h-8 gap-1 px-2.5 text-xs',
      md: 'h-9 gap-1.5 px-3 text-sm',
      lg: 'h-10 gap-1.5 px-3 text-base',
    },
    icon: {
      true: '',
    },
    variant: {
      solid: 'bg-accent text-on-accent data-disabled:bg-neutral-bg-disabled',
      elevated:
        'bg-accent text-on-accent data-disabled:bg-neutral-bg-disabled shadow-bevel data-active:translate-y-px data-active:shadow-bevel-active data-active:scale-100 data-toggled:translate-y-px data-toggled:shadow-bevel-active',
      outline:
        'inset-ring inset-ring-accent bg-transparent text-accent data-disabled:inset-ring-neutral-border data-disabled:bg-transparent',
      ghost: 'bg-transparent text-accent',
    },
    tone: {
      default: '',
      weak: '',
      contrast: '',
    },
  },
  compoundVariants: [
    // icon sizes
    { icon: true, size: 'sm', class: 'size-8 px-0' },
    { icon: true, size: 'md', class: 'size-9 px-0' },
    { icon: true, size: 'lg', class: 'size-10 px-0' },
    // weak tone
    { tone: 'weak', variant: 'solid', class: 'bg-accent-weak text-on-accent-weak' },
    { tone: 'weak', variant: 'elevated', class: 'bg-accent-weak text-on-accent-weak' },
    { tone: 'weak', variant: 'outline', class: 'inset-ring-accent-weak text-accent-weak' },
    { tone: 'weak', variant: 'ghost', class: 'text-accent-weak' },
    // contrast tone
    { tone: 'contrast', variant: 'solid', class: 'bg-accent-contrast text-on-accent-contrast' },
    { tone: 'contrast', variant: 'elevated', class: 'bg-accent-contrast text-on-accent-contrast' },
    {
      tone: 'contrast',
      variant: 'outline',
      class: 'inset-ring-accent-contrast text-accent-contrast',
    },
    { tone: 'contrast', variant: 'ghost', class: 'text-accent-contrast' },
  ],
  defaultVariants: {
    variant: 'solid',
    tone: 'default',
    size: 'md',
  },
});
