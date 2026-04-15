import { Flex } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta = {
  title: 'Primitive/Flex',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

const Block = ({ label }: { label: string }) => (
  <div className="bg-primary text-on-primary flex h-10 w-20 items-center justify-center rounded text-sm">
    {label}
  </div>
);

export const Row: Story = {
  render: () => (
    <Flex.Row gap={3}>
      <Block label="A" />
      <Block label="B" />
      <Block label="C" />
    </Flex.Row>
  ),
};

export const Column: Story = {
  render: () => (
    <Flex.Column gap={2}>
      <Block label="A" />
      <Block label="B" />
      <Block label="C" />
    </Flex.Column>
  ),
};

export const WithSpacer: Story = {
  render: () => (
    <Flex.Row gap={2} className="border-neutral-border w-full rounded-lg border p-4">
      <Block label="Left" />
      <Flex.Spacer />
      <Block label="Right" />
    </Flex.Row>
  ),
};

export const ResponsiveGap: Story = {
  render: () => (
    <Flex.Row gap={{ xs: 1, md: 6 }}>
      <Block label="A" />
      <Block label="B" />
      <Block label="C" />
    </Flex.Row>
  ),
};

export const Nested: Story = {
  render: () => (
    <Flex.Column gap={4} className="border-neutral-border rounded-lg border p-4">
      <Flex.Row gap={2}>
        <Block label="A" />
        <Block label="B" />
      </Flex.Row>
      <Flex.Row gap={2}>
        <Block label="C" />
        <Flex.Spacer />
        <Block label="D" />
      </Flex.Row>
    </Flex.Column>
  ),
};
