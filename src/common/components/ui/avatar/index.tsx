import { type VariantProps } from 'tailwind-variants';

import { tv } from '@/common/utils';

const avatar = tv({
  base: 'inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full font-semibold',
  variants: {
    size: {
      sm: 'size-6 text-xs',
      md: 'size-8 text-sm',
      lg: 'size-10 text-base',
      xl: 'size-12 text-lg',
    },
    color: {
      neutral: 'bg-neutral-bg-disabled text-neutral-text-weak',
      primary: 'bg-primary text-on-primary',
    },
  },
  defaultVariants: {
    size: 'md',
    color: 'neutral',
  },
});

export function Avatar({ src, name, alt, size, color, className }: Avatar.Props) {
  const initials = name
    ? name
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : '?';

  return (
    <span className={avatar({ size, color, className })}>
      {src ? (
        <img src={src} alt={alt ?? name ?? ''} className="size-full object-cover" />
      ) : (
        initials
      )}
    </span>
  );
}

export namespace Avatar {
  export type Props = VariantProps<typeof avatar> & {
    src?: string;
    name?: string;
    alt?: string;
    className?: string;
  };
}
