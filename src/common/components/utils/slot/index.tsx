import {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  type HTMLAttributes,
  type PropsWithChildren,
  type ReactNode,
} from 'react';

import { type RenderProp, mergeChildren, mergeProps, mergeRefs } from '@/common/utils';

export type SlotProps<S = void> = [S] extends [void]
  ? { asChild?: boolean; children?: ReactNode }
  : { asChild?: boolean; children?: RenderProp<S, ReactNode> };

export const Slot = forwardRef<HTMLElement, PropsWithChildren<HTMLAttributes<HTMLElement>>>(
  ({ children, ...props }, ref) => {
    const childArray = Children.toArray(children);
    const [rootElement, ...siblings] = childArray;

    if (!isValidElement<{ children?: ReactNode }>(rootElement)) {
      throw new Error(`Slot's first child must be a valid React element, but got: ${rootElement}`);
    }

    const merged = mergeProps(rootElement.props, props);
    const mergedRef = mergeRefs(merged.ref, ref);

    return cloneElement(rootElement, {
      ...merged,
      ref: mergedRef,
      children: mergeChildren(rootElement.props.children, ...siblings),
    });
  },
);

Slot.displayName = 'Slot';
