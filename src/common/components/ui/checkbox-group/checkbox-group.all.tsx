import { useContext } from 'react';

import { Checkbox } from '@/common/components/ui/checkbox';

import { CheckboxGroupContext } from './context';

export function CheckboxGroupAll(props: CheckboxGroupAll.Props) {
  const { values, allValues, toggleAll } = useContext(CheckboxGroupContext)!;
  const allChecked = allValues.length > 0 && values.length === allValues.length;
  const someChecked = values.length > 0 && values.length < allValues.length;

  return (
    <Checkbox
      checked={allChecked}
      indeterminate={someChecked}
      onChange={() => toggleAll()}
      {...props}
    />
  );
}

export namespace CheckboxGroupAll {
  export type Props = Omit<
    Checkbox.Props,
    'checked' | 'defaultChecked' | 'onChange' | 'indeterminate'
  >;
}
