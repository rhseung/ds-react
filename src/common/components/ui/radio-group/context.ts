import { createContext, useState } from 'react';

export type RadioGroupContext<T> = {
  value: T | undefined;
  select: (v: T) => void;
};

type UseRadioGroupContextOptions<T> = {
  value?: T;
  defaultValue?: T;
  onChange?: (value: T) => void;
};

export function useRadioGroupContextValue<T>({
  value: controlledValue,
  defaultValue,
  onChange,
}: UseRadioGroupContextOptions<T> = {}): RadioGroupContext<T> {
  const [internalValue, setInternalValue] = useState<T | undefined>(defaultValue);
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  function select(v: T) {
    if (!isControlled) setInternalValue(v);
    onChange?.(v);
  }

  return { value, select };
}

export const RadioGroupContext = createContext<RadioGroupContext<unknown> | null>(null);
