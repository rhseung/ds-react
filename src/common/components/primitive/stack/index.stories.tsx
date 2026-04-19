import { HStack, Spacer, VStack } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta = {
  title: 'Primitive/Stack',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

const Block = ({ label }: { label: string }) => (
  <div className="bg-primary text-on-primary flex h-10 w-20 items-center justify-center rounded text-sm">
    {label}
  </div>
);

export const Horizontal: Story = {
  render: () => (
    <HStack gap={3}>
      <Block label="A" />
      <Block label="B" />
      <Block label="C" />
    </HStack>
  ),
};

export const Vertical: Story = {
  render: () => (
    <VStack gap={2}>
      <Block label="A" />
      <Block label="B" />
      <Block label="C" />
    </VStack>
  ),
};

export const WithSpacer: Story = {
  render: () => (
    <HStack gap={2} className="border-neutral-border w-full rounded-lg border p-4">
      <Block label="Left" />
      <Spacer />
      <Block label="Right" />
    </HStack>
  ),
};

export const ResponsiveGap: Story = {
  render: () => (
    <HStack gap={{ xs: 1, md: 6 }}>
      <Block label="A" />
      <Block label="B" />
      <Block label="C" />
    </HStack>
  ),
};

export const Nested: Story = {
  render: () => (
    <VStack gap={4} className="border-neutral-border rounded-lg border p-4">
      <HStack gap={2}>
        <Block label="A" />
        <Block label="B" />
      </HStack>
      <HStack gap={2}>
        <Block label="C" />
        <Spacer />
        <Block label="D" />
      </HStack>
    </VStack>
  ),
};
