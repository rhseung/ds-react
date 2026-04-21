import { type CSSProperties, type ReactNode } from 'react';

import { type VariantProps } from 'tailwind-variants';

import { SizeContext, useComponentSize, type ComponentSize } from '@/common/hooks';
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
import { useTextField } from './use-text-field';

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
    value?: string;
    defaultValue?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: RenderProp<State, string>;
    style?: RenderProp<State, CSSProperties>;
    children?: RenderProp<State, ReactNode>;
  }
}
