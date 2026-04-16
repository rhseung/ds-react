import { type VariantProps } from 'tailwind-variants';

import { tv } from '@/common/utils';

const avatar = tv({
  base: 'inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-neutral-bg-disabled font-semibold text-neutral-text-weak',
  variants: {
    size: {
      sm: 'size-6 text-xs',
      md: 'size-8 text-sm',
      lg: 'size-10 text-base',
      xl: 'size-12 text-lg',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export function Avatar({ src, name, alt, size, className }: Avatar.Props) {
  const initials = name
    ? name
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : '?';

  return (
    <span className={avatar({ size, className })}>
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
