import { Flex } from '@/common/components/primitive';

import { Avatar } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Avatar> = {
  title: 'Common/Avatar',
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
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const WithInitials: Story = {
  args: {
    name: 'Hong Gildong',
    size: 'md',
  },
};

export const WithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?img=1',
    name: 'Hong Gildong',
    size: 'md',
  },
};

export const Fallback: Story = {
  args: {
    size: 'md',
  },
};

export const Sizes: Story = {
  render: () => (
    <Flex.Row gap={3} className="items-center">
      <Avatar name="Hong Gildong" size="sm" tone="default" />
      <Avatar name="Hong Gildong" size="md" tone="default" />
      <Avatar name="Hong Gildong" size="lg" tone="default" />
      <Avatar name="Hong Gildong" size="xl" tone="default" />
    </Flex.Row>
  ),
};

const COLORS = ['primary', 'secondary', 'tertiary'] as const;
const TONES = ['default', 'weak', 'contrast'] as const;

export const Overview: Story = {
  render: () => (
    <Flex.Column gap={3}>
      {COLORS.map((color) => (
        <Flex.Row key={color} gap={3} className="items-center">
          {TONES.map((tone) => (
            <Avatar key={tone} name="Hong Gildong" color={color} tone={tone} />
          ))}
        </Flex.Row>
      ))}
    </Flex.Column>
  ),
};
