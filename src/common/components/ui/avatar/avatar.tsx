import { type CSSProperties, type ComponentProps, type ReactNode, useState } from 'react';

import { take } from 'es-toolkit';

import {
  SizeContext,
  type StoreState,
  useComponentBehavior,
  useComponentSize,
  type ComponentSize,
} from '@/common/hooks';
import {
  type AccentProps,
  type RenderProp,
  colorVars,
  mergeObjects,
  resolveRenderProp,
} from '@/common/utils';

import { AvatarFallback } from './avatar.fallback';
import { AvatarImage } from './avatar.image';
import { AvatarContext } from './context';
import { avatar } from './styles';
import { useAvatar, type AvatarStore } from './use-avatar';

export function Avatar({
  src,
  name,
  alt,
  size: localSize,
  tone = 'default',
  color,
  className,
  style,
  children,
  store,
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
  ...props
}: Avatar.Props) {
  const size = useComponentSize(localSize);
  const internalStore = useAvatar({ disabled });
  const { state, handlers, dataProps } = useComponentBehavior(internalStore, store, {
    onPointerEnter,
    onPointerLeave,
    onPointerDown,
    onPointerUp,
    onPointerCancel,
    onFocus,
    onBlur,
    onKeyDown,
    onKeyUp,
  });

  const [prevSrc, setPrevSrc] = useState(src);
  const [imageStatus, setImageStatus] = useState<'idle' | 'loaded' | 'error'>(
    src ? 'idle' : 'error',
  );
  if (prevSrc !== src) {
    setPrevSrc(src);
    setImageStatus(src ? 'idle' : 'error');
  }

  const initials = name
    ? take(name.split(' '), 2)
        .map((n) => n[0])
        .join('')
        .toUpperCase()
    : '?';

  const defaultChildren = (
    <>
      <Avatar.Image />
      <Avatar.Fallback>{initials}</Avatar.Fallback>
    </>
  );

  return (
    <AvatarContext.Provider value={{ src, alt: alt ?? name ?? '', imageStatus, setImageStatus }}>
      <SizeContext.Provider value={size}>
        <span
          className={avatar({ size, tone, className: resolveRenderProp(className, state) })}
          style={mergeObjects(colorVars(color), resolveRenderProp(style, state))}
          {...props}
          {...dataProps}
          {...handlers}
        >
          {resolveRenderProp(children ?? defaultChildren, state)}
        </span>
      </SizeContext.Provider>
    </AvatarContext.Provider>
  );
}

export namespace Avatar {
  export type State = StoreState<AvatarStore>;
  export type Store = AvatarStore;

  export const Image = AvatarImage;
  export namespace Image {
    export type Props = AvatarImage.Props;
  }

  export const Fallback = AvatarFallback;
  export namespace Fallback {
    export type Props = AvatarFallback.Props;
  }

  export interface Props
    extends
      Omit<ComponentProps<'span'>, 'color' | 'className' | 'style' | 'children'>,
      AccentProps {
    children?: RenderProp<State, ReactNode>;
    size?: ComponentSize;
    tone?: 'default' | 'weak' | 'contrast';
    src?: string;
    name?: string;
    alt?: string;
    store?: Store;
    disabled?: boolean;
    className?: RenderProp<State, string>;
    style?: RenderProp<State, CSSProperties>;
  }
}
