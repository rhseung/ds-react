import { Slot, type SlotProps } from '@/common/components/utils';
import { SizeContext, useComponentSize } from '@/common/hooks';

import { useSwitchContext } from './context';
import { switchThumb } from './styles';

export function SwitchThumb({ asChild = false, children }: SwitchThumb.Props) {
  const { state } = useSwitchContext();
  const size = useComponentSize();

  const className = switchThumb({ size });
  const dataChecked = state.checked || undefined;
  const dataDisabled = state.disabled || undefined;

  if (asChild) {
    return (
      <SizeContext.Provider value={size}>
        <Slot
          data-checked={dataChecked}
          data-disabled={dataDisabled}
          className={className}
        >
          {children}
        </Slot>
      </SizeContext.Provider>
    );
  }

  return (
    <SizeContext.Provider value={size}>
      <span
        data-checked={dataChecked}
        data-disabled={dataDisabled}
        className={className}
      />
    </SizeContext.Provider>
  );
}

export namespace SwitchThumb {
  export type Props = SlotProps;
}
