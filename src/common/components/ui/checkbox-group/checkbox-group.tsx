import { type JSX } from 'react';

import { CheckboxGroupAll } from './checkbox-group.all';
import { CheckboxGroupGroup } from './checkbox-group.group';
import { CheckboxGroupItem } from './checkbox-group.item';

export function useCheckboxGroup<T>() {
  return {
    Group: CheckboxGroupGroup as (props: useCheckboxGroup.Group.Props<T>) => JSX.Element,
    Item: CheckboxGroupItem as (props: useCheckboxGroup.Item.Props<T>) => JSX.Element,
    All: CheckboxGroupAll as (props: useCheckboxGroup.All.Props) => JSX.Element,
  };
}

export namespace useCheckboxGroup {
  export namespace Group {
    export type Props<T> = CheckboxGroupGroup.Props<T>;
  }
  export namespace Item {
    export type Props<T> = CheckboxGroupItem.Props<T>;
  }
  export namespace All {
    export type Props = CheckboxGroupAll.Props;
  }
}
