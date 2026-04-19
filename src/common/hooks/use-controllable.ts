import { useState } from 'react';

import { isFunction, isNil, isNotNil } from 'es-toolkit';

/**
 * 제어/비제어 상태를 통합 관리하는 훅.
 *
 * `value`가 전달되면 제어 모드로 동작하고, `undefined`이면 `defaultValue`로 초기화된 내부 상태를 사용한다.
 * 반환된 `setValue`는 `useState`의 setter와 동일하게 직접 값 또는 함수형 업데이트를 모두 지원한다.
 *
 * @param value - 외부에서 주입하는 제어 값. `undefined`이면 비제어 모드.
 * @param defaultValue - 비제어 모드의 초기값.
 * @param onChange - 값이 변경될 때 호출되는 콜백. 제어·비제어 모드 모두에서 호출된다.
 * @returns `[resolvedValue, setValue]`
 *
 * @example
 * // 제어/비제어 둘 다 지원하는 Toggle 훅
 * const [toggled, setToggled] = useControllable(pressed, defaultPressed, onPressedChange);
 * setToggled((prev) => !prev);
 */
export function useControllable<T>(
  value: T | undefined,
  defaultValue: T,
  onChange?: (value: T) => void,
): [T, (next: T | ((prev: T) => T)) => void] {
  const [internalValue, setInternalValue] = useState<T>(defaultValue);
  const resolvedValue = isNotNil(value) ? value : internalValue;

  function setValue(next: T | ((prev: T) => T)) {
    const nextValue = isFunction(next) ? next(resolvedValue) : next;
    if (isNil(value)) setInternalValue(nextValue);
    onChange?.(nextValue);
  }

  return [resolvedValue, setValue];
}
