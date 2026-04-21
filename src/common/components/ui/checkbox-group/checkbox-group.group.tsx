import { type ComponentProps } from 'react';

import { CheckboxGroupCtx } from './context';
import { type CheckboxGroupState, useCheckboxGroupState } from './use-checkbox-group';

export function CheckboxGroupGroup<T>({
  value,
  defaultValue,
  onChange,
  children,
  ...divProps
}: CheckboxGroupGroup.Props<T>) {
  const state = useCheckboxGroupState<T>({ value, defaultValue, onChange });

  return (
    <CheckboxGroupCtx.Provider value={state as CheckboxGroupState<unknown>}>
      <div role="group" {...divProps}>
        {children}
      </div>
    </CheckboxGroupCtx.Provider>
  );
}

export namespace CheckboxGroupGroup {
  export type Props<T> = Omit<ComponentProps<'div'>, 'onChange'> & {
    value?: T[];
    defaultValue?: T[];
    onChange?: (value: T[]) => void;
  };
}
