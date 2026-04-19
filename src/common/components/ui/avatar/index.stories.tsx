import { Flex } from '@/common/components/primitive';

import { Avatar } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Avatar> = {
  title: 'UI/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg', 'xl'],
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

const COLORS = ['primary', 'secondary', 'tertiary'] as const;
const TONES = ['default', 'weak', 'contrast'] as const;
const SIZES = ['sm', 'md', 'lg', 'xl'] as const;

export const Overview: Story = {
  render: () => (
    <Flex.Column gap={4}>
      {COLORS.map((color) => (
        <Flex.Row key={color} gap={3} className="items-center">
          {TONES.map((tone) => (
            <Avatar key={tone} name="Hong Gildong" color={color} tone={tone} />
          ))}
        </Flex.Row>
      ))}
      <Flex.Row gap={3} className="items-center">
        {SIZES.map((size) => (
          <Avatar key={size} name="Hong Gildong" size={size} tone="default" />
        ))}
      </Flex.Row>
    </Flex.Column>
  ),
};
