import { Flex, Text } from '@/common/components/primitive';
import { SizeContext } from '@/common/hooks';

import { Avatar } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Avatar> = {
  title: 'UI/Avatar',
  component: Avatar,
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
const SIZES = ['sm', 'md', 'lg'] as const;

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
    </Flex.Column>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Flex.Row gap={3} className="items-center">
      {SIZES.map((size) => (
        <Flex.Column key={size} gap={1.5} className="items-center">
          <Avatar name="Hong Gildong" size={size} tone="default" />
          <Text size="xs" color="neutral-text-weak">
            {size}
          </Text>
        </Flex.Column>
      ))}
    </Flex.Row>
  ),
};

export const ContextPropagation: Story = {
  render: () => (
    <Flex.Column gap={4}>
      {SIZES.map((size) => (
        <Flex.Column key={size} gap={1}>
          <Text size="xs" color="neutral-text-weak" className="font-semibold">
            SizeContext: {size}
          </Text>
          <SizeContext.Provider value={size}>
            <Flex.Row gap={2} className="items-center">
              <Avatar name="Hong Gildong" tone="default" />
              <Avatar name="Hong Gildong" size={size === 'lg' ? 'sm' : 'lg'} tone="default" />
            </Flex.Row>
          </SizeContext.Provider>
        </Flex.Column>
      ))}
    </Flex.Column>
  ),
};
