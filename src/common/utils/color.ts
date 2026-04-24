import { hex2oklch, oklch2hex, readableColor } from 'colorizr';

import type { Theme } from '@/common/stores';

export type Color = 'primary' | 'secondary' | 'tertiary';
export type Tone = 'default' | 'weak' | 'contrast';

export interface AccentProps {
  color?: Color;
  tone?: Tone;
}

type CSSShade = '' | `-${Exclude<Tone, 'default'>}`;
type AccentCSSVars = {
  [K in
    | `--ids-${Color}${CSSShade}`
    | `--ids-on-${Color}${CSSShade}`
    | `--ids-accent${CSSShade}`
    | `--ids-on-accent${CSSShade}`]: string;
};

export function colorVars(color: Color | undefined): Record<string, string> | undefined {
  if (!color) return undefined;
  return {
    '--ids-accent': `var(--ids-${color})`,
    '--ids-accent-contrast': `var(--ids-${color}-contrast)`,
    '--ids-accent-weak': `var(--ids-${color}-weak)`,
    '--ids-on-accent': `var(--ids-on-${color})`,
    '--ids-on-accent-contrast': `var(--ids-on-${color}-contrast)`,
    '--ids-on-accent-weak': `var(--ids-on-${color}-weak)`,
  };
}

function makePalette(c: number, h: number, theme: Theme) {
  const [mainL, contrastL, contrastC, weakL, weakC, onWeakL] =
    theme === 'light'
      ? [0.6, 0.2, c * 0.4, 0.95, c * 0.25, 0.32]
      : [0.65, 0.92, c * 0.4, 0.25, c * 0.4, 0.8];

  // c: 0 — chroma를 제거해 항상 sRGB gamut 안에 드는 회색을 만든다. 채도가 있는 hex를 넘기면 gamut clipping으로 L이 왜곡돼 WCAG 판단이 틀릴 수 있다.
  return {
    main: oklch2hex({ l: mainL, c, h }),
    contrast: oklch2hex({ l: contrastL, c: contrastC, h }),
    weak: oklch2hex({ l: weakL, c: weakC, h }),
    onMain: readableColor(oklch2hex({ l: mainL, c: 0, h }), { method: 'wcag' }),
    onContrast: readableColor(oklch2hex({ l: contrastL, c: 0, h }), { method: 'wcag' }),
    onWeak: oklch2hex({ l: onWeakL, c, h }),
  };
}

export function generateAccentVars(hex: string, theme: Theme): AccentCSSVars {
  const { c, h } = hex2oklch(hex);

  // secondary: same hue, reduced chroma (~40%) — desaturated companion
  // tertiary: hue shifted +60°, same chroma — analogous accent
  const p = makePalette(c, h, theme);
  const s = makePalette(c * 0.4, h, theme);
  const t = makePalette(c, (h + 60) % 360, theme);

  // default accent is primary
  return {
    '--ids-accent': p.main,
    '--ids-accent-contrast': p.contrast,
    '--ids-accent-weak': p.weak,
    '--ids-on-accent': p.onMain,
    '--ids-on-accent-contrast': p.onContrast,
    '--ids-on-accent-weak': p.onWeak,

    '--ids-primary': p.main,
    '--ids-primary-contrast': p.contrast,
    '--ids-primary-weak': p.weak,
    '--ids-on-primary': p.onMain,
    '--ids-on-primary-contrast': p.onContrast,
    '--ids-on-primary-weak': p.onWeak,
    '--ids-secondary': s.main,
    '--ids-secondary-contrast': s.contrast,
    '--ids-secondary-weak': s.weak,
    '--ids-on-secondary': s.onMain,
    '--ids-on-secondary-contrast': s.onContrast,
    '--ids-on-secondary-weak': s.onWeak,
    '--ids-tertiary': t.main,
    '--ids-tertiary-contrast': t.contrast,
    '--ids-tertiary-weak': t.weak,
    '--ids-on-tertiary': t.onMain,
    '--ids-on-tertiary-contrast': t.onContrast,
    '--ids-on-tertiary-weak': t.onWeak,
  };
}
