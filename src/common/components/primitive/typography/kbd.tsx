import { type ComponentProps } from 'react';

import { cn } from '@/common/utils';

export function Kbd({ className, children, ...props }: Kbd.Props) {
  return (
    <kbd
      className={cn(
        'border-neutral-border bg-neutral-bg inline-flex items-center rounded border px-1.5 py-0.5 font-mono text-xs font-medium',
        className,
      )}
      {...props}
    >
      {children}
    </kbd>
  );
}

export namespace Kbd {
  export type Props = ComponentProps<'kbd'>;
}
