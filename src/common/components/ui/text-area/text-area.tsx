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
import { textArea } from './styles';
import { TextAreaInput } from './text-area.input';
import { useTextArea } from './use-text-area';

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

  export const Input = TextAreaInput;
  export namespace Input {
    export type Props = TextAreaInput.Props;
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
