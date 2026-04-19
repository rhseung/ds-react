import { useState } from 'react';
import type { FocusEvent, KeyboardEvent, PointerEvent } from 'react';

import { kebabCase, mapKeys, pickBy } from 'es-toolkit';

export type InteractionState = {
  hovered: boolean;
  active: boolean; // being physically pressed right now
  focused: boolean;
  focusVisible: boolean; // focus triggered by keyboard
  disabled: boolean;
};

export type UseInteractionOptions<T extends Element = Element> = {
  disabled?: boolean;
  onPointerEnter?: (e: PointerEvent<T>) => void;
  onPointerLeave?: (e: PointerEvent<T>) => void;
  onPointerDown?: (e: PointerEvent<T>) => void;
  onPointerUp?: (e: PointerEvent<T>) => void;
  onPointerCancel?: (e: PointerEvent<T>) => void;
  onFocus?: (e: FocusEvent<T>) => void;
  onBlur?: (e: FocusEvent<T>) => void;
  onKeyDown?: (e: KeyboardEvent<T>) => void;
  onKeyUp?: (e: KeyboardEvent<T>) => void;
};

export function useInteraction<T extends Element = Element>({
  disabled,
  onPointerEnter,
  onPointerLeave,
  onPointerDown,
  onPointerUp,
  onPointerCancel,
  onFocus,
  onBlur,
  onKeyDown,
  onKeyUp,
}: UseInteractionOptions<T> = {}) {
  const [state, setState] = useState<Omit<InteractionState, 'disabled'>>({
    hovered: false,
    active: false,
    focused: false,
    focusVisible: false,
  });

  const handlers = {
    onPointerEnter(e: PointerEvent<T>) {
      if (!disabled && e.pointerType === 'mouse') setState((s) => ({ ...s, hovered: true }));
      onPointerEnter?.(e);
    },
    onPointerLeave(e: PointerEvent<T>) {
      if (e.pointerType === 'mouse') setState((s) => ({ ...s, hovered: false, active: false }));
      onPointerLeave?.(e);
    },
    onPointerDown(e: PointerEvent<T>) {
      if (!disabled) setState((s) => ({ ...s, active: true }));
      onPointerDown?.(e);
    },
    onPointerUp(e: PointerEvent<T>) {
      setState((s) => ({ ...s, active: false }));
      onPointerUp?.(e);
    },
    onPointerCancel(e: PointerEvent<T>) {
      setState((s) => ({ ...s, active: false, hovered: false }));
      onPointerCancel?.(e);
    },
    onFocus(e: FocusEvent<T>) {
      if (!disabled) {
        const focusVisible = e.currentTarget.matches(':focus-visible');
        setState((s) => ({ ...s, focused: true, focusVisible }));
      }
      onFocus?.(e);
    },
    onBlur(e: FocusEvent<T>) {
      setState((s) => ({ ...s, focused: false, focusVisible: false }));
      onBlur?.(e);
    },
    onKeyDown(e: KeyboardEvent<T>) {
      if (!disabled && (e.key === 'Enter' || e.key === ' '))
        setState((s) => ({ ...s, active: true }));
      onKeyDown?.(e);
    },
    onKeyUp(e: KeyboardEvent<T>) {
      if (e.key === 'Enter' || e.key === ' ') setState((s) => ({ ...s, active: false }));
      onKeyUp?.(e);
    },
  };

  return { state: { ...state, disabled: disabled ?? false }, handlers };
}

export function interactionDataProps(state: Record<string, boolean>) {
  return mapKeys(pickBy(state, Boolean), (_, k) => `data-${kebabCase(k)}`);
}
