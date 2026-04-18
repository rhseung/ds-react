import { type ComponentProps } from 'react';

import { cn } from '@/common/utils';

/**
 * IDS State Mask — 원칙 6 (Brand-agnostic)
 *
 * hover / pressed 상태를 색상 토큰 없이 반투명 레이어로 처리합니다.
 * --ids-state-mask 는 opacity 값만 담으며, 색상(currentColor)은 오버레이 요소에서 분리합니다.
 *
 * 부모 요소에 `relative` 클래스만 추가하면 됩니다.
 * hover / active CSS 변수 전환은 motion.css의 :has() 셀렉터가 자동으로 처리합니다.
 *
 * @example
 * ```tsx
 * <button className="relative ...">
 *   {children}
 *   <StateMask />
 * </button>
 * ```
 */
export function StateMask({ className, ...props }: StateMask.Props) {
  return (
    <span
      aria-hidden
      data-ids-state-mask
      className={cn(
        'pointer-events-none absolute inset-0 rounded-[inherit] bg-current opacity-(--ids-state-mask) transition-opacity',
        className,
      )}
      {...props}
    />
  );
}

export namespace StateMask {
  export type Props = Omit<ComponentProps<'span'>, 'aria-hidden' | 'data-ids-state-mask'>;
}
