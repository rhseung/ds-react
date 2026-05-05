import { useState } from 'react';

import { HStack, Text, VStack } from '@/common/components/primitive';
import { Button } from '@/common/components/ui/button';
import { Toggle } from '@/common/components/ui/toggle';
import { SizeContext } from '@/common/hooks';
import { cn } from '@/common/utils';

import { Icons, useIcon } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Icons.Search> = {
  title: 'UI/Icon',
  component: Icons.Search,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'radio',
      options: ['outline', 'filled'],
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    },
    color: {
      control: 'radio',
      options: ['primary', 'secondary', 'tertiary'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Icons.Search>;

export const Default: Story = {
  args: { variant: 'outline', size: 'md' },
};

const SIZES = ['sm', 'md', 'lg'] as const;
const COLORS = ['primary', 'secondary', 'tertiary'] as const;

const ICON_VARIANTS = [
  {
    label: 'Search',
    variants: ['outline', 'filled', 'off'] as const,
    Icon: Icons.Search,
  },
  {
    label: 'Star',
    variants: [
      'outline',
      'filled',
      'half',
      'halfFilled',
      'off',
      'stars',
      'starsFilled',
      'starsOff',
    ] as const,
    Icon: Icons.Star,
  },
  {
    label: 'Bell',
    variants: [
      'outline',
      'filled',
      'ringing',
      'ringing2',
      'ringingFilled',
      'ringing2Filled',
      'off',
      'check',
      'x',
      'xFilled',
      'plus',
      'plusFilled',
      'minus',
      'minusFilled',
      'bolt',
      'exclamation',
      'question',
      'z',
      'zFilled',
      'up',
      'down',
      'pin',
      'pause',
      'heart',
      'star',
      'search',
      'share',
      'cog',
      'code',
      'school',
      'cancel',
      'dollar',
    ] as const,
    Icon: Icons.Bell,
  },
  {
    label: 'Heart',
    variants: [
      'outline',
      'filled',
      'broken',
      'brokenFilled',
      'off',
      'spark',
      'bolt',
      'check',
      'x',
      'plus',
      'minus',
      'exclamation',
      'question',
      'up',
      'down',
      'pin',
      'pause',
      'star',
      'search',
      'share',
      'handshake',
      'cog',
      'code',
      'cancel',
      'dollar',
      'discount',
      'bitcoin',
      'rateMonitor',
    ] as const,
    Icon: Icons.Heart,
  },
] as const;

export const Overview: Story = {
  render: () => (
    <VStack gap={8}>
      {ICON_VARIANTS.map(({ label, variants, Icon }) => (
        <VStack key={label} gap={2}>
          <Text size="xs" color="neutral-text-weak" className="font-semibold">
            {label}
          </Text>
          <HStack gap={4} className="flex-wrap items-end">
            {variants.map((variant) => (
              <VStack key={variant} gap={1} className="items-center">
                <Icon variant={variant as never} />
                <Text size="xs" color="neutral-text-weak">
                  {variant}
                </Text>
              </VStack>
            ))}
          </HStack>
        </VStack>
      ))}
    </VStack>
  ),
};

export const Colors: Story = {
  render: () => (
    <VStack gap={4}>
      {COLORS.map((color) => (
        <VStack key={color} gap={2}>
          <Text size="xs" color="neutral-text-weak" className="font-semibold">
            {color}
          </Text>
          <HStack gap={6}>
            {(['outline', 'filled'] as const).map((variant) => (
              <HStack key={variant} gap={3} className="items-center">
                <Text size="xs" color="neutral-text-weak" className="w-10">
                  {variant}
                </Text>
                <Icons.Search color={color} variant={variant} />
                <Icons.Star color={color} variant={variant} />
                <Icons.Bell color={color} variant={variant} />
                <Icons.Heart color={color} variant={variant} />
              </HStack>
            ))}
          </HStack>
        </VStack>
      ))}
    </VStack>
  ),
};

export const Sizes: Story = {
  render: () => (
    <VStack gap={3}>
      {SIZES.map((size) => (
        <HStack key={size} gap={4} className="items-center">
          <Text size="xs" color="neutral-text-weak" className="w-6 font-semibold">
            {size}
          </Text>
          <Icons.Search size={size} />
          <Icons.Star size={size} />
          <Icons.Bell size={size} />
          <Icons.Heart size={size} />
        </HStack>
      ))}
    </VStack>
  ),
};

export const ContextPropagation: Story = {
  render: () => (
    <VStack gap={3}>
      {SIZES.map((size) => (
        <HStack key={size} gap={4} className="items-center">
          <Text size="xs" color="neutral-text-weak" className="w-6 font-semibold">
            {size}
          </Text>
          <Button size={size}>
            <Icons.Search />
            검색
          </Button>
          <SizeContext.Provider value={size}>
            <HStack gap={3} className="items-center">
              <Icons.Search />
              <Icons.Star />
              <Icons.Bell />
            </HStack>
          </SizeContext.Provider>
        </HStack>
      ))}
    </VStack>
  ),
};

export const CurrentColor: Story = {
  render: () => (
    <VStack gap={4}>
      {COLORS.map((color) => (
        <VStack key={color} gap={2}>
          <Text size="xs" color="neutral-text-weak" className="font-semibold">
            {color}
          </Text>
          <HStack gap={2} className="flex-wrap">
            {(['solid', 'elevated', 'outline', 'ghost'] as const).map((variant) => (
              <Button key={variant} variant={variant} color={color}>
                <Icons.Search />
                검색
              </Button>
            ))}
          </HStack>
        </VStack>
      ))}
    </VStack>
  ),
};

export const DrawAnimation: Story = {
  render: () => {
    const [replayKey, setReplayKey] = useState(0);
    const replay = () => setReplayKey((k) => k + 1);

    return (
      <VStack gap={8} className="items-start">
        <HStack gap={3} className="items-center">
          <Button size="sm" variant="outline" onClick={replay}>
            Replay
          </Button>
          <Text size="xs" color="neutral-text-weak">
            애니메이션은 마운트 시 1회 재생됩니다 — Replay로 다시 그리기
          </Text>
        </HStack>

        <VStack gap={2}>
          <Text size="xs" color="neutral-text-weak" className="font-semibold">
            Default — 기본값 (length 100 / duration 1200ms / ease-standard)
          </Text>
          <HStack gap={6} key={`default-${replayKey}`} className="items-center">
            <Icons.Search className="ids-icon-draw" />
            <Icons.Star className="ids-icon-draw" />
            <Icons.Bell className="ids-icon-draw" />
            <Icons.Heart className="ids-icon-draw" />
            <Icons.Calendar className="ids-icon-draw" />
            <Icons.World className="ids-icon-draw" />
          </HStack>
        </VStack>

        <VStack gap={2}>
          <Text size="xs" color="neutral-text-weak" className="font-semibold">
            Length 보정 — path 길이에 따라 --ids-icon-draw-length 조정
          </Text>
          <HStack gap={6} key={`length-${replayKey}`} className="items-end">
            <VStack gap={1} className="items-center">
              <Icons.Check
                className={cn('ids-icon-draw', '[--ids-icon-draw-length:30]')}
                size="lg"
              />
              <Text size="xs" color="neutral-text-weak">
                30 (짧은 path)
              </Text>
            </VStack>
            <VStack gap={1} className="items-center">
              <Icons.Star
                className={cn('ids-icon-draw', '[--ids-icon-draw-length:75]')}
                size="lg"
              />
              <Text size="xs" color="neutral-text-weak">
                75 (Star 정확)
              </Text>
            </VStack>
            <VStack gap={1} className="items-center">
              <Icons.Heart className={cn('ids-icon-draw')} size="lg" />
              <Text size="xs" color="neutral-text-weak">
                100 (기본)
              </Text>
            </VStack>
            <VStack gap={1} className="items-center">
              <Icons.World
                className={cn('ids-icon-draw', '[--ids-icon-draw-length:250]')}
                size="lg"
              />
              <Text size="xs" color="neutral-text-weak">
                250 (복잡)
              </Text>
            </VStack>
          </HStack>
        </VStack>

        <VStack gap={2}>
          <Text size="xs" color="neutral-text-weak" className="font-semibold">
            Duration — 속도 제어 (드로잉은 UI 전환보다 길어야 자연스럽습니다)
          </Text>
          <HStack gap={6} key={`duration-${replayKey}`} className="items-end">
            <VStack gap={1} className="items-center">
              <Icons.Bell
                className={cn('ids-icon-draw', '[--ids-icon-draw-duration:600ms]')}
                size="lg"
              />
              <Text size="xs" color="neutral-text-weak">
                600ms
              </Text>
            </VStack>
            <VStack gap={1} className="items-center">
              <Icons.Bell
                className={cn('ids-icon-draw', '[--ids-icon-draw-duration:900ms]')}
                size="lg"
              />
              <Text size="xs" color="neutral-text-weak">
                900ms
              </Text>
            </VStack>
            <VStack gap={1} className="items-center">
              <Icons.Bell className={cn('ids-icon-draw')} size="lg" />
              <Text size="xs" color="neutral-text-weak">
                1200ms (기본)
              </Text>
            </VStack>
            <VStack gap={1} className="items-center">
              <Icons.Bell
                className={cn('ids-icon-draw', '[--ids-icon-draw-duration:2000ms]')}
                size="lg"
              />
              <Text size="xs" color="neutral-text-weak">
                2000ms
              </Text>
            </VStack>
          </HStack>
        </VStack>

        <VStack gap={2}>
          <Text size="xs" color="neutral-text-weak" className="font-semibold">
            Easing — 모션 토큰으로 곡선 제어
          </Text>
          <HStack gap={6} key={`ease-${replayKey}`} className="items-end">
            <VStack gap={1} className="items-center">
              <Icons.Star className={cn('ids-icon-draw')} size="lg" />
              <Text size="xs" color="neutral-text-weak">
                standard (기본)
              </Text>
            </VStack>
            <VStack gap={1} className="items-center">
              <Icons.Star
                className={cn('ids-icon-draw', '[--ids-icon-draw-ease:var(--ids-ease-decelerate)]')}
                size="lg"
              />
              <Text size="xs" color="neutral-text-weak">
                decelerate
              </Text>
            </VStack>
            <VStack gap={1} className="items-center">
              <Icons.Star
                className={cn('ids-icon-draw', '[--ids-icon-draw-ease:var(--ids-ease-accelerate)]')}
                size="lg"
              />
              <Text size="xs" color="neutral-text-weak">
                accelerate
              </Text>
            </VStack>
            <VStack gap={1} className="items-center">
              <Icons.Star
                className={cn('ids-icon-draw', '[--ids-icon-draw-ease:var(--ids-ease-press)]')}
                size="lg"
              />
              <Text size="xs" color="neutral-text-weak">
                press
              </Text>
            </VStack>
            <VStack gap={1} className="items-center">
              <Icons.Star
                className={cn('ids-icon-draw', '[--ids-icon-draw-ease:cubic-bezier(0.65,0,0.35,1)]')}
                size="lg"
              />
              <Text size="xs" color="neutral-text-weak">
                in-out (느림→빠름→느림)
              </Text>
            </VStack>
          </HStack>
        </VStack>

        <VStack gap={2}>
          <Text size="xs" color="neutral-text-weak" className="font-semibold">
            Staggered — --ids-icon-draw-delay로 순차 등장
          </Text>
          <HStack gap={6} key={`stagger-${replayKey}`} className="items-center">
            {[0, 150, 300, 450, 600].map((delay) => (
              <Icons.Heart
                key={delay}
                color="primary"
                size="lg"
                className="ids-icon-draw"
                style={{ ['--ids-icon-draw-delay' as string]: `${delay}ms` }}
              />
            ))}
          </HStack>
        </VStack>

        <VStack gap={2}>
          <Text size="xs" color="neutral-text-weak" className="font-semibold">
            With color — accent 토큰과 함께
          </Text>
          <HStack gap={6} key={`color-${replayKey}`} className="items-center">
            <Icons.Bell color="primary" size="lg" className="ids-icon-draw" />
            <Icons.Bell color="secondary" size="lg" className="ids-icon-draw" />
            <Icons.Bell color="tertiary" size="lg" className="ids-icon-draw" />
          </HStack>
        </VStack>
      </VStack>
    );
  },
};

export const StateAPI: Story = {
  render: () => {
    const store = useIcon();
    return (
      <VStack gap={8} className="items-start">
        <HStack gap={8} className="items-start">
          <Icons.Search store={store} />
          <VStack gap={2}>
            <Text size="xs" color="neutral-text-weak" className="font-semibold">
              store.state
            </Text>
            {(['hovered', 'focused', 'active', 'disabled'] as const).map((key) => (
              <Text key={key} size="xs" color="neutral-text-weak">
                {key}: {String(store.get((s) => s[key]))}
              </Text>
            ))}
          </VStack>
          <VStack gap={2}>
            <Text size="xs" color="neutral-text-weak" className="font-semibold">
              store.set()
            </Text>
            <Toggle
              size="sm"
              pressed={store.get((s) => s.disabled)}
              onPressedChange={(v) => store.set({ disabled: v })}
            >
              disabled 토글
            </Toggle>
          </VStack>
        </HStack>

        <VStack gap={4}>
          <VStack gap={1}>
            <Text size="xs" color="neutral-text-weak" className="font-semibold">
              color + className 함수 — 호버 시 opacity 변화
            </Text>
            <Icons.Search color="primary" className={(s) => cn(!s.hovered && 'opacity-40')} />
          </VStack>
          <VStack gap={1}>
            <Text size="xs" color="neutral-text-weak" className="font-semibold">
              style 함수 — 포커스 시 scale 증가
            </Text>
            <Icons.Search
              tabIndex={0}
              style={(s) => ({
                transform: s.focused ? 'scale(1.3)' : 'scale(1)',
                transition: 'transform 150ms',
              })}
            />
          </VStack>
        </VStack>
      </VStack>
    );
  },
};
