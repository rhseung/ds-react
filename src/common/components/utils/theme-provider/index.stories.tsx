import { useEffect, useRef, useState } from 'react';

import { Button } from '@/common/components/ui';
import { ThemeProvider } from '@/common/components/utils';
import type { Theme } from '@/common/stores';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta = {
  title: 'Utils/ThemeProvider',
};
export default meta;

// ─── Token Swatch ────────────────────────────────────────────────────────────

function TokenSwatch({
  cssVar,
  label,
  textVar,
}: {
  cssVar: string;
  label: string;
  textVar: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [color, setColor] = useState('');

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (ref.current) {
      setColor(getComputedStyle(ref.current).getPropertyValue(cssVar).trim());
    }
  });

  return (
    <div
      ref={ref}
      style={{ backgroundColor: `var(${cssVar})`, color: `var(${textVar})` }}
      className="flex min-h-20 flex-1 flex-col justify-end rounded-xl p-3"
    >
      <span className="font-mono text-xs font-semibold">{label}</span>
      <span className="font-mono text-xs opacity-60">{color}</span>
    </div>
  );
}

// ─── Story ───────────────────────────────────────────────────────────────────

const COLORS = ['primary', 'secondary', 'tertiary'] as const;
const TONES = ['default', 'weak', 'contrast'] as const;

export const Nested: StoryObj<{
  outerAccent: string;
  outerTheme: Theme;
  innerAccent: string;
  innerTheme: Theme;
  innermostAccent: string;
  innermostTheme: Theme;
}> = {
  args: {
    outerAccent: '#2563EB',
    outerTheme: 'light',
    innerAccent: '#7C3AED',
    innerTheme: 'light',
    innermostAccent: '#059669',
    innermostTheme: 'light',
  },
  argTypes: {
    outerAccent: { control: 'color' },
    outerTheme: { control: 'radio', options: ['light', 'dark'] },
    innerAccent: { control: 'color' },
    innerTheme: { control: 'radio', options: ['light', 'dark'] },
    innermostAccent: { control: 'color' },
    innermostTheme: { control: 'radio', options: ['light', 'dark'] },
  },
  render: ({
    outerAccent,
    outerTheme,
    innerAccent,
    innerTheme,
    innermostAccent,
    innermostTheme,
  }) => (
    <div className="flex flex-col gap-6 p-6">
      <ThemeProvider
        accent={outerAccent}
        theme={outerTheme}
        className="border-primary bg-neutral-bg flex flex-col gap-3 rounded-xl border p-5"
      >
        <p className="text-neutral-text-weak text-xs font-semibold">outer</p>
        <div className="flex gap-3">
          <Button variant="solid" tone="default">
            Outer
          </Button>
          <TokenSwatch cssVar="--ids-primary" label="primary" textVar="--ids-on-primary" />
        </div>
        <ThemeProvider
          accent={innerAccent}
          theme={innerTheme}
          className="border-primary bg-neutral-bg flex flex-col gap-3 rounded-xl border p-5"
        >
          <p className="text-neutral-text-weak text-xs font-semibold">inner</p>
          <div className="flex gap-3">
            <Button variant="solid" tone="default">
              Inner
            </Button>
            <TokenSwatch cssVar="--ids-primary" label="primary" textVar="--ids-on-primary" />
          </div>
          <ThemeProvider
            accent={innermostAccent}
            theme={innermostTheme}
            className="border-primary bg-neutral-bg flex flex-col gap-3 rounded-xl border p-5"
          >
            <p className="text-neutral-text-weak text-xs font-semibold">innermost</p>
            <div className="flex gap-3">
              <Button variant="solid" tone="default">
                Innermost
              </Button>
              <TokenSwatch cssVar="--ids-primary" label="primary" textVar="--ids-on-primary" />
            </div>
          </ThemeProvider>
        </ThemeProvider>
      </ThemeProvider>
    </div>
  ),
};

const SWATCH_GROUPS: {
  cssVar: string;
  textVar: string;
  label: string;
}[][] = COLORS.map((color) => [
  { cssVar: `--ids-${color}`, textVar: `--ids-on-${color}`, label: color },
  { cssVar: `--ids-${color}-weak`, textVar: `--ids-on-${color}-weak`, label: `${color} weak` },
  {
    cssVar: `--ids-${color}-contrast`,
    textVar: `--ids-on-${color}-contrast`,
    label: `${color} contrast`,
  },
  { cssVar: `--ids-on-${color}`, textVar: `--ids-${color}`, label: `on ${color}` },
  {
    cssVar: `--ids-on-${color}-weak`,
    textVar: `--ids-${color}-weak`,
    label: `on ${color} weak`,
  },
  {
    cssVar: `--ids-on-${color}-contrast`,
    textVar: `--ids-${color}-contrast`,
    label: `on ${color} contrast`,
  },
]);

export const Palette: StoryObj = {
  render: () => (
    <div className="flex flex-col gap-6 p-8">
      {SWATCH_GROUPS.map((group) => (
        <div key={group[0].label} className="flex gap-2">
          {group.map((swatch) => (
            <TokenSwatch
              key={swatch.label}
              cssVar={swatch.cssVar}
              textVar={swatch.textVar}
              label={swatch.label}
            />
          ))}
        </div>
      ))}
    </div>
  ),
};
