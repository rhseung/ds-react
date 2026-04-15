import { type ComponentProps } from 'react';

import { textVariants } from './text';

export function Label({ required, className, children, ...props }: Label.Props) {
  return (
    <label className={textVariants({ size: 'sm', weight: 'medium', className })} {...props}>
      {children}
      {required && (
        <span aria-hidden="true" className="text-danger ml-0.5">
          *
        </span>
      )}
    </label>
  );
}

export namespace Label {
  export type Props = ComponentProps<'label'> & { required?: boolean };
}
