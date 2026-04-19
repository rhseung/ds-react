import type { ChangeEvent } from 'react';

import {
  interactionDataProps,
  useControllable,
  useInteraction,
  type UseInteractionOptions,
} from '@/common/hooks';

type UseCheckboxOptions = UseInteractionOptions<HTMLSpanElement> & {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  indeterminate?: boolean;
  disabled?: boolean;
};

export function useCheckbox({
  disabled,
  checked: checkedProp,
  defaultChecked = false,
  onChange,
  indeterminate = false,
  ...eventHandlers
}: UseCheckboxOptions = {}) {
  const { state, handlers } = useInteraction<HTMLSpanElement>({ disabled, ...eventHandlers });
  const [checked, setChecked] = useControllable(checkedProp, defaultChecked, onChange);
  const newState = { ...state, checked, indeterminate };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  };

  return {
    state: newState,
    handlers,
    handleChange,
    dataProps: interactionDataProps(newState),
  };
}
