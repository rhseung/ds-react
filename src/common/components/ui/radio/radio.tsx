import { type CSSProperties, type ComponentProps, type ReactNode } from 'react';

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
  colorVars,
  mergeObjects,
  resolveRenderProp,
} from '@/common/utils';

import { RadioContext } from './context';
import { RadioIndicator } from './radio.indicator';
import { radioBox } from './styles';
import { useRadio, type RadioStore } from './use-radio';

export function Radio({
  size: localSize,
  color,
  className,
  style,
  disabled,
  store,
  checked,
  defaultChecked,
  onChange,
  children = <Radio.Indicator />,
  ...inputProps
}: Radio.Props) {
  const size = useComponentSize(localSize);
  const internalStore = useRadio({ checked, defaultChecked, onChange, disabled });
  const {
    state,
    store: activeStore,
    handlers,
    dataProps,
  } = useComponentBehavior(internalStore, store);

  return (
    <RadioContext.Provider value={{ state }}>
      <SizeContext.Provider value={size}>
        <span
          className={radioBox({ size, className: resolveRenderProp(className, state) })}
          style={mergeObjects(colorVars(color), resolveRenderProp(style, state))}
          {...dataProps}
          {...handlers}
        >
          <input
            type="radio"
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
    </RadioContext.Provider>
  );
}

export namespace Radio {
  export type State = StoreState<RadioStore>;
  export type Store = RadioStore;

  export const Indicator = RadioIndicator;
  export namespace Indicator {
    export type Props = RadioIndicator.Props;
  }

  export interface Props
    extends
      Omit<
        ComponentProps<'input'>,
        'color' | 'type' | 'size' | 'onChange' | 'className' | 'style' | 'children'
      >,
      AccentProps {
    size?: ComponentSize;
    store?: Store;
    checked?: boolean;
    defaultChecked?: boolean;
    onChange?: (checked: boolean) => void;
    children?: RenderProp<State, ReactNode>;
    className?: RenderProp<State, string>;
    style?: RenderProp<State, CSSProperties>;
  }
}
