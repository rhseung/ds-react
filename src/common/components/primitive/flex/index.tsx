import { useResponsiveValue, type ResponsiveValue } from '@/common/hooks';
import { cn } from '@/common/utils';

import { Box } from '../box';

type FlexProps = Box.Props & { gap?: ResponsiveValue<number> };

function useGap(gap: FlexProps['gap']) {
  const token = useResponsiveValue(gap) ?? 0;
  return `calc(var(--spacing) * ${token})`;
}

export namespace Flex {
  export function Row({ gap, className, style, children, ...props }: Row.Props) {
    return (
      <Box
        className={cn('flex flex-row', className)}
        style={{ gap: useGap(gap), ...style }}
        {...props}
      >
        {children}
      </Box>
    );
  }

  export namespace Row {
    export type Props = FlexProps;
  }

  export function Column({ gap, className, style, children, ...props }: Column.Props) {
    return (
      <Box
        className={cn('flex flex-col', className)}
        style={{ gap: useGap(gap), ...style }}
        {...props}
      >
        {children}
      </Box>
    );
  }

  export namespace Column {
    export type Props = FlexProps;
  }

  export function Spacer({ className, ...props }: Spacer.Props) {
    return <Box className={cn('flex-1', className)} {...props} />;
  }

  export namespace Spacer {
    export type Props = Box.Props;
  }
}
