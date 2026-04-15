import { Box } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Box> = {
  title: 'Primitive/Box',
  component: Box,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Box>;

export const Default: Story = {
  args: {
    className: 'bg-neutral-bg-disabled rounded-lg p-4',
    children: 'Box',
  },
};

export const AsChild: Story = {
  render: () => (
    <Box asChild>
      <button className="bg-primary text-on-primary hover:bg-primary-weak rounded-lg px-4 py-2">
        asChild — button으로 렌더됨
      </button>
    </Box>
  ),
};
