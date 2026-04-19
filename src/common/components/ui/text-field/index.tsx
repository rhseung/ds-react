import {
  Children,
  type CSSProperties,
  type ComponentProps,
  type PropsWithChildren,
  createContext,
  isValidElement,
  useContext,
} from 'react';

import { type VariantProps } from 'tailwind-variants';

import { SizeContext, useComponentSize, type ComponentSize } from '@/common/hooks';
import { type AccentProps, cn, colorVars, mergeObjects, tv } from '@/common/utils';

type InnerContextValue = Omit<ComponentProps<'input'>, 'size' | 'className' | 'style'>;

const InnerContext = createContext<InnerContextValue>({});

const textField = tv({
  base: 'flex w-full items-center text-neutral-text transition-colors',
  variants: {
    size: {
      sm: 'h-8 gap-1 px-2 text-xs',
      md: 'h-9 gap-1.5 px-2.5 text-sm',
      lg: 'h-10 gap-1.5 px-3 text-base',
    },
    variant: {
      outline: 'rounded-lg border border-neutral-border bg-neutral-bg',
      filled:
        'rounded-lg border border-transparent bg-neutral-bg-disabled focus-within:bg-neutral-bg',
      underline: 'rounded-none border-b border-neutral-border px-0',
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

export function TextField({
  variant = 'outline',
  tone = 'default',
  size: localSize,
  color,
  className,
  style,
  children = <TextField.Inner />,
  ...inputProps
}: TextField.Props) {
  const size = useComponentSize(localSize);

  const hasInner = Children.toArray(children).some(
    (child) => isValidElement(child) && child.type === TextField.Inner,
  );

  if (!hasInner) throw new Error('TextField: children must include <TextField.Inner />');

  return (
    <SizeContext.Provider value={size}>
      <InnerContext.Provider value={inputProps}>
        <div
          className={textField({ variant, tone, size, className })}
          style={mergeObjects(color ? colorVars(color) : undefined, style)}
        >
          {children}
        </div>
      </InnerContext.Provider>
    </SizeContext.Provider>
  );
}

export namespace TextField {
  export function Inner({ className }: Inner.Props) {
    const ctx = useContext(InnerContext);

    return (
      <input
        className={cn(
          'placeholder:text-neutral-text-weak selection:bg-accent/30 min-w-0 flex-1 bg-transparent outline-none disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        {...ctx}
      />
    );
  }

  export namespace Inner {
    export type Props = { className?: string };
  }

  export interface Props extends PropsWithChildren<
    Omit<VariantProps<typeof textField>, 'size'> & AccentProps & InnerContextValue
  > {
    size?: ComponentSize;
    className?: string;
    style?: CSSProperties;
  }
}
