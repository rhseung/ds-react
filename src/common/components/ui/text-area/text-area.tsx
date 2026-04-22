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
import { textArea } from './styles';
import { TextAreaInput } from './text-area.input';
import { useTextArea, type TextAreaStore } from './use-text-area';

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
  store,
  disabled,
  value,
  defaultValue,
  onChange,
  ...inputProps
}: TextArea.Props) {
  const size = useComponentSize(sizeProp);
  const internalStore = useTextArea({ disabled, value, defaultValue });
  const {
    state,
    store: activeStore,
    handlers,
    dataProps,
  } = useComponentBehavior<{ value: string }, HTMLDivElement>(internalStore, store);

  const filled = state.value.length > 0;
  const fullState = { ...state, filled };
  const resolvedChildren = resolveRenderProp(children, fullState);

  if (!containsType(resolvedChildren, TextArea.Input))
    throw new Error('TextArea: children must include <TextArea.Input />');

  return (
    <SizeContext.Provider value={size}>
      <InputContext.Provider
        value={{
          ...inputProps,
          disabled: state.disabled,
          value: state.value,
          autoResize,
          onChange(e) {
            activeStore.set({ value: e.target.value });
            onChange?.(e);
          },
        }}
      >
        <div
          className={textArea({
            variant,
            tone,
            size,
            className: resolveRenderProp(className, fullState),
          })}
          style={mergeObjects(
            colorVars(color),
            { resize: autoResize ? 'none' : resize },
            resolveRenderProp(style, fullState),
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
  export type State = StoreState<TextAreaStore> & { filled: boolean };
  export type Store = TextAreaStore;

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
    store?: Store;
    value?: string;
    defaultValue?: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    className?: RenderProp<State, string>;
    style?: RenderProp<State, CSSProperties>;
    children?: RenderProp<State, ReactNode>;
  }
}
