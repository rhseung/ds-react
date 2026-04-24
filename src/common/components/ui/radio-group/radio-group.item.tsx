import { useContext } from 'react';

import { Radio } from '@/common/components/ui/radio';

import { RadioGroupContext } from './context';

export function RadioGroupItem<T>({ value, ...radioProps }: RadioGroupItem.Props<T>) {
  const { value: selectedValue, select } = useContext(RadioGroupContext)!;

  return <Radio checked={value === selectedValue} onChange={() => select(value)} {...radioProps} />;
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
