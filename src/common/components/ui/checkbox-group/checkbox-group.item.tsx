import { useContext, useEffect } from 'react';

import { Checkbox } from '@/common/components/ui/checkbox';

import { CheckboxGroupCtx } from './context';

export function CheckboxGroupItem<T>({ value, ...checkboxProps }: CheckboxGroupItem.Props<T>) {
  const { register, unregister, toggle, values } = useContext(CheckboxGroupCtx)!;

  useEffect(() => {
    register(value);
    return () => unregister(value);
  }, [value, register, unregister]);

  return (
    <Checkbox checked={values.includes(value)} onChange={() => toggle(value)} {...checkboxProps} />
  );
}

export namespace CheckboxGroupItem {
  export type Props<T> = { value: T } & Omit<
    Checkbox.Props,
    'checked' | 'defaultChecked' | 'onChange' | 'indeterminate' | 'value'
  >;
}
