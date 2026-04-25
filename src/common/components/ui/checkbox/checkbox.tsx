import { type CSSProperties, type ComponentProps, type ReactNode, useEffect, useRef } from 'react';

import { StateMask } from '@/common/components/utils';
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
  type StoreOrControlled,
  colorVars,
  mergeObjects,
  resolveRenderProp,
} from '@/common/utils';

import { CheckboxIndicator } from './checkbox.indicator';
import { CheckboxContext } from './context';
import { checkboxBox } from './styles';
import { useCheckbox, type CheckboxStore } from './use-checkbox';

export function Checkbox({
  size: localSize,
  color,
  className,
  style,
  disabled,
  store,
  checked,
  defaultChecked,
  onChange,
  indeterminate,
  children = <Checkbox.Indicator />,
  ...inputProps
}: Checkbox.Props) {
  const size = useComponentSize(localSize);
  const internalStore = useCheckbox({ checked, defaultChecked, onChange, indeterminate, disabled });
  const {
    state,
    store: activeStore,
    handlers,
    dataProps,
  } = useComponentBehavior(internalStore, store);

  const inputRef = useRef<HTMLInputElement>(null);
  const isIndeterminate = state.indeterminate ?? false;
  useEffect(() => {
    if (inputRef.current) inputRef.current.indeterminate = isIndeterminate;
  }, [isIndeterminate]);

  return (
    <CheckboxContext.Provider value={{ state }}>
      <SizeContext.Provider value={size}>
        <span
          className={checkboxBox({ size, className: resolveRenderProp(className, state) })}
          style={mergeObjects(colorVars(color), resolveRenderProp(style, state))}
          {...dataProps}
          {...handlers}
        >
          <input
            ref={inputRef}
            type="checkbox"
            className="absolute inset-0 m-0 cursor-[inherit] opacity-0"
            disabled={state.disabled}
            checked={state.checked}
            onChange={(e) => activeStore.set({ checked: e.target.checked })}
            {...inputProps}
          />
          {resolveRenderProp(children, state)}
          <StateMask />
        </span>
      </SizeContext.Provider>
    </CheckboxContext.Provider>
  );
}

export namespace Checkbox {
  export type State = StoreState<CheckboxStore>;
  export type Store = CheckboxStore;

  export const Indicator = CheckboxIndicator;
  export namespace Indicator {
    export type Props = CheckboxIndicator.Props;
  }

  export type Props = StoreOrControlled<
    Store,
    {
      checked?: boolean;
      defaultChecked?: boolean;
      onChange?: (checked: boolean) => void;
      indeterminate?: boolean;
      disabled?: boolean;
    },
    Omit<
      ComponentProps<'input'>,
      | 'color'
      | 'type'
      | 'size'
      | 'onChange'
      | 'className'
      | 'style'
      | 'children'
      | 'checked'
      | 'defaultChecked'
      | 'disabled'
    > &
      AccentProps & {
        size?: ComponentSize;
        children?: RenderProp<State, ReactNode>;
        className?: RenderProp<State, string>;
        style?: RenderProp<State, CSSProperties>;
      }
  >;
}
