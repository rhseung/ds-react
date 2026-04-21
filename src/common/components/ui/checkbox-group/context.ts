import { createContext } from 'react';

import { type CheckboxGroupState } from './use-checkbox-group';

export type CheckboxGroupCtxValue = CheckboxGroupState<unknown>;

export const CheckboxGroupCtx = createContext<CheckboxGroupCtxValue | null>(null);
