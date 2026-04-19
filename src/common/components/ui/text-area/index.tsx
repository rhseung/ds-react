import {
  Children,
  type CSSProperties,
  type ComponentProps,
  type PropsWithChildren,
  createContext,
  isValidElement,
  useContext,
  useRef,
} from 'react';

import { type VariantProps } from 'tailwind-variants';

import { type AccentProps, cn, colorVars, mergeObjects, tv } from '@/common/utils';

type InnerContextValue = Omit<ComponentProps<'textarea'>, 'className' | 'style'> & {
  autoResize?: boolean;
};

const InnerContext = createContext<InnerContextValue>({});

const textArea = tv({
  base: 'flex w-full flex-col overflow-hidden text-sm text-neutral-text transition-colors',
  variants: {
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
  },
});

export function TextArea({
  variant = 'outline',
  tone = 'default',
  color,
  className,
  style,
  resize = 'vertical',
  autoResize = false,
  children = <TextArea.Inner />,
  ...inputProps
}: TextArea.Props) {
  const hasInner = Children.toArray(children).some(
    (child) => isValidElement(child) && child.type === TextArea.Inner,
  );

  if (!hasInner) throw new Error('TextArea: children must include <TextArea.Inner />');

  return (
    <InnerContext.Provider value={{ ...inputProps, autoResize }}>
      <div
        className={textArea({ variant, tone, className })}
        style={mergeObjects(
          color ? colorVars(color) : undefined,
          { resize: autoResize ? 'none' : resize },
          style,
        )}
      >
        {children}
      </div>
    </InnerContext.Provider>
  );
}

export namespace TextArea {
  export function Inner({ className }: Inner.Props) {
    const { autoResize, rows = 3, onInput, ...ctx } = useContext(InnerContext);
    const ref = useRef<HTMLTextAreaElement>(null);

    const handleInput = (e: React.InputEvent<HTMLTextAreaElement>) => {
      if (autoResize && ref.current) {
        ref.current.style.height = 'auto';
        ref.current.style.height = `${ref.current.scrollHeight}px`;
      }
      onInput?.(e);
    };

    return (
      <textarea
        ref={ref}
        rows={rows}
        onInput={handleInput}
        className={cn(
          'placeholder:text-neutral-text-weak selection:bg-accent/30 h-full w-full flex-1 resize-none bg-transparent px-2.5 py-2 outline-none disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        {...ctx}
      />
    );
  }

  export namespace Inner {
    export type Props = { className?: string };
  }

  export type Props = PropsWithChildren<
    VariantProps<typeof textArea> &
      AccentProps & {
        className?: string;
        style?: CSSProperties;
        resize?: CSSProperties['resize'];
      } & InnerContextValue
  >;
}
