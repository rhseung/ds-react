import {
  type CSSProperties,
  type ComponentProps,
  type ReactNode,
  createContext,
  useContext,
  useRef,
} from 'react';

import { type VariantProps } from 'tailwind-variants';

import { SizeContext, useComponentSize, type ComponentSize } from '@/common/hooks';
import {
  type AccentProps,
  type RenderProp,
  colorVars,
  containsType,
  mergeObjects,
  resolveRenderProp,
  tv,
} from '@/common/utils';

import { useTextArea } from './use-text-area';

type InputContextValue = Omit<ComponentProps<'textarea'>, 'className' | 'style' | 'children'> & {
  autoResize?: boolean;
};

const InputContext = createContext<InputContextValue>({});

const textAreaInput = tv({
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

const textArea = tv({
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

export function TextArea({
  variant = 'outline',
  tone = 'default',
  size: sizeProp,
  color,
  className,
  style,
  resize = 'vertical',
  autoResize = false,
  children = <TextArea.Input />,
  disabled,
  value,
  defaultValue,
  onChange,
  ...inputProps
}: TextArea.Props) {
  const size = useComponentSize(sizeProp);
  const { state, handlers, inputHandlers, dataProps } = useTextArea({
    disabled,
    value,
    defaultValue,
    onChange,
  });

  const resolvedChildren = resolveRenderProp(children, state);

  if (!containsType(resolvedChildren, TextArea.Input))
    throw new Error('TextArea: children must include <TextArea.Input />');

  return (
    <SizeContext.Provider value={size}>
      <InputContext.Provider
        value={{ ...inputProps, disabled, value, autoResize, ...inputHandlers }}
      >
        <div
          className={textArea({
            variant,
            tone,
            size,
            className: resolveRenderProp(className, state),
          })}
          style={mergeObjects(
            color ? colorVars(color) : undefined,
            { resize: autoResize ? 'none' : resize },
            resolveRenderProp(style, state),
          )}
          {...dataProps}
          {...handlers}
        >
          {resolvedChildren}
        </div>
      </InputContext.Provider>
    </SizeContext.Provider>
  );
}

export namespace TextArea {
  export type State = ReturnType<typeof useTextArea>['state'];

  export function Input({ className }: Input.Props) {
    const { autoResize, rows = 3, onInput, ...ctx } = useContext(InputContext);
    const size = useContext(SizeContext);
    const ref = useRef<HTMLTextAreaElement>(null);

    const handleInput: NonNullable<React.TextareaHTMLAttributes<HTMLTextAreaElement>['onInput']> = (
      e,
    ) => {
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
        className={textAreaInput({ size, className })}
        {...ctx}
      />
    );
  }

  export namespace Input {
    export type Props = { className?: string };
  }

  export interface Props
    extends
      Omit<InputContextValue, 'autoResize' | 'color' | 'value' | 'defaultValue' | 'onChange'>,
      Omit<VariantProps<typeof textArea>, 'size'>,
      AccentProps {
    size?: ComponentSize;
    autoResize?: boolean;
    resize?: CSSProperties['resize'];
    value?: string;
    defaultValue?: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    className?: RenderProp<State, string>;
    style?: RenderProp<State, CSSProperties>;
    children?: RenderProp<State, ReactNode>;
  }
}
