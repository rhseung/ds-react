import {
  type CSSProperties,
  type ComponentProps,
  type ReactNode,
  createContext,
  useContext,
} from 'react';

import { type VariantProps } from 'tailwind-variants';

import { SizeContext, useComponentSize, type ComponentSize } from '@/common/hooks';
import {
  type AccentProps,
  type RenderProp,
  cn,
  colorVars,
  containsType,
  mergeObjects,
  resolveRenderProp,
  tv,
} from '@/common/utils';

import { useTextField } from './use-text-field';

type InputContextValue = Omit<ComponentProps<'input'>, 'size' | 'className' | 'style' | 'children'>;

const InputContext = createContext<InputContextValue>({});

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
  children = <TextField.Input />,
  disabled,
  value,
  defaultValue,
  onChange,
  ...inputProps
}: TextField.Props) {
  const size = useComponentSize(localSize);
  const { state, handlers, inputHandlers, dataProps } = useTextField({
    disabled,
    value,
    defaultValue,
    onChange,
  });

  const resolvedChildren = resolveRenderProp(children, state);

  if (!containsType(resolvedChildren, TextField.Input))
    throw new Error('TextField: children must include <TextField.Input />');

  return (
    <SizeContext.Provider value={size}>
      <InputContext.Provider value={{ ...inputProps, disabled, value, ...inputHandlers }}>
        <div
          className={textField({
            variant,
            tone,
            size,
            className: resolveRenderProp(className, state),
          })}
          style={mergeObjects(
            color ? colorVars(color) : undefined,
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

export namespace TextField {
  export type State = ReturnType<typeof useTextField>['state'];

  export function Input({ className }: Input.Props) {
    const ctx = useContext(InputContext);

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

  export namespace Input {
    export type Props = { className?: string };
  }

  export interface Props
    extends Omit<InputContextValue, 'color' | 'value' | 'defaultValue' | 'onChange'>,
      Omit<VariantProps<typeof textField>, 'size'>,
      AccentProps {
    size?: ComponentSize;
    value?: string;
    defaultValue?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: RenderProp<State, string>;
    style?: RenderProp<State, CSSProperties>;
    children?: RenderProp<State, ReactNode>;
  }
}
