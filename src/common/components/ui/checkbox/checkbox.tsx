import { type CSSProperties, type ComponentProps, type ReactNode, useEffect, useRef } from 'react';

import { StateMask } from '@/common/components/utils';
import { SizeContext, useComponentSize, type ComponentSize } from '@/common/hooks';
import {
  type AccentProps,
  type RenderProp,
  colorVars,
  mergeObjects,
  resolveRenderProp,
} from '@/common/utils';

import { CheckboxIndicator } from './checkbox.indicator';
import { CheckboxContext } from './context';
import { checkboxBox } from './styles';
import { useCheckbox } from './use-checkbox';

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
  children = <Checkbox.Indicator />,
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
    <CheckboxContext.Provider value={{ state }}>
      <SizeContext.Provider value={size}>
        <span
          className={checkboxBox({ size, className: resolveRenderProp(className, state) })}
          style={mergeObjects(
            color ? colorVars(color) : undefined,
            resolveRenderProp(style, state),
          )}
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
          {children}
          <StateMask />
        </span>
      </SizeContext.Provider>
    </CheckboxContext.Provider>
  );
}

export namespace Checkbox {
  export type State = ReturnType<typeof useCheckbox>['state'];

  export const Indicator = CheckboxIndicator;
  export namespace Indicator {
    export type Props = CheckboxIndicator.Props;
  }

  export interface Props
    extends
      Omit<
        ComponentProps<'input'>,
        'color' | 'type' | 'size' | 'onChange' | 'className' | 'style' | 'children'
      >,
      AccentProps {
    size?: ComponentSize;
    checked?: boolean;
    defaultChecked?: boolean;
    onChange?: (checked: boolean) => void;
    indeterminate?: boolean;
    children?: ReactNode;
    className?: RenderProp<State, string>;
    style?: RenderProp<State, CSSProperties>;
  }
}
