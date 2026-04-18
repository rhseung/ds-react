import { Flex } from '@/common/components/primitive';

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
type Story = StoryObj<typeof Spinner>;

export const Default: Story = {
  args: { size: 'md' },
};

export const Sizes: Story = {
  render: () => (
    <Flex.Row gap={4} className="items-center">
      <Spinner size="sm" tone="default" />
      <Spinner size="md" tone="default" />
      <Spinner size="lg" tone="default" />
    </Flex.Row>
  ),
};

const COLORS = ['primary', 'secondary', 'tertiary'] as const;
const TONES = ['default', 'weak', 'contrast'] as const;

export const Overview: Story = {
  render: () => (
    <Flex.Column gap={3}>
      {COLORS.map((color) => (
        <Flex.Row key={color} gap={4} className="items-center">
          {TONES.map((tone) => (
            <Spinner key={tone} color={color} tone={tone} />
          ))}
        </Flex.Row>
      ))}
    </Flex.Column>
  ),
};
