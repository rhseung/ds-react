import type {
  SyntheticEvent,
  RefCallback,
  RefObject,
  ComponentPropsWithRef,
  ElementType,
} from 'react';

import { union } from 'es-toolkit';

import { cn } from './cn';

export function mergeEventHandlers<E extends SyntheticEvent>(
  handler1: ((event: E) => void) | undefined,
  handler2: ((event: E) => void) | undefined,
) {
  return (event: E) => {
    handler1?.(event);
    if (event.defaultPrevented) return;
    handler2?.(event);
  };
}

export function mergeRefs<T>(
  ...refs: (RefObject<T> | RefCallback<T> | null | undefined)[]
): RefCallback<T> {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(value);
      } else if (ref) {
        ref.current = value as T;
      }
    });
  };
}

function mergeObject<A extends object | undefined, B extends object | undefined>(a: A, b: B) {
  if (a && !b) return a;
  else if (!a && b) return b;
  else if (a || b) return { ...a, ...b };
  else return undefined;
}

export function mergeObjects(...objects: (object | undefined)[]): object | undefined {
  return objects.reduce((acc, obj) => mergeObject(acc, obj), undefined);
}

const isEventHandler = (key: string, baseValue: unknown, nextValue: unknown) =>
  key.startsWith('on') && (typeof baseValue === 'function' || typeof nextValue === 'function');

export function mergeProps<T extends ElementType>(
  baseProps: ComponentPropsWithRef<T>,
  nextProps: ComponentPropsWithRef<T>,
): ComponentPropsWithRef<T> {
  const mergedProps = {} as ComponentPropsWithRef<T>;
  const allKeys = union(Object.keys(baseProps), Object.keys(nextProps));
  if ('ref' in baseProps || 'ref' in nextProps) allKeys.push('ref');
  const keys = allKeys as (keyof ComponentPropsWithRef<T>)[];

  for (const key of keys) {
    if (key === 'className') {
      mergedProps.className = cn(baseProps.className, nextProps.className);
    } else if (key === 'style') {
      mergedProps.style = mergeObjects(
        baseProps.style as object | undefined,
        nextProps.style as object | undefined,
      );
    } else if (key === 'ref') {
      mergedProps.ref = mergeRefs(baseProps.ref, nextProps.ref);
    } else if (typeof key === 'string' && isEventHandler(key, baseProps[key], nextProps[key])) {
      mergedProps[key] = mergeEventHandlers(baseProps[key], nextProps[key]);
    } else {
      mergedProps[key] = nextProps[key] ?? baseProps[key];
    }
  }

  return mergedProps;
}
