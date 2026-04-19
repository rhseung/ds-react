import { type ComponentProps } from 'react';

import { Slot, type SlotProps } from '@/common/components/utils';
import { cn } from '@/common/utils';

export function Box({ asChild, className, children, ...props }: Box.Props) {
  const Comp = asChild ? Slot : 'div';

  return (
    <Comp className={cn(className)} {...props}>
      {children}
    </Comp>
  );
}

export namespace Box {
  export type Props = ComponentProps<'div'> & SlotProps;
}
