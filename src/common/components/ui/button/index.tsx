import { type ComponentProps } from 'react';

import { type VariantProps } from 'tailwind-variants';

import { Slot, StateMask } from '@/common/components/utils';
import { tv } from '@/common/utils';

const button = tv({
  base: [
    StateMask.trigger,
    'cursor-pointer rounded-lg px-5 py-2.5 text-sm font-semibold transition-all',
    // Disabled — IDS 토큰: 모든 variant 공통
    'disabled:cursor-not-allowed disabled:border-transparent disabled:bg-neutral-bg-disabled disabled:text-neutral-text-disabled',
  ],
  variants: {
    variant: {
      solid: 'bg-primary text-on-primary',
      soft: 'bg-primary-weak text-on-primary-weak',
      outline: 'border border-primary bg-transparent text-primary',
      ghost: 'bg-transparent text-primary',
    },
    elevated: {
      true: '',
    },
  },
  compoundVariants: [
    // solid/soft — 배경색이 있어 상단 inset 하이라이트 + 하단 그림자 모두 적용
    {
      variant: 'solid',
      elevated: true,
      class: 'shadow-bevel enabled:active:translate-y-px enabled:active:shadow-bevel-active',
    },
    {
      variant: 'soft',
      elevated: true,
      class: 'shadow-bevel enabled:active:translate-y-px enabled:active:shadow-bevel-active',
    },
    // outline/ghost — 배경 투명, translate만 적용
    {
      variant: 'outline',
      elevated: true,
      class: 'enabled:active:translate-y-px',
    },
    {
      variant: 'ghost',
      elevated: true,
      class: 'enabled:active:translate-y-px',
    },
  ],
  defaultVariants: {
    variant: 'solid',
  },
});

export function Button({
  asChild,
  variant,
  elevated,
  className,
  children,
  ...props
}: Button.Props) {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp className={button({ variant, elevated, className })} {...props}>
      {children}
      <StateMask />
    </Comp>
  );
}

export namespace Button {
  export type Props = ComponentProps<'button'> &
    VariantProps<typeof button> & { asChild?: boolean };
}
