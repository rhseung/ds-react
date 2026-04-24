import { type CSSProperties, type JSX, type SVGProps } from 'react';

import { isEmptyObject } from 'es-toolkit';

import {
  SizeContext,
  useComponentBehavior,
  useComponentSize,
  type ComponentSize,
  type StoreState,
} from '@/common/hooks';
import {
  cn,
  IDSError,
  colorVars,
  mergeObjects,
  type AccentProps,
  type RenderProp,
  resolveRenderProp,
} from '@/common/utils';

import { icon } from './styles';
import { useIcon, type IconStore } from './use-icon';

export type IconRenderer = (props: SVGProps<SVGSVGElement>) => JSX.Element;

type IconState = StoreState<IconStore>;

export interface IconProps<V extends PropertyKey>
  extends Omit<SVGProps<SVGSVGElement>, 'ref' | 'className' | 'style' | 'color'>, AccentProps {
  variant?: V;
  size?: ComponentSize;
  store?: IconStore;
  className?: RenderProp<IconState, string>;
  style?: RenderProp<IconState, CSSProperties>;
}

export function createIcon<VariantMap extends Record<string, IconRenderer>>(
  displayName: string,
  variantMap: VariantMap,
  defaultVariant: keyof VariantMap,
) {
  if (isEmptyObject(variantMap)) IDSError.throw('icon/empty-variant-map', { displayName });

  function Icon({
    variant,
    size: localSize,
    store: externalStore,
    color,
    className,
    style,
    onPointerEnter,
    onPointerLeave,
    onPointerDown,
    onPointerUp,
    onPointerCancel,
    onFocus,
    onBlur,
    onKeyDown,
    onKeyUp,
    ...svgProps
  }: IconProps<keyof VariantMap>) {
    const size = useComponentSize(localSize);
    const internalStore = useIcon();
    const {
      state: interactionState,
      handlers,
      dataProps,
    } = useComponentBehavior(internalStore, externalStore, {
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

    const resolvedVariant = variant ?? defaultVariant;
    const state: IconState = interactionState;
    const renderer = variantMap[resolvedVariant] ?? variantMap[defaultVariant];

    return (
      <SizeContext.Provider value={size}>
        {renderer({
          className: cn(
            icon({ size }),
            color && 'text-accent',
            resolveRenderProp(className, state),
          ),
          style: mergeObjects(colorVars(color), resolveRenderProp(style, state)),
          ...svgProps,
          ...dataProps,
          ...handlers,
        })}
      </SizeContext.Provider>
    );
  }

  Icon.displayName = displayName;
  return Icon as typeof Icon & {
    State: IconState;
    Props: IconProps<keyof VariantMap>;
  };
}
