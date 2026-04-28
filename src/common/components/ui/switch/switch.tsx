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
  type StoreOrControlled,
  colorVars,
  mergeObjects,
  resolveRenderProp,
} from '@/common/utils';

import { SwitchContext } from './context';
import { switchTrack } from './styles';
import { SwitchThumb } from './switch.thumb';
import { useSwitch, type SwitchStore } from './use-switch';

export function Switch({
  size: localSize,
  color,
  className,
  style,
  disabled,
  store,
  checked,
  defaultChecked,
  onChange,
  children = <Switch.Thumb />,
  ...inputProps
}: Switch.Props) {
  const size = useComponentSize(localSize);
  const internalStore = useSwitch({ checked, defaultChecked, onChange, disabled });
  const {
    state,
    store: activeStore,
    handlers,
    dataProps,
  } = useComponentBehavior(internalStore, store);

  return (
    <SwitchContext.Provider value={{ state }}>
      <SizeContext.Provider value={size}>
        <span
          className={switchTrack({ size, className: resolveRenderProp(className, state) })}
          style={mergeObjects(colorVars(color), resolveRenderProp(style, state))}
          {...dataProps}
          {...handlers}
        >
          <input
            type="checkbox"
            role="switch"
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
    </SwitchContext.Provider>
  );
}

export namespace Switch {
  export type State = StoreState<SwitchStore>;
  export type Store = SwitchStore;

  export const Thumb = SwitchThumb;
  export namespace Thumb {
    export type Props = SwitchThumb.Props;
  }

  export type Props = StoreOrControlled<
    Store,
    {
      checked?: boolean;
      defaultChecked?: boolean;
      onChange?: (checked: boolean) => void;
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
