import { type CSSProperties, type ReactNode } from 'react';

import { type VariantProps } from 'tailwind-variants';

import {
  SizeContext,
  type StoreState,
  useComponentBehavior,
  useComponentSize,
  type ComponentSize,
} from '@/common/hooks';
import {
  type AccentProps,
  type RenderProp,
  colorVars,
  containsType,
  mergeObjects,
  resolveRenderProp,
} from '@/common/utils';

import { InputContext, type InputContextValue } from './context';
import { textField } from './styles';
import { TextFieldInput } from './text-field.input';
import { useTextField, type TextFieldStore } from './use-text-field';

export function TextField({
  variant = 'outline',
  tone = 'default',
  size: localSize,
  color,
  className,
  style,
  children = <TextField.Input />,
  store,
  disabled,
  value,
  defaultValue,
  onChange,
  ...inputProps
}: TextField.Props) {
  const size = useComponentSize(localSize);
  const internalStore = useTextField({ disabled, value, defaultValue });
  const {
    state,
    store: activeStore,
    handlers,
    dataProps,
  } = useComponentBehavior<{ value: string }, HTMLDivElement>(internalStore, store);

  const resolvedChildren = resolveRenderProp(children, {
    ...state,
    filled: state.value.length > 0,
  });

  if (!containsType(resolvedChildren, TextField.Input))
    throw new Error('TextField: children must include <TextField.Input />');

  return (
    <SizeContext.Provider value={size}>
      <InputContext.Provider
        value={{
          ...inputProps,
          disabled: state.disabled,
          value: state.value,
          onChange(e) {
            activeStore.set({ value: e.target.value });
            onChange?.(e);
          },
        }}
      >
        <div
          className={textField({
            variant,
            tone,
            size,
            className: resolveRenderProp(className, { ...state, filled: state.value.length > 0 }),
          })}
          style={mergeObjects(
            colorVars(color),
            resolveRenderProp(style, { ...state, filled: state.value.length > 0 }),
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
  export type State = StoreState<TextFieldStore> & { filled: boolean };
  export type Store = TextFieldStore;

  export const Input = TextFieldInput;
  export namespace Input {
    export type Props = TextFieldInput.Props;
  }

  export interface Props
    extends
      Omit<InputContextValue, 'color' | 'value' | 'defaultValue' | 'onChange'>,
      Omit<VariantProps<typeof textField>, 'size'>,
      AccentProps {
    size?: ComponentSize;
    store?: Store;
    value?: string;
    defaultValue?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: RenderProp<State, string>;
    style?: RenderProp<State, CSSProperties>;
    children?: RenderProp<State, ReactNode>;
  }
}
