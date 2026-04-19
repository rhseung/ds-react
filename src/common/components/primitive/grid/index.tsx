import { isNotNil } from 'es-toolkit';

import { useResponsiveValue, type ResponsiveValue } from '@/common/hooks';
import { cn } from '@/common/utils';

import { Box } from '../box';

const spacing = (n: number | undefined) =>
  n != null && n !== 0 ? `calc(var(--spacing) * ${n})` : undefined;

const template = (n: number | undefined) =>
  n != null ? `repeat(${n}, minmax(0, 1fr))` : undefined;

export function Grid({
  cols,
  rows,
  gap,
  colGap,
  rowGap,
  className,
  style,
  children,
  ...props
}: Grid.Props) {
  const colsValue = useResponsiveValue(cols);
  const rowsValue = useResponsiveValue(rows);
  const gapValue = useResponsiveValue(gap);
  const colGapValue = useResponsiveValue(colGap);
  const rowGapValue = useResponsiveValue(rowGap);

  return (
    <Box
      className={cn('grid', className)}
      style={{
        ...(isNotNil(colsValue) && { gridTemplateColumns: template(colsValue) }),
        ...(isNotNil(rowsValue) && { gridTemplateRows: template(rowsValue) }),
        ...(isNotNil(gapValue) && { gap: spacing(gapValue) }),
        ...(isNotNil(colGapValue) && { columnGap: spacing(colGapValue) }),
        ...(isNotNil(rowGapValue) && { rowGap: spacing(rowGapValue) }),
        ...style,
      }}
      {...props}
    >
      {children}
    </Box>
  );
}

export namespace Grid {
  export type Props = Box.Props & {
    cols?: ResponsiveValue<number>;
    rows?: ResponsiveValue<number>;
    gap?: ResponsiveValue<number>;
    colGap?: ResponsiveValue<number>;
    rowGap?: ResponsiveValue<number>;
  };

  export function Item({
    colSpan,
    rowSpan,
    colStart,
    rowStart,
    className,
    style,
    children,
    ...props
  }: Item.Props) {
    return (
      <Box
        className={cn(className)}
        style={{
          ...(isNotNil(colSpan) && { gridColumn: `span ${colSpan} / span ${colSpan}` }),
          ...(isNotNil(rowSpan) && { gridRow: `span ${rowSpan} / span ${rowSpan}` }),
          ...(isNotNil(colStart) && { gridColumn: `${colStart}` }),
          ...(isNotNil(rowStart) && { gridRow: `${rowStart}` }),
          ...style,
        }}
        {...props}
      >
        {children}
      </Box>
    );
  }

  export namespace Item {
    export type Props = Box.Props & {
      colSpan?: number;
      rowSpan?: number;
      colStart?: number;
      rowStart?: number;
    };
  }
}
