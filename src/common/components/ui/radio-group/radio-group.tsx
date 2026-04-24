import { type ComponentProps, type JSX, type ReactNode } from 'react';

import { isFunction } from 'es-toolkit';

import { type GroupStoreState } from '@/common/hooks';

import { RadioGroupContext } from './context';
import { RadioGroupItem } from './radio-group.item';
import { useRadioGroup, type RadioGroupStore } from './use-radio-group';

type DivProps = Omit<ComponentProps<'div'>, 'onChange' | 'children' | 'defaultValue'>;

type RadioGroupChildren<T> =
  | ((args: {
      Item: ((props: RadioGroup.Item.Props<T>) => JSX.Element) &
        Pick<typeof RadioGroupItem, 'Indicator'>;
    }) => ReactNode)
  | ReactNode;

type PropsWithStore<T> = DivProps & {
  store: RadioGroupStore<T>;
  value?: never;
  defaultValue?: never;
  onChange?: never;
  children?: RadioGroupChildren<T>;
};

type PropsWithoutStore<T> = DivProps & {
  store?: never;
  value?: T;
  defaultValue?: T;
  onChange?: (value: T) => void;
  children?: RadioGroupChildren<T>;
};

export function RadioGroup<T>({
  store: externalStore,
  value,
  defaultValue,
  onChange,
  children,
  ...props
}: RadioGroup.Props<T>) {
  const internalStore = useRadioGroup<T>({ value, defaultValue, onChange });
  const store = externalStore ?? internalStore;

  const resolvedChildren = isFunction(children) ? children({ Item: RadioGroupItem<T> }) : children;

  return (
    <RadioGroupContext.Provider value={store as RadioGroupStore<unknown>}>
      <div role="radiogroup" {...props}>
        {resolvedChildren}
      </div>
    </RadioGroupContext.Provider>
  );
}

export namespace RadioGroup {
  export type Store<T> = RadioGroupStore<T>;
  export type State<T> = GroupStoreState<Store<T>>;
  export type Props<T> = PropsWithStore<T> | PropsWithoutStore<T>;

  export const Item = RadioGroupItem;
  export namespace Item {
    export type Props<T> = RadioGroupItem.Props<T>;
  }
}
