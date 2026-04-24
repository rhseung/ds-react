import { type ComponentProps, type JSX, type ReactNode } from 'react';

import { isFunction } from 'es-toolkit';

import { CheckboxGroupAll } from './checkbox-group.all';
import { CheckboxGroupItem } from './checkbox-group.item';
import { CheckboxGroupContext, useCheckboxGroupContextValue } from './context';

export function CheckboxGroup<T>({
  value,
  defaultValue,
  onChange,
  children,
  ...props
}: CheckboxGroup.Props<T>) {
  const ctx = useCheckboxGroupContextValue<T>({ value, defaultValue, onChange });

  const resolvedChildren = isFunction(children)
    ? children({
        Item: CheckboxGroupItem<T>,
        All: CheckboxGroupAll,
      })
    : children;

  return (
    <CheckboxGroupContext.Provider value={ctx as CheckboxGroupContext<unknown>}>
      <div role="group" {...props}>
        {resolvedChildren}
      </div>
    </CheckboxGroupContext.Provider>
  );
}

export namespace CheckboxGroup {
  export const Item = CheckboxGroupItem;
  export namespace Item {
    export type Props<T> = CheckboxGroupItem.Props<T>;
  }

  export const All = CheckboxGroupAll;
  export namespace All {
    export type Props = CheckboxGroupAll.Props;
  }

  export interface Props<T> extends Omit<
    ComponentProps<'div'>,
    'onChange' | 'children' | 'defaultValue'
  > {
    value?: T[];
    defaultValue?: T[];
    onChange?: (value: T[]) => void;
    children?:
      | ((args: {
          Item: ((props: CheckboxGroup.Item.Props<T>) => JSX.Element) &
            Pick<typeof CheckboxGroupItem, 'Indicator'>;
          All: ((props: CheckboxGroup.All.Props) => JSX.Element) &
            Pick<typeof CheckboxGroupAll, 'Indicator'>;
        }) => ReactNode)
      | ReactNode;
  }
}
