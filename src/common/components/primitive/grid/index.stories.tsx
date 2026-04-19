import { Grid } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta = {
  title: 'Primitive/Grid',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

const Block = ({ label }: { label: string }) => (
  <div className="bg-primary text-on-primary flex h-10 items-center justify-center rounded text-sm">
    {label}
  </div>
);

export const Basic: Story = {
  render: () => (
    <Grid cols={3} gap={3}>
      {['A', 'B', 'C', 'D', 'E', 'F'].map((l) => (
        <Block key={l} label={l} />
      ))}
    </Grid>
  ),
};

export const WithSpan: Story = {
  render: () => (
    <Grid cols={3} gap={3}>
      <Grid.Item colSpan={2}>
        <Block label="A (span 2)" />
      </Grid.Item>
      <Block label="B" />
      <Block label="C" />
      <Grid.Item colSpan={3}>
        <Block label="D (span 3)" />
      </Grid.Item>
    </Grid>
  ),
};

export const AsymmetricGap: Story = {
  render: () => (
    <Grid cols={3} colGap={2} rowGap={6}>
      {['A', 'B', 'C', 'D', 'E', 'F'].map((l) => (
        <Block key={l} label={l} />
      ))}
    </Grid>
  ),
};

export const Responsive: Story = {
  render: () => (
    <Grid cols={{ xs: 1, sm: 2, lg: 4 }} gap={3}>
      {['A', 'B', 'C', 'D'].map((l) => (
        <Block key={l} label={l} />
      ))}
    </Grid>
  ),
};
