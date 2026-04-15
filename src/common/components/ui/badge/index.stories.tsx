import { Badge } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Badge> = {
  title: 'Common/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'radio',
      options: ['solid', 'soft', 'outline', 'ghost'],
    },
    color: {
      control: 'radio',
      options: ['neutral', 'info', 'success', 'danger', 'warning'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: 'Badge',
    variant: 'soft',
    color: 'neutral',
  },
};

export const Colors: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge color="neutral">neutral</Badge>
      <Badge color="info">info</Badge>
      <Badge color="success">success</Badge>
      <Badge color="danger">danger</Badge>
      <Badge color="warning">warning</Badge>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      {(['solid', 'soft', 'outline', 'ghost'] as const).map((variant) => (
        <div key={variant} className="flex flex-wrap gap-2">
          {(['neutral', 'info', 'success', 'danger', 'warning'] as const).map((color) => (
            <Badge key={color} variant={variant} color={color}>
              {color}
            </Badge>
          ))}
        </div>
      ))}
    </div>
  ),
};
