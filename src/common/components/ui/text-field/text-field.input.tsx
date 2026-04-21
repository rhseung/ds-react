import { useContext } from 'react';

import { cn } from '@/common/utils';

import { InputContext } from './context';

export function TextFieldInput({ className }: TextFieldInput.Props) {
  const ctx = useContext(InputContext);

  return (
    <input
      className={cn(
        'placeholder:text-neutral-text-weak selection:bg-accent/30 min-w-0 flex-1 bg-transparent outline-none disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...ctx}
    />
  );
}

export namespace TextFieldInput {
  export type Props = { className?: string };
}
