import { Box, HStack, VStack, Text } from '@/common/components/primitive';
import { SizeContext } from '@/common/hooks';
import { cn } from '@/common/utils';

import { Badge } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Badge> = {
  title: 'UI/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'radio',
      options: ['solid', 'outline', 'ghost'],
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
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: 'Badge',
    variant: 'solid',
    tone: 'weak',
  },
};

const VARIANTS = ['solid', 'outline', 'ghost'] as const;
const COLORS = ['primary', 'secondary', 'tertiary'] as const;
const TONES = ['default', 'weak', 'contrast'] as const;
const SIZES = ['sm', 'md', 'lg'] as const;

export const Overview: Story = {
  render: () => (
    <VStack gap={6}>
      {VARIANTS.map((variant) => (
        <VStack key={variant} gap={2}>
          <Text size="xs" color="neutral-text-weak" className="font-semibold">
            {variant}
          </Text>
          <Box className="grid grid-cols-4 gap-2">
            <span />
            {TONES.map((tone) => (
              <Text key={tone} size="xs" color="neutral-text-weak" className="text-center">
                {tone}
              </Text>
            ))}
            {COLORS.map((color) => (
              <>
                <Text key={color} size="xs" color="neutral-text-weak">
                  {color}
                </Text>
                {TONES.map((tone) => (
                  <Badge key={tone} variant={variant} color={color} tone={tone}>
                    Badge
                  </Badge>
                ))}
              </>
            ))}
          </Box>
        </VStack>
      ))}
    </VStack>
  ),
};

export const Sizes: Story = {
  render: () => (
    <VStack gap={3}>
      {SIZES.map((size) => (
        <HStack key={size} gap={2} className="items-center">
          <Text size="xs" color="neutral-text-weak" className="w-6 font-semibold">
            {size}
          </Text>
          <Badge size={size} tone="default">
            Badge
          </Badge>
          <Badge size={size} variant="outline" tone="default">
            Badge
          </Badge>
          <Badge size={size} variant="ghost" tone="default">
            Badge
          </Badge>
        </HStack>
      ))}
    </VStack>
  ),
};

export const StateDriven: Story = {
  render: () => (
    <VStack gap={4}>
      <VStack gap={1}>
        <Text size="xs" color="neutral-text-weak" className="font-semibold">
          className 함수 — 호버 시 opacity 감소
        </Text>
        <HStack gap={2}>
          <Badge tone="default" className={(state) => cn(state.hovered && 'opacity-60')}>
            호버해보세요
          </Badge>
          <Badge
            variant="outline"
            tone="default"
            className={(state) => cn(state.hovered && 'opacity-60')}
          >
            호버해보세요
          </Badge>
        </HStack>
      </VStack>
      <VStack gap={1}>
        <Text size="xs" color="neutral-text-weak" className="font-semibold">
          children 함수 — 호버 시 콘텐츠 분기
        </Text>
        <HStack gap={2}>
          <Badge tone="default">{(state) => (state.hovered ? '👀 보는 중' : 'Badge')}</Badge>
          <Badge variant="outline" color="secondary" tone="default">
            {(state) => (state.hovered ? '클릭 가능' : '태그')}
          </Badge>
        </HStack>
      </VStack>
      <VStack gap={1}>
        <Text size="xs" color="neutral-text-weak" className="font-semibold">
          asChild — 링크·버튼 엘리먼트에 Badge 스타일 적용
        </Text>
        <HStack gap={2}>
          <Badge asChild tone="default">
            <a href="#">링크 Badge</a>
          </Badge>
          <Badge asChild variant="outline" tone="default">
            <button type="button">버튼 Badge</button>
          </Badge>
        </HStack>
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
              {/* 컨텍스트 상속 */}
              <Badge tone="default">상속</Badge>
              {/* 명시값이 컨텍스트보다 우선 */}
              <Badge size={size === 'lg' ? 'sm' : 'lg'} tone="default">
                override → {size === 'lg' ? 'sm' : 'lg'}
              </Badge>
            </HStack>
          </SizeContext.Provider>
        </VStack>
      ))}
    </VStack>
  ),
};
