import { Flex, Text } from '@/common/components/primitive';
import { SizeContext } from '@/common/hooks';

import { Spinner } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Spinner> = {
  title: 'UI/Spinner',
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
  args: { size: 'md' },
};

export const Overview: Story = {
  render: () => (
    <Flex.Row gap={4} className="text-accent items-center">
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </Flex.Row>
  ),
};

const SIZES = ['sm', 'md', 'lg'] as const;

export const ContextPropagation: Story = {
  render: () => (
    <Flex.Column gap={3}>
      {SIZES.map((size) => (
        <Flex.Row key={size} gap={2} className="text-accent items-center">
          <Text size="xs" color="neutral-text-weak" className="w-6 font-semibold">
            {size}
          </Text>
          <SizeContext.Provider value={size}>
            <Spinner />
          </SizeContext.Provider>
        </Flex.Row>
      ))}
    </Flex.Column>
  ),
};
