import { Flex } from '@/common/components/primitive';

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

export const Overview: Story = {
  render: () => (
    <Flex.Column gap={4}>
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
    </Flex.Column>
  ),
};
