import { type ComponentProps } from 'react';

import { cn } from '@/common/utils';

export function Code({ className, children, ...props }: Code.Props) {
  return (
    <code
      className={cn('bg-neutral-bg-disabled rounded px-1 py-0.5 font-mono text-sm', className)}
      {...props}
    >
      {children}
    </code>
  );
}

export namespace Code {
  export type Props = ComponentProps<'code'>;
}
