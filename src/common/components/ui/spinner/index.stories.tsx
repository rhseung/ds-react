import { Spinner } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Spinner> = {
  title: 'Common/Spinner',
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
  args: {
    size: 'md',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </div>
  ),
};

export const WithColor: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <span className="text-blue-500">
        <Spinner />
      </span>
      <span className="text-green-500">
        <Spinner />
      </span>
      <span className="text-red-500">
        <Spinner />
      </span>
    </div>
  ),
};
