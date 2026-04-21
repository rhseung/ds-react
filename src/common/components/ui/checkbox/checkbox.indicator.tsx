import { IconCheck, IconMinus } from '@tabler/icons-react';

import { Slot, type SlotProps } from '@/common/components/utils';
import { SizeContext, useComponentSize } from '@/common/hooks';

import { useCheckboxContext } from './context';
import { CHECKBOX_ICON_SIZE } from './styles';

export function CheckboxIndicator({ asChild = false, children }: CheckboxIndicator.Props) {
  const { state } = useCheckboxContext();
  const size = useComponentSize();

  const icon = state.indeterminate ? (
    <IconMinus size={CHECKBOX_ICON_SIZE[size]} strokeWidth={3} aria-hidden />
  ) : state.checked ? (
    <IconCheck size={CHECKBOX_ICON_SIZE[size]} strokeWidth={3} aria-hidden />
  ) : null;

  if (asChild)
    return (
      <SizeContext.Provider value={size}>
        <Slot>{children}</Slot>
      </SizeContext.Provider>
    );
  return <SizeContext.Provider value={size}>{icon}</SizeContext.Provider>;
}

export namespace CheckboxIndicator {
  export type Props = SlotProps;
}
