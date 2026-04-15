import { type ComponentProps } from 'react';

export function ThemeProvider({ accent, mode, children, ...props }: ThemeProvider.Props) {
  return (
    <div data-accent={accent} data-theme={mode} {...props}>
      {children}
    </div>
  );
}

export namespace ThemeProvider {
  export const accents = ['blue', 'violet', 'emerald', 'rose', 'orange'] as const;
  export type Accent = (typeof accents)[number];
  export type Mode = 'light' | 'dark';

  export interface Props extends Omit<ComponentProps<'div'>, 'data-accent' | 'data-theme'> {
    accent: Accent;
    mode?: Mode;
  }
}
