import { HStack, VStack, Text } from '@/common/components/primitive';
import { SizeContext } from '@/common/hooks';
import { cn } from '@/common/utils';

import { Avatar } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Avatar> = {
  title: 'UI/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    },
    tone: {
      control: 'radio',
      options: ['default', 'weak', 'contrast'],
    },
    color: {
      control: 'radio',
      options: ['primary', 'secondary', 'tertiary'],
    },
  },
  args: {
    name: 'Hong Gildong',
    size: 'md',
    tone: 'default',
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {};

export const WithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?img=1',
  },
};

export const Fallback: Story = {
  args: {
    name: undefined,
  },
};

export const ImageAndFallback: Story = {
  render: () => (
    <VStack gap={4}>
      <VStack gap={1}>
        <Text size="xs" color="neutral-text-weak" className="font-semibold">
          이미지 로드 성공 — Fallback 숨김
        </Text>
        <Avatar src="https://i.pravatar.cc/150?img=3" name="Hong Gildong" />
      </VStack>
      <VStack gap={1}>
        <Text size="xs" color="neutral-text-weak" className="font-semibold">
          이미지 로드 실패 — Fallback(이니셜) 표시
        </Text>
        <Avatar src="https://invalid.example.com/photo.jpg" name="Hong Gildong" />
      </VStack>
      <VStack gap={1}>
        <Text size="xs" color="neutral-text-weak" className="font-semibold">
          src 없음 — Fallback(이니셜) 표시
        </Text>
        <Avatar name="Hong Gildong" />
      </VStack>
      <VStack gap={1}>
        <Text size="xs" color="neutral-text-weak" className="font-semibold">
          Avatar.Fallback asChild — 커스텀 fallback 엘리먼트
        </Text>
        <HStack gap={2} className="items-center">
          <Avatar src="https://invalid.example.com/photo.jpg" name="Hong Gildong">
            <Avatar.Image />
            <Avatar.Fallback asChild>
              <span style={{ fontSize: 16 }}>👤</span>
            </Avatar.Fallback>
          </Avatar>
          <Avatar name="Kim AI">
            <Avatar.Image />
            <Avatar.Fallback>
              <span style={{ fontSize: 16 }}>🤖</span>
            </Avatar.Fallback>
          </Avatar>
        </HStack>
      </VStack>
    </VStack>
  ),
};

const COLORS = ['primary', 'secondary', 'tertiary'] as const;
const TONES = ['default', 'weak', 'contrast'] as const;
const SIZES = ['sm', 'md', 'lg'] as const;

export const Overview: Story = {
  render: () => (
    <VStack gap={4}>
      {COLORS.map((color) => (
        <HStack key={color} gap={3} className="items-center">
          {TONES.map((tone) => (
            <Avatar key={tone} name="Hong Gildong" color={color} tone={tone} />
          ))}
        </HStack>
      ))}
    </VStack>
  ),
};

export const Sizes: Story = {
  render: () => (
    <HStack gap={3} className="items-center">
      {SIZES.map((size) => (
        <VStack key={size} gap={1.5} className="items-center">
          <Avatar name="Hong Gildong" size={size} tone="default" />
          <Text size="xs" color="neutral-text-weak">
            {size}
          </Text>
        </VStack>
      ))}
    </HStack>
  ),
};

export const StateDriven: Story = {
  render: () => (
    <VStack gap={4}>
      <VStack gap={1}>
        <Text size="xs" color="neutral-text-weak" className="font-semibold">
          className 함수 — 호버 시 ring 추가
        </Text>
        <HStack gap={2} className="items-center">
          <Avatar
            name="홍길동"
            tone="default"
            className={(state) => cn('cursor-pointer transition-shadow', state.hovered && 'ring-2 ring-accent ring-offset-2')}
          />
          <Avatar
            name="Kim AI"
            color="secondary"
            tone="default"
            className={(state) => cn('cursor-pointer transition-shadow', state.hovered && 'ring-2 ring-accent ring-offset-2')}
          />
        </HStack>
      </VStack>
      <VStack gap={1}>
        <Text size="xs" color="neutral-text-weak" className="font-semibold">
          style 함수 — 호버 시 scale 확대
        </Text>
        <HStack gap={2} className="items-center">
          <Avatar
            name="홍길동"
            tone="weak"
            style={(state) => ({ transform: state.hovered ? 'scale(1.15)' : undefined, transition: 'transform 100ms' })}
          />
        </HStack>
      </VStack>
      <VStack gap={1}>
        <Text size="xs" color="neutral-text-weak" className="font-semibold">
          children 함수 — 호버 시 이니셜 강조
        </Text>
        <Avatar name="홍길동" tone="default" className="cursor-pointer">
          {(state) =>
            state.hovered ? (
              <span style={{ fontSize: 12, fontWeight: 700 }}>HG</span>
            ) : (
              <>
                <Avatar.Image />
                <Avatar.Fallback />
              </>
            )
          }
        </Avatar>
      </VStack>
    </VStack>
  ),
};

export const ContextPropagation: Story = {
  render: () => (
    <VStack gap={4}>
      {SIZES.map((size) => (
        <VStack key={size} gap={1}>
          <Text size="xs" color="neutral-text-weak" className="font-semibold">
            SizeContext: {size}
          </Text>
          <SizeContext.Provider value={size}>
            <HStack gap={2} className="items-center">
              <Avatar name="Hong Gildong" tone="default" />
              <Avatar name="Hong Gildong" size={size === 'lg' ? 'sm' : 'lg'} tone="default" />
            </HStack>
          </SizeContext.Provider>
        </VStack>
      ))}
    </VStack>
  ),
};
