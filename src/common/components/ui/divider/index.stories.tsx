import { Divider } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Divider> = {
  title: 'Common/Divider',
  component: Divider,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Divider>;

export const Horizontal: Story = {
  render: () => (
    <div className="w-64">
      <p className="text-sm text-gray-600 dark:text-gray-400">위 영역</p>
      <Divider className="my-3" />
      <p className="text-sm text-gray-600 dark:text-gray-400">아래 영역</p>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="flex h-12 items-center gap-3">
      <span className="text-sm text-gray-600 dark:text-gray-400">왼쪽</span>
      <Divider orientation="vertical" />
      <span className="text-sm text-gray-600 dark:text-gray-400">오른쪽</span>
    </div>
  ),
};
