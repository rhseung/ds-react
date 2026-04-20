import { Children, Fragment, type ReactNode, isValidElement } from 'react';

export function containsType(node: ReactNode, type: React.ComponentType): boolean {
  return Children.toArray(node).some((child) => {
    if (!isValidElement(child)) return false;
    if (child.type === type) return true;
    if (child.type === Fragment)
      return containsType((child.props as { children?: ReactNode }).children, type);
    return false;
  });
}
