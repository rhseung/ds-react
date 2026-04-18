import { useEffect, useRef, useState } from 'react';

import { Avatar, Badge, Button, Spinner } from '@/common/components/ui';
import { ThemeProvider } from '@/common/components/utils';
import type { Theme } from '@/common/stores';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta = {
  title: 'Common/ThemeProvider',
};
export default meta;

// ─── Token Swatch ────────────────────────────────────────────────────────────

function TokenSwatch({ cssVar, label, textVar }: { cssVar: string; label: string; textVar: string }) {
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
  render: ({ outerAccent, outerTheme, innerAccent, innerTheme, innermostAccent, innermostTheme }) => (
    <div className="flex flex-col gap-6 p-6">
      <ThemeProvider
        accent={outerAccent}
        theme={outerTheme}
        className="border-primary bg-neutral-bg flex flex-col gap-3 rounded-xl border p-5"
      >
        <p className="text-neutral-text-weak text-xs font-semibold">outer</p>
        <div className="flex gap-3">
          <Button variant="solid" tone="default">Outer</Button>
          <TokenSwatch cssVar="--ids-primary" label="primary" textVar="--ids-on-primary" />
        </div>
        <ThemeProvider
          accent={innerAccent}
          theme={innerTheme}
          className="border-primary bg-neutral-bg flex flex-col gap-3 rounded-xl border p-5"
        >
          <p className="text-neutral-text-weak text-xs font-semibold">inner</p>
          <div className="flex gap-3">
            <Button variant="solid" tone="default">Inner</Button>
            <TokenSwatch cssVar="--ids-primary" label="primary" textVar="--ids-on-primary" />
          </div>
          <ThemeProvider
            accent={innermostAccent}
            theme={innermostTheme}
            className="border-primary bg-neutral-bg flex flex-col gap-3 rounded-xl border p-5"
          >
            <p className="text-neutral-text-weak text-xs font-semibold">innermost</p>
            <div className="flex gap-3">
              <Button variant="solid" tone="default">Innermost</Button>
              <TokenSwatch cssVar="--ids-primary" label="primary" textVar="--ids-on-primary" />
            </div>
          </ThemeProvider>
        </ThemeProvider>
      </ThemeProvider>
    </div>
  ),
};

export const Palette: StoryObj = {
  render: () => (
    <div className="flex flex-col gap-10 p-8">

      {/* Color swatches — all 9 at once */}
      <div className="flex gap-2">
        {COLORS.map((color) =>
          TONES.map((tone) => (
            <TokenSwatch
              key={`${color}-${tone}`}
              cssVar={tone === 'default' ? `--ids-${color}` : `--ids-${color}-${tone}`}
              textVar={tone === 'default' ? `--ids-on-${color}` : `--ids-on-${color}-${tone}`}
              label={tone === 'default' ? color : `${color} ${tone}`}
            />
          ))
        )}
      </div>

      {/* Components — one row per color, all tones/variants mixed */}
      {COLORS.map((color) => (
        <div key={color} className="flex flex-col gap-3">
          <p className="text-neutral-text-weak text-xs font-semibold uppercase tracking-widest">{color}</p>

          {/* Buttons — all variants × all tones */}
          <div className="flex flex-wrap items-center gap-2">
            {(['solid', 'solid-elevated', 'outline', 'ghost'] as const).map((variant) =>
              TONES.map((tone) => (
                <Button key={`${variant}-${tone}`} variant={variant} color={color} tone={tone}>
                  {variant}
                </Button>
              ))
            )}
          </div>

          {/* Badges + Avatars + Spinners — all together */}
          <div className="flex flex-wrap items-center gap-3">
            {(['solid', 'outline', 'ghost'] as const).map((variant) =>
              TONES.map((tone) => (
                <Badge key={`${variant}-${tone}`} variant={variant} color={color} tone={tone}>
                  {tone}
                </Badge>
              ))
            )}
            {(['sm', 'md', 'lg', 'xl'] as const).map((size) =>
              TONES.map((tone) => (
                <Avatar key={`${size}-${tone}`} name="Hong Gildong" size={size} color={color} tone={tone} />
              ))
            )}
            {(['sm', 'md', 'lg'] as const).map((size) =>
              TONES.map((tone) => (
                <Spinner key={`${size}-${tone}`} size={size} color={color} tone={tone} />
              ))
            )}
          </div>
        </div>
      ))}
    </div>
  ),
};
