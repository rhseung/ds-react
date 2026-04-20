import { type ChangeEvent } from 'react';

import { useControllable, interactionDataProps, useInteraction } from '@/common/hooks';

type UseTextFieldOptions = {
  disabled?: boolean;
  value?: string;
  defaultValue?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

export function useTextField({
  disabled,
  value,
  defaultValue,
  onChange,
}: UseTextFieldOptions = {}) {
  const { state, handlers } = useInteraction<HTMLDivElement>({ disabled });
  const [currentValue, setCurrentValue] = useControllable(value, defaultValue ?? '');

  const inputHandlers = {
    onChange(e: ChangeEvent<HTMLInputElement>) {
      setCurrentValue(e.target.value);
      onChange?.(e);
    },
  };

  const newState = { ...state, filled: currentValue.length > 0 };

  return {
    state: newState,
    handlers,
    inputHandlers,
    dataProps: interactionDataProps(newState),
  };
}
