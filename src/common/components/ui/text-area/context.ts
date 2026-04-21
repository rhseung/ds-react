import { type ComponentProps, createContext } from 'react';

export type InputContextValue = Omit<
  ComponentProps<'textarea'>,
  'className' | 'style' | 'children'
> & {
  autoResize?: boolean;
};

export const InputContext = createContext<InputContextValue>({});
