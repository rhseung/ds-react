import { type ComponentProps } from 'react';

import { cn } from '@/common/utils';

/**
 * IDS State Mask — 원칙 6 (Brand-agnostic)
 *
 * hover / pressed 상태를 색상 토큰 없이 반투명 레이어로 처리합니다.
 * --ids-state-mask 는 opacity 값만 담으며, 색상(currentColor)은 오버레이 요소에서 분리합니다.
 *
 * ## Tailwind 방식
 * ```tsx
 * const button = tv({ base: [StateMask.trigger, 'rounded-lg ...'] })
 *
 * <button className={button(...)}>
 *   {children}
 *   <StateMask />
 * </button>
 * ```
 *
 * ## data-attribute 방식 (JS 상태 연동)
 * ```tsx
 * <button
 *   className="relative ..."
 *   data-hovered={isHovered || undefined}
 *   data-pressed={isPressed || undefined}
 * >
 *   {children}
 *   <StateMask />
 * </button>
 * ```
 */
export function StateMask({ className, ...props }: StateMask.Props) {
  return (
    <span
      aria-hidden
      className={cn(
        'pointer-events-none absolute inset-0 rounded-[inherit] bg-current opacity-(--ids-state-mask) transition-opacity',
        className,
      )}
      {...props}
    />
  );
}

export namespace StateMask {
  export type Props = Omit<ComponentProps<'span'>, 'aria-hidden'>;

  /**
   * 부모 인터랙티브 요소에 추가할 Tailwind 클래스.
   * CSS :hover / :active 로 --ids-state-mask 를 자동 전환합니다.
   * 다크 모드는 CSS 토큰 레벨에서 처리되므로 dark: 분기가 불필요합니다.
   *
   * @example
   * ```tsx
   * // tv base 배열에 포함
   * const card = tv({ base: [StateMask.trigger, 'rounded-xl p-4'] })
   *
   * // 또는 cn 으로 합성
   * <div className={cn(StateMask.trigger, 'rounded-xl p-4')}>
   * ```
   */
  export const trigger = cn(
    'relative',
    'enabled:hover:[--ids-state-mask:var(--ids-state-mask-hovered)]',
    'enabled:active:[--ids-state-mask:var(--ids-state-mask-pressed)]',
  );
}
