import { tv } from '@/common/utils';

export const textAreaInput = tv({
  base: 'placeholder:text-neutral-text-weak selection:bg-accent/30 h-full w-full flex-1 resize-none bg-transparent outline-none disabled:cursor-not-allowed disabled:opacity-50',
  variants: {
    size: {
      sm: 'px-2 py-1.5',
      md: 'px-2.5 py-1.5',
      lg: 'px-3 py-2',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const textArea = tv({
  base: 'flex w-full flex-col overflow-hidden text-neutral-text transition-colors',
  variants: {
    size: {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
    },
    variant: {
      outline: 'rounded-lg border border-neutral-border bg-neutral-bg',
      filled: 'rounded-lg border border-transparent bg-neutral-bg-disabled',
      underline: 'rounded-none border-b border-neutral-border',
    },
    tone: {
      default: '',
      weak: '',
      contrast: '',
    },
  },
  compoundVariants: [
    {
      variant: 'outline',
      tone: 'default',
      class: 'focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/20',
    },
    {
      variant: 'outline',
      tone: 'weak',
      class: 'focus-within:border-accent-weak focus-within:ring-2 focus-within:ring-accent-weak/20',
    },
    {
      variant: 'outline',
      tone: 'contrast',
      class:
        'focus-within:border-accent-contrast focus-within:ring-2 focus-within:ring-accent-contrast/20',
    },
    {
      variant: 'filled',
      tone: 'default',
      class: 'focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/20',
    },
    {
      variant: 'filled',
      tone: 'weak',
      class: 'focus-within:border-accent-weak focus-within:ring-2 focus-within:ring-accent-weak/20',
    },
    {
      variant: 'filled',
      tone: 'contrast',
      class:
        'focus-within:border-accent-contrast focus-within:ring-2 focus-within:ring-accent-contrast/20',
    },
    { variant: 'underline', tone: 'default', class: 'focus-within:border-accent' },
    { variant: 'underline', tone: 'weak', class: 'focus-within:border-accent-weak' },
    { variant: 'underline', tone: 'contrast', class: 'focus-within:border-accent-contrast' },
  ],
  defaultVariants: {
    variant: 'outline',
    tone: 'default',
    size: 'md',
  },
});
