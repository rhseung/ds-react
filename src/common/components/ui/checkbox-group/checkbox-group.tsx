import { type ComponentProps, type JSX, type ReactNode } from 'react';

import { CheckboxGroupAll } from './checkbox-group.all';
import { CheckboxGroupItem } from './checkbox-group.item';
import { CheckboxGroupCtx } from './context';
import { type CheckboxGroupState, useCheckboxGroupState } from './use-checkbox-group';

export function CheckboxGroup<T>({
  value,
  defaultValue,
  onChange,
  children,
  ...props
}: CheckboxGroup.Props<T>) {
  const state = useCheckboxGroupState<T>({ value, defaultValue, onChange });

  const resolvedChildren =
    typeof children === 'function'
      ? children({
          Item: CheckboxGroupItem<T>,
          All: CheckboxGroupAll,
        })
      : children;

  return (
    <CheckboxGroupCtx.Provider value={state as CheckboxGroupState<unknown>}>
      <div role="group" {...props}>
        {resolvedChildren}
      </div>
    </CheckboxGroupCtx.Provider>
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
          Item: (props: CheckboxGroup.Item.Props<T>) => JSX.Element;
          All: (props: CheckboxGroup.All.Props) => JSX.Element;
        }) => ReactNode)
      | ReactNode;
  }
}
