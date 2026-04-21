import {
  type CSSProperties,
  type ComponentProps,
  type ReactNode,
  createContext,
  useContext,
  useState,
} from 'react';

import { Slot, type SlotProps } from '@/common/components/utils';
import { SizeContext, useComponentSize, type ComponentSize } from '@/common/hooks';
import {
  type AccentProps,
  type RenderProp,
  cn,
  colorVars,
  mergeObjects,
  resolveRenderProp,
  tv,
} from '@/common/utils';

import { useAvatar } from './use-avatar';

const avatar = tv({
  base: 'inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full font-semibold',
  variants: {
    size: {
      sm: 'size-6 text-xs',
      md: 'size-8 text-sm',
      lg: 'size-10 text-base',
    },
    tone: {
      default: 'bg-accent text-on-accent',
      weak: 'bg-accent-weak text-on-accent-weak',
      contrast: 'bg-accent-contrast text-on-accent-contrast',
    },
  },
  defaultVariants: {
    size: 'md',
    tone: 'default',
  },
});

// ─── Context ─────────────────────────────────────────────────────────────────

type ImageStatus = 'idle' | 'loaded' | 'error';

interface AvatarContextValue {
  src?: string;
  alt?: string;
  imageStatus: ImageStatus;
  setImageStatus: (status: ImageStatus) => void;
}

const AvatarContext = createContext<AvatarContextValue | null>(null);

function useAvatarContext() {
  const ctx = useContext(AvatarContext);
  if (!ctx) throw new Error('[IDS] Avatar.Image and Avatar.Fallback must be used inside <Avatar>');
  return ctx;
}

// ─── Avatar ──────────────────────────────────────────────────────────────────

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
  const [imageStatus, setImageStatus] = useState<ImageStatus>(src ? 'idle' : 'error');
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

  const cls = avatar({ size, tone, className: resolveRenderProp(className, state) });
  const styles = mergeObjects(
    color ? colorVars(color) : undefined,
    resolveRenderProp(style, state),
  );

  return (
    <AvatarContext.Provider value={{ src, alt: alt ?? name ?? '', imageStatus, setImageStatus }}>
      <SizeContext.Provider value={size}>
        <span className={cls} style={styles} {...props} {...dataProps} {...handlers}>
          {resolveRenderProp(children ?? defaultChildren, state)}
        </span>
      </SizeContext.Provider>
    </AvatarContext.Provider>
  );
}

// ─── Namespace ────────────────────────────────────────────────────────────────

export namespace Avatar {
  export type State = ReturnType<typeof useAvatar>['state'];

  export function Image({ className }: Image.Props) {
    const { src, alt, imageStatus, setImageStatus } = useAvatarContext();

    if (!src || imageStatus === 'error') return null;

    return (
      <img
        src={src}
        alt={alt ?? ''}
        className={cn('size-full object-cover', className)}
        onLoad={() => setImageStatus('loaded')}
        onError={() => setImageStatus('error')}
      />
    );
  }

  export namespace Image {
    export interface Props {
      className?: string;
    }
  }

  export function Fallback({ asChild = false, children }: Fallback.Props) {
    const { imageStatus } = useAvatarContext();
    const size = useComponentSize();

    if (imageStatus === 'loaded') return null;

    if (asChild)
      return (
        <SizeContext.Provider value={size}>
          <Slot>{children}</Slot>
        </SizeContext.Provider>
      );
    return <SizeContext.Provider value={size}>{children}</SizeContext.Provider>;
  }

  export namespace Fallback {
    export type Props = SlotProps;
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
