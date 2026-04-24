import { Checkbox } from '@/common/components/ui/checkbox';

import { useCheckboxGroupContext } from './context';

export function CheckboxGroupAll(props: CheckboxGroupAll.Props) {
  const store = useCheckboxGroupContext();
  const { values, allValues } = store.get();
  const allChecked = allValues.length > 0 && values.length === allValues.length;
  const someChecked = values.length > 0 && values.length < allValues.length;

  return (
    <Checkbox
      checked={allChecked}
      indeterminate={someChecked}
      onChange={() => store.toggleAll()}
      {...props}
    />
  );
}

export namespace CheckboxGroupAll {
  export const Indicator = Checkbox.Indicator;
  export namespace Indicator {
    export type Props = Checkbox.Indicator.Props;
  }

  export type Props = Omit<
    Checkbox.Props,
    'checked' | 'defaultChecked' | 'onChange' | 'indeterminate'
  >;
}
