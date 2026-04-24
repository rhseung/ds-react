import { type ComponentProps, type JSX, type ReactNode } from 'react';

import { isFunction } from 'es-toolkit';

import { RadioGroupContext, useRadioGroupContextValue } from './context';
import { RadioGroupItem } from './radio-group.item';

export function RadioGroup<T>({
  value,
  defaultValue,
  onChange,
  children,
  ...props
}: RadioGroup.Props<T>) {
  const ctx = useRadioGroupContextValue<T>({ value, defaultValue, onChange });

  const resolvedChildren = isFunction(children) ? children({ Item: RadioGroupItem<T> }) : children;

  return (
    <RadioGroupContext.Provider value={ctx as RadioGroupContext<unknown>}>
      <div role="radiogroup" {...props}>
        {resolvedChildren}
      </div>
    </RadioGroupContext.Provider>
  );
}

export namespace RadioGroup {
  export const Item = RadioGroupItem;
  export namespace Item {
    export type Props<T> = RadioGroupItem.Props<T>;
  }

  export interface Props<T> extends Omit<
    ComponentProps<'div'>,
    'onChange' | 'children' | 'defaultValue'
  > {
    value?: T;
    defaultValue?: T;
    onChange?: (value: T) => void;
    children?:
      | ((args: {
          Item: ((props: RadioGroup.Item.Props<T>) => JSX.Element) &
            Pick<typeof RadioGroupItem, 'Indicator'>;
        }) => ReactNode)
      | ReactNode;
  }
}
