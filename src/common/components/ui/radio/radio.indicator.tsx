import { Slot, type SlotProps } from '@/common/components/utils';
import { SizeContext, useComponentSize } from '@/common/hooks';
import { cn } from '@/common/utils';

import { useRadioContext } from './context';
import { RADIO_DOT_SIZE } from './styles';

export function RadioIndicator({ asChild = false, children }: RadioIndicator.Props) {
  const { state } = useRadioContext();
  const size = useComponentSize();

  if (asChild) {
    return (
      <SizeContext.Provider value={size}>
        <Slot data-checked={state.checked || undefined} data-disabled={state.disabled || undefined}>
          {children}
        </Slot>
      </SizeContext.Provider>
    );
  }

  return (
    <SizeContext.Provider value={size}>
      {state.checked && (
        <span className={cn('block rounded-full bg-current', RADIO_DOT_SIZE[size])} aria-hidden />
      )}
    </SizeContext.Provider>
  );
}

export namespace RadioIndicator {
  export type Props = SlotProps;
}
