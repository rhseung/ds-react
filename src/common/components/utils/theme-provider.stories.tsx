import { useEffect, useRef, useState } from 'react';

import { Badge, Button, Spinner } from '@/common/components/ui';
import { ThemeProvider } from '@/common/components/utils';
import type { Theme } from '@/common/stores';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta = {
  title: 'Common/ThemeProvider',
};
export default meta;

// ─── Token Swatch ────────────────────────────────────────────────────────────

const TOKENS = [
  { name: '--ids-primary', label: 'primary', textVar: '--ids-on-primary' },
  { name: '--ids-primary-weak', label: 'primary-weak', textVar: '--ids-on-primary-weak' },
  {
    name: '--ids-primary-contrast',
    label: 'primary-contrast',
    textVar: '--ids-on-primary-contrast',
  },
] as const;

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
      className="flex flex-col justify-end rounded-lg p-3"
    >
      <span className="font-mono text-xs font-semibold">{label}</span>
      <span className="font-mono text-xs opacity-70">{color}</span>
    </div>
  );
}

// ─── Story ───────────────────────────────────────────────────────────────────

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
          <Button variant="solid">Outer</Button>
          <TokenSwatch cssVar="--ids-primary" label="primary" textVar="--ids-on-primary" />
        </div>

        <ThemeProvider
          accent={innerAccent}
          theme={innerTheme}
          className="border-primary bg-neutral-bg flex flex-col gap-3 rounded-xl border p-5"
        >
          <p className="text-neutral-text-weak text-xs font-semibold">inner</p>
          <div className="flex gap-3">
            <Button variant="solid">Inner</Button>
            <TokenSwatch cssVar="--ids-primary" label="primary" textVar="--ids-on-primary" />
          </div>

          <ThemeProvider
            accent={innermostAccent}
            theme={innermostTheme}
            className="border-primary bg-neutral-bg flex flex-col gap-3 rounded-xl border p-5"
          >
            <p className="text-neutral-text-weak text-xs font-semibold">innermost</p>
            <div className="flex gap-3">
              <Button variant="solid">Innermost</Button>
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
    <div className="flex flex-col gap-10 p-6">
      {/* Color tokens */}
      <section className="flex flex-col gap-3">
        <h2 className="text-neutral-text-weak text-sm font-semibold">Accent Tokens</h2>
        <div className="grid grid-cols-4 gap-3">
          {TOKENS.map(({ name, label, textVar }) => (
            <TokenSwatch key={name} cssVar={name} label={label} textVar={textVar} />
          ))}
        </div>
      </section>

      {/* Buttons */}
      <section className="flex flex-col gap-3">
        <h2 className="text-neutral-text-weak text-sm font-semibold">Button</h2>
        <div className="flex flex-wrap gap-3">
          <Button variant="solid">Solid</Button>
          <Button variant="solid-elevated">Solid Elevated</Button>
          <Button variant="soft">Soft</Button>
          <Button variant="soft-elevated">Soft Elevated</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="solid" contrast>
            Solid Contrast
          </Button>
          <Button variant="soft" contrast>
            Soft Contrast
          </Button>
          <Button variant="outline" contrast>
            Outline Contrast
          </Button>
          <Button variant="ghost" contrast>
            Ghost Contrast
          </Button>
        </div>
      </section>

      {/* Badges */}
      <section className="flex flex-col gap-3">
        <h2 className="text-neutral-text-weak text-sm font-semibold">Badge</h2>
        <div className="flex flex-wrap gap-3">
          <Badge variant="solid">Solid</Badge>
          <Badge variant="soft">Soft</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="ghost">Ghost</Badge>
        </div>
      </section>

      {/* Spinner */}
      <section className="flex flex-col gap-3">
        <h2 className="text-neutral-text-weak text-sm font-semibold">Spinner</h2>
        <div className="flex items-center gap-4">
          <Spinner size="sm" />
          <Spinner size="md" />
          <Spinner size="lg" />
        </div>
      </section>
    </div>
  ),
};
