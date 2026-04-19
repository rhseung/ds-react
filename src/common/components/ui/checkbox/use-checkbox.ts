import { type ChangeEvent, useState } from 'react';

import { interactionDataProps, useInteraction, type UseInteractionOptions } from '@/common/hooks';

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
  const isControlled = checkedProp !== undefined;
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const checked = isControlled ? checkedProp! : internalChecked;

  const { state, handlers } = useInteraction<HTMLSpanElement>({ disabled, ...eventHandlers });
  const newState = { ...state, checked, indeterminate };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const next = e.target.checked;
    if (!isControlled) setInternalChecked(next);
    onChange?.(next);
  };

  return {
    state: newState,
    handlers,
    handleChange,
    dataProps: interactionDataProps(newState),
  };
}
