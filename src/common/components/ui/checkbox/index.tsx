import { type ComponentProps, useEffect, useRef } from 'react';

import { IconCheck, IconMinus } from '@tabler/icons-react';

import { StateMask } from '@/common/components/utils';
import { useComponentSize, type ComponentSize } from '@/common/hooks';
import { type AccentProps, colorVars, mergeObjects, tv } from '@/common/utils';

import { useCheckbox } from './use-checkbox';

const checkboxBox = tv({
  base: [
    'relative inline-flex shrink-0 cursor-pointer items-center justify-center rounded-sm align-middle',
    'inset-ring inset-ring-neutral-border bg-transparent text-transparent',
    'transition-colors duration-fast',
    'data-checked:inset-ring-accent data-checked:bg-accent data-checked:text-on-accent',
    'data-indeterminate:inset-ring-accent data-indeterminate:bg-accent data-indeterminate:text-on-accent',
    'data-disabled:cursor-not-allowed data-disabled:inset-ring-neutral-border data-disabled:bg-neutral-bg-disabled data-disabled:text-neutral-text-disabled',
  ],
  variants: {
    size: {
      sm: 'size-3.5',
      md: 'size-4',
      lg: 'size-5',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const ICON_SIZE: Record<ComponentSize, number> = {
  sm: 10,
  md: 12,
  lg: 13,
};

export function Checkbox({
  size: localSize,
  color,
  className,
  style,
  disabled,
  checked,
  defaultChecked,
  onChange,
  indeterminate,
  ...inputProps
}: Checkbox.Props) {
  const size = useComponentSize(localSize);
  const { state, handlers, handleChange, dataProps } = useCheckbox({
    disabled,
    checked,
    defaultChecked,
    onChange,
    indeterminate,
  });

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (inputRef.current) inputRef.current.indeterminate = indeterminate ?? false;
  }, [indeterminate]);

  return (
    <span
      className={checkboxBox({ size, className })}
      style={mergeObjects(color ? colorVars(color) : undefined, style)}
      {...dataProps}
      {...handlers}
    >
      <input
        ref={inputRef}
        type="checkbox"
        className="absolute inset-0 m-0 cursor-[inherit] opacity-0"
        disabled={disabled}
        checked={checked}
        defaultChecked={defaultChecked}
        onChange={handleChange}
        {...inputProps}
      />
      {state.indeterminate ? (
        <IconMinus size={ICON_SIZE[size]} strokeWidth={3} aria-hidden />
      ) : state.checked ? (
        <IconCheck size={ICON_SIZE[size]} strokeWidth={3} aria-hidden />
      ) : null}
      <StateMask />
    </span>
  );
}

export namespace Checkbox {
  export interface Props
    extends Omit<ComponentProps<'input'>, 'color' | 'type' | 'size' | 'onChange'>, AccentProps {
    size?: ComponentSize;
    checked?: boolean;
    defaultChecked?: boolean;
    onChange?: (checked: boolean) => void;
    indeterminate?: boolean;
  }
}
