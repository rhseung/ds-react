import { type ComponentProps, createContext, type JSX, useContext, useEffect } from 'react';

import { Checkbox } from '@/common/components/ui/checkbox';

import { type CheckboxGroupState, useCheckboxGroupState } from './use-checkbox-group';

type CheckboxGroupCtxValue = CheckboxGroupState<unknown>;

const CheckboxGroupCtx = createContext<CheckboxGroupCtxValue | null>(null);

type GroupBaseProps = Omit<ComponentProps<'div'>, 'onChange'> & {
  value?: unknown[];
  defaultValue?: unknown[];
  onChange?: (value: unknown[]) => void;
};

function GroupBase({ value, defaultValue, onChange, children, ...divProps }: GroupBaseProps) {
  const state = useCheckboxGroupState({ value, defaultValue, onChange });

  return (
    <CheckboxGroupCtx.Provider value={state}>
      <div role="group" {...divProps}>
        {children}
      </div>
    </CheckboxGroupCtx.Provider>
  );
}

type ItemBaseProps = { value: unknown } & Omit<
  Checkbox.Props,
  'checked' | 'defaultChecked' | 'onChange' | 'indeterminate' | 'value'
>;

function ItemBase({ value, ...checkboxProps }: ItemBaseProps) {
  const { register, unregister, toggle, values } = useContext(CheckboxGroupCtx)!;

  useEffect(() => {
    register(value);
    return () => unregister(value);
  }, [value, register, unregister]);

  return (
    <Checkbox checked={values.includes(value)} onChange={() => toggle(value)} {...checkboxProps} />
  );
}

type AllBaseProps = Omit<
  Checkbox.Props,
  'checked' | 'defaultChecked' | 'onChange' | 'indeterminate'
>;

function AllBase(props: AllBaseProps): JSX.Element {
  const { values, allValues, toggleAll } = useContext(CheckboxGroupCtx)!;
  const allChecked = allValues.length > 0 && values.length === allValues.length;
  const someChecked = values.length > 0 && values.length < allValues.length;

  return (
    <Checkbox
      checked={allChecked}
      indeterminate={someChecked}
      onChange={() => toggleAll()}
      {...props}
    />
  );
}

export function useCheckboxGroup<T>() {
  return {
    Group: GroupBase as (props: useCheckboxGroup.GroupProps<T>) => JSX.Element,
    Item: ItemBase as (props: useCheckboxGroup.ItemProps<T>) => JSX.Element,
    All: AllBase as (props: useCheckboxGroup.AllProps) => JSX.Element,
  };
}

export namespace useCheckboxGroup {
  export type GroupProps<T> = Omit<ComponentProps<'div'>, 'onChange'> & {
    value?: T[];
    defaultValue?: T[];
    onChange?: (value: T[]) => void;
  };

  export type ItemProps<T> = Omit<
    Checkbox.Props,
    'checked' | 'defaultChecked' | 'onChange' | 'indeterminate' | 'value'
  > & { value: T };

  export type AllProps = Omit<
    Checkbox.Props,
    'checked' | 'defaultChecked' | 'onChange' | 'indeterminate'
  >;
}
