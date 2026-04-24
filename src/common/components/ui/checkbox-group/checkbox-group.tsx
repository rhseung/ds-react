import { type ComponentProps, type JSX, type ReactNode } from 'react';

import { isFunction } from 'es-toolkit';

import { type GroupStoreState } from '@/common/hooks';

import { CheckboxGroupAll } from './checkbox-group.all';
import { CheckboxGroupItem } from './checkbox-group.item';
import { CheckboxGroupContext } from './context';
import { useCheckboxGroup, type CheckboxGroupStore } from './use-checkbox-group';

type DivProps = Omit<ComponentProps<'div'>, 'onChange' | 'children' | 'defaultValue'>;

type CheckboxGroupChildren<T> =
  | ((args: {
      Item: ((props: CheckboxGroup.Item.Props<T>) => JSX.Element) &
        Pick<typeof CheckboxGroupItem, 'Indicator'>;
      All: ((props: CheckboxGroup.All.Props) => JSX.Element) &
        Pick<typeof CheckboxGroupAll, 'Indicator'>;
    }) => ReactNode)
  | ReactNode;

type PropsWithStore<T> = DivProps & {
  store: CheckboxGroupStore<T>;
  value?: never;
  defaultValue?: never;
  onChange?: never;
  children?: CheckboxGroupChildren<T>;
};

type PropsWithoutStore<T> = DivProps & {
  store?: never;
  value?: T[];
  defaultValue?: T[];
  onChange?: (value: T[]) => void;
  children?: CheckboxGroupChildren<T>;
};

export function CheckboxGroup<T>({
  store: externalStore,
  value,
  defaultValue,
  onChange,
  children,
  ...props
}: CheckboxGroup.Props<T>) {
  const internalStore = useCheckboxGroup<T>({ value, defaultValue, onChange });
  const store = externalStore ?? internalStore;

  const resolvedChildren = isFunction(children)
    ? children({
        Item: CheckboxGroupItem<T>,
        All: CheckboxGroupAll,
      })
    : children;

  return (
    <CheckboxGroupContext.Provider value={store as CheckboxGroupStore<unknown>}>
      <div role="group" {...props}>
        {resolvedChildren}
      </div>
    </CheckboxGroupContext.Provider>
  );
}

export namespace CheckboxGroup {
  export type Store<T> = CheckboxGroupStore<T>;
  export type State<T> = GroupStoreState<Store<T>>;
  export type Props<T> = PropsWithStore<T> | PropsWithoutStore<T>;

  export const Item = CheckboxGroupItem;
  export namespace Item {
    export type Props<T> = CheckboxGroupItem.Props<T>;
  }

  export const All = CheckboxGroupAll;
  export namespace All {
    export type Props = CheckboxGroupAll.Props;
  }
}
