import { Radio } from '@/common/components/ui/radio';

import { useRadioGroupContext } from './context';

export function RadioGroupItem<T>({ value, ...radioProps }: RadioGroupItem.Props<T>) {
  const store = useRadioGroupContext<T>();
  const selectedValue = store.get((s) => s.value);

  return <Radio checked={value === selectedValue} onChange={() => store.select(value)} {...radioProps} />;
}

export namespace RadioGroupItem {
  export const Indicator = Radio.Indicator;
  export namespace Indicator {
    export type Props = Radio.Indicator.Props;
  }

  export type Props<T> = { value: T } & Omit<
    Radio.Props,
    'checked' | 'defaultChecked' | 'onChange' | 'value'
  >;
}
