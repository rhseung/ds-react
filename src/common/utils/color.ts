import { hex2oklch, oklch2hex, readableColor } from 'colorizr';

import type { Theme } from '@/common/stores';

type AccentCSSVars = {
  '--ids-primary': string;
  '--ids-primary-contrast': string;
  '--ids-primary-weak': string;
  '--ids-on-primary': string;
  '--ids-on-primary-contrast': string;
  '--ids-on-primary-weak': string;
};

export function generateAccentVars(hex: string, theme: Theme): AccentCSSVars {
  const { c, h } = hex2oklch(hex);

  const [primaryL, contrastL, contrastC, weakL, weakC, onWeakL] =
    theme === 'light'
      ? [0.6, 0.2, c * 0.4, 0.95, c * 0.25, 0.32]
      : [0.65, 0.92, c * 0.4, 0.25, c * 0.4, 0.8];

  const primary = oklch2hex({ l: primaryL, c, h });
  const primaryContrast = oklch2hex({ l: contrastL, c: contrastC, h });
  const primaryWeak = oklch2hex({ l: weakL, c: weakC, h });
  // c: 0 — chroma를 제거해 항상 sRGB gamut 안에 드는 회색을 만든다. 채도가 있는 hex를 넘기면 gamut clipping으로 L이 왜곡돼 WCAG 판단이 틀릴 수 있다.
  const onPrimary = readableColor(oklch2hex({ l: primaryL, c: 0, h }), { method: 'wcag' });
  const onPrimaryContrast = readableColor(oklch2hex({ l: contrastL, c: 0, h }), { method: 'wcag' });
  const onPrimaryWeak = oklch2hex({ l: onWeakL, c, h });

  return {
    '--ids-primary': primary,
    '--ids-primary-contrast': primaryContrast,
    '--ids-primary-weak': primaryWeak,
    '--ids-on-primary': onPrimary,
    '--ids-on-primary-contrast': onPrimaryContrast,
    '--ids-on-primary-weak': onPrimaryWeak,
  };
}
