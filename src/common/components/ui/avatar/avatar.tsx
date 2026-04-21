import { type CSSProperties, type ComponentProps, type ReactNode, useState } from 'react';

import { SizeContext, useComponentSize, type ComponentSize } from '@/common/hooks';
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
import { useAvatar } from './use-avatar';

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
  const { state, handlers, dataProps } = useAvatar({
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
    ? name
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
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
          style={mergeObjects(
            color ? colorVars(color) : undefined,
            resolveRenderProp(style, state),
          )}
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
  export type State = ReturnType<typeof useAvatar>['state'];

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
    disabled?: boolean;
    className?: RenderProp<State, string>;
    style?: RenderProp<State, CSSProperties>;
  }
}
