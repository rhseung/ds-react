import { useContext, useRef } from 'react';

import { SizeContext } from '@/common/hooks';

import { InputContext } from './context';
import { textAreaInput } from './styles';

export function TextAreaInput({ className }: TextAreaInput.Props) {
  const { autoResize, rows = 3, onInput, ...ctx } = useContext(InputContext);
  const size = useContext(SizeContext);
  const ref = useRef<HTMLTextAreaElement>(null);

  const handleInput: NonNullable<React.TextareaHTMLAttributes<HTMLTextAreaElement>['onInput']> = (
    e,
  ) => {
    if (autoResize && ref.current) {
      ref.current.style.height = 'auto';
      ref.current.style.height = `${ref.current.scrollHeight}px`;
    }
    onInput?.(e);
  };

  return (
    <textarea
      ref={ref}
      rows={rows}
      onInput={handleInput}
      className={textAreaInput({ size, className })}
      {...ctx}
    />
  );
}

export namespace TextAreaInput {
  export type Props = { className?: string };
}
