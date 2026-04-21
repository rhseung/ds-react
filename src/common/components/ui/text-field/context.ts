import { type ComponentProps, createContext } from 'react';

export type InputContextValue = Omit<
  ComponentProps<'input'>,
  'size' | 'className' | 'style' | 'children'
>;

export const InputContext = createContext<InputContextValue>({});
