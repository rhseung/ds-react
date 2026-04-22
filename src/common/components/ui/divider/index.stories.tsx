import { VStack, Text } from '@/common/components/primitive';
import { cn } from '@/common/utils';

import { Divider } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Divider> = {
  title: 'UI/Divider',
  component: Divider,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
    },
  },
  args: {
    orientation: 'horizontal',
  },
};

export default meta;
type Story = StoryObj<typeof Divider>;

export const Default: Story = {
  decorators: [
    (Story, { args }) =>
      args.orientation === 'vertical' ? (
        <div className="border-neutral-border flex h-12 items-center gap-3 rounded-lg border p-3">
          <span className="text-neutral-text-weak text-sm">왼쪽</span>
          <Story />
          <span className="text-neutral-text-weak text-sm">오른쪽</span>
        </div>
      ) : (
        <div className="border-neutral-border w-64 rounded-lg border p-3">
          <p className="text-neutral-text-weak text-sm">위 영역</p>
          <Story />
          <p className="text-neutral-text-weak text-sm">아래 영역</p>
        </div>
      ),
  ],
};

export const StateAPI: Story = {
  render: () => (
    <VStack gap={4}>
      <VStack gap={1}>
        <Text size="xs" color="neutral-text-weak" className="font-semibold">
          className 함수 — 호버 시 색상 강조
        </Text>
        <div className="w-64">
          <Divider
            className={(state) =>
              cn('my-2 transition-colors', state.hovered ? 'bg-accent' : 'bg-neutral-border')
            }
          />
        </div>
      </VStack>
      <VStack gap={1}>
        <Text size="xs" color="neutral-text-weak" className="font-semibold">
          style 함수 — 호버 시 두께 증가
        </Text>
        <div className="w-64">
          <Divider
            className="my-2 transition-all"
            style={(state) => ({ height: state.hovered ? '2px' : undefined })}
          />
        </div>
      </VStack>
      <VStack gap={1}>
        <Text size="xs" color="neutral-text-weak" className="font-semibold">
          asChild — 커스텀 엘리먼트에 Divider 스타일 적용
        </Text>
        <Divider asChild className="my-2">
          <hr />
        </Divider>
      </VStack>
    </VStack>
  ),
};

export const Overview: Story = {
  render: () => (
    <VStack gap={4}>
      <div className="border-neutral-border w-64 rounded-lg border p-3">
        <p className="text-neutral-text-weak text-sm">위 영역</p>
        <Divider className="my-3" />
        <p className="text-neutral-text-weak text-sm">아래 영역</p>
      </div>
      <div className="border-neutral-border flex h-12 items-center gap-3 self-start rounded-lg border p-3">
        <span className="text-neutral-text-weak text-sm">왼쪽</span>
        <Divider orientation="vertical" />
        <span className="text-neutral-text-weak text-sm">오른쪽</span>
      </div>
    </VStack>
  ),
};
