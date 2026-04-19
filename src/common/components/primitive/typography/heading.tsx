import { type ComponentProps } from 'react';

import { type VariantProps } from 'tailwind-variants';

import { textVariants } from './text';

const LEVEL_SIZE = {
  1: '4xl',
  2: '3xl',
  3: '2xl',
  4: 'xl',
  5: 'lg',
  6: 'md',
} as const satisfies Record<number, VariantProps<typeof textVariants>['size']>;

type Level = keyof typeof LEVEL_SIZE;

export function Heading({
  level,
  size,
  weight = 'bold',
  className,
  children,
  ...props
}: Heading.Props) {
  const Tag = `h${level}` as const;

  return (
    <Tag
      className={textVariants({ size: size ?? LEVEL_SIZE[level], weight, className })}
      {...props}
    >
      {children}
    </Tag>
  );
}

export namespace Heading {
  export type Props = ComponentProps<'h1'> &
    VariantProps<typeof textVariants> & {
      level: Level;
    };
}
