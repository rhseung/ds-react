import { useResponsiveValue, type ResponsiveValue } from '@/common/hooks';
import { cn } from '@/common/utils';

import { Box } from '../box';

type StackProps = Box.Props & { gap?: ResponsiveValue<number> };

function useGap(gap: StackProps['gap']) {
  const token = useResponsiveValue(gap) ?? 0;
  return `calc(var(--spacing) * ${token})`;
}

export function HStack({ gap, className, style, children, ...props }: HStack.Props) {
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

export namespace HStack {
  export type Props = StackProps;
}

export function VStack({ gap, className, style, children, ...props }: VStack.Props) {
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

export namespace VStack {
  export type Props = StackProps;
}

export function Spacer({ className, ...props }: Spacer.Props) {
  return <Box className={cn('flex-1', className)} {...props} />;
}

export namespace Spacer {
  export type Props = Box.Props;
}
