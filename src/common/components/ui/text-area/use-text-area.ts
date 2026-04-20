import { type ChangeEvent } from 'react';

import { useControllable } from '@/common/hooks';
import { interactionDataProps, useInteraction } from '@/common/hooks';

type UseTextAreaOptions = {
  disabled?: boolean;
  value?: string;
  defaultValue?: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
};

export function useTextArea({
  disabled,
  value,
  defaultValue,
  onChange,
}: UseTextAreaOptions = {}) {
  const { state, handlers } = useInteraction<HTMLDivElement>({ disabled });
  const [currentValue, setCurrentValue] = useControllable(value, defaultValue ?? '');

  const inputHandlers = {
    onChange(e: ChangeEvent<HTMLTextAreaElement>) {
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
