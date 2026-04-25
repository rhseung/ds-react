import { useEffect } from 'react';

import { Checkbox } from '@/common/components/ui/checkbox';

import { useCheckboxGroupContext } from './context';

export function CheckboxGroupItem<T>({ value, ...checkboxProps }: CheckboxGroupItem.Props<T>) {
  const store = useCheckboxGroupContext<T>();
  const values = store.get((s) => s.values);
  const { register, unregister, toggle } = store;

  useEffect(() => {
    register(value);
    return () => unregister(value);
  }, [value, register, unregister]);

  return (
    <Checkbox checked={values.includes(value)} onChange={() => toggle(value)} {...checkboxProps} />
  );
}

export namespace CheckboxGroupItem {
  export const Indicator = Checkbox.Indicator;
  export namespace Indicator {
    export type Props = Checkbox.Indicator.Props;
  }

  export type Props<T> = { value: T } & Omit<
    Checkbox.Props,
    'checked' | 'defaultChecked' | 'onChange' | 'indeterminate' | 'value' | 'store'
  >;
}
