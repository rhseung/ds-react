import { HStack, VStack, Text } from '@/common/components/primitive';
import { SizeContext } from '@/common/hooks';
import { cn } from '@/common/utils';

import { Spinner } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Spinner> = {
  title: 'UI/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Default: Story = {
  args: { size: 'md' },
};

export const Overview: Story = {
  render: () => (
    <HStack gap={4} className="text-accent items-center">
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </HStack>
  ),
};

const SIZES = ['sm', 'md', 'lg'] as const;

export const StateDriven: Story = {
  render: () => (
    <VStack gap={4}>
      <VStack gap={1}>
        <Text size="xs" color="neutral-text-weak" className="font-semibold">
          className 함수 — 호버 시 색상 변경
        </Text>
        <HStack gap={4} className="items-center">
          <Spinner className={(state) => cn(state.hovered ? 'text-primary' : 'text-neutral-text-weak')} />
          <Spinner className={(state) => cn(state.hovered ? 'text-secondary' : 'text-neutral-text-weak')} />
          <Spinner className={(state) => cn(state.hovered ? 'text-tertiary' : 'text-neutral-text-weak')} />
        </HStack>
      </VStack>
      <VStack gap={1}>
        <Text size="xs" color="neutral-text-weak" className="font-semibold">
          asChild — 커스텀 엘리먼트에 Spinner 스타일 적용
        </Text>
        <HStack gap={2} className="text-accent items-center">
          <Spinner asChild>
            <div />
          </Spinner>
        </HStack>
      </VStack>
    </VStack>
  ),
};

export const ContextPropagation: Story = {
  render: () => (
    <VStack gap={3}>
      {SIZES.map((size) => (
        <HStack key={size} gap={2} className="text-accent items-center">
          <Text size="xs" color="neutral-text-weak" className="w-6 font-semibold">
            {size}
          </Text>
          <SizeContext.Provider value={size}>
            <Spinner />
          </SizeContext.Provider>
        </HStack>
      ))}
    </VStack>
  ),
};
