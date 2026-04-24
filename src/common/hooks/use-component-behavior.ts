import type { SyntheticEvent } from 'react';

import { mergeEventHandlers } from '@/common/utils';

import {
  INTERACTION_HANDLER_KEYS,
  interactionDataProps,
  type InteractionHandlers,
  type InteractionState,
  type UseInteractionOptions,
} from './use-interaction';

export type GroupStore<D extends object> = {
  get<T = D>(selector?: (state: D) => T): T;
  set(partial: Partial<D> | ((prev: D) => Partial<D>)): void;
};

export type GroupStoreState<S extends GroupStore<object>> = Parameters<
  NonNullable<Parameters<S['get']>[0]>
>[0];

export type Store<D extends object> = {
  handlers: InteractionHandlers;
  get<T = InteractionState & D>(selector?: (state: InteractionState & D) => T): T;
  set(
    partial:
      | Partial<D & { disabled: boolean }>
      | ((prev: InteractionState & D) => Partial<D & { disabled: boolean }>),
  ): void;
};

export type StoreState<S extends Store<object>> = Parameters<
  NonNullable<Parameters<S['get']>[0]>
>[0];

type AnyHandler = (e: SyntheticEvent) => void;

function mergeHandlers<E extends Element>(
  storeHandlers: InteractionHandlers,
  extraHandlers: UseInteractionOptions<E>,
): UseInteractionOptions<E> {
  return Object.fromEntries(
    INTERACTION_HANDLER_KEYS.map((key) => [
      key,
      mergeEventHandlers(storeHandlers[key] as AnyHandler, extraHandlers[key] as AnyHandler),
    ]),
  ) as UseInteractionOptions<E>;
}

export function useComponentBehavior<D extends object, E extends Element = Element>(
  internalStore: Store<D>,
  externalStore: Store<D> | undefined,
  eventHandlers: UseInteractionOptions<E> = {},
) {
  const store = externalStore ?? internalStore;
  const state = store.get();
  const handlers = mergeHandlers<E>(store.handlers, eventHandlers);

  return {
    state,
    store,
    handlers,
    dataProps: interactionDataProps(state),
  };
}
