import { type ComponentProps } from 'react';

import type { Theme } from '@/common/stores';
import { generateAccentVars } from '@/common/utils';

export function ThemeProvider({
  accent,
  theme = 'light',
  children,
  style,
  ...props
}: ThemeProvider.Props) {
  const accentVars = generateAccentVars(accent, theme);

  return (
    <div data-theme={theme} style={{ ...accentVars, ...style }} {...props}>
      {children}
    </div>
  );
}

export namespace ThemeProvider {
  export interface Props extends Omit<ComponentProps<'div'>, 'data-theme'> {
    accent: string;
    theme?: Theme;
  }
}
