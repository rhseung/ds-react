import { Button } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Button> = {
  title: 'Common/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'radio',
      options: ['solid', 'soft', 'outline', 'ghost'],
    },
    elevated: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Solid: Story = {
  args: { children: '확인', variant: 'solid' },
};

export const Soft: Story = {
  args: { children: '확인', variant: 'soft' },
};

export const Outline: Story = {
  args: { children: '취소', variant: 'outline' },
};

export const Ghost: Story = {
  args: { children: '취소', variant: 'ghost' },
};

export const All: Story = {
  render: () => (
    <div className="flex gap-3">
      <Button variant="solid">확인</Button>
      <Button variant="soft">확인</Button>
      <Button variant="outline">취소</Button>
      <Button variant="ghost">취소</Button>
    </div>
  ),
};

export const Elevated: Story = {
  render: () => (
    <div className="flex gap-3">
      <Button variant="solid" elevated>확인</Button>
      <Button variant="soft" elevated>확인</Button>
      <Button variant="outline" elevated>취소</Button>
      <Button variant="ghost" elevated>취소</Button>
    </div>
  ),
};

export const ElevatedComparison: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      {(['solid', 'soft', 'outline', 'ghost'] as const).map((variant) => (
        <div key={variant} className="flex items-center gap-4">
          <span className="w-16 text-xs text-gray-400">{variant}</span>
          <Button variant={variant}>기본</Button>
          <Button variant={variant} elevated>elevated</Button>
        </div>
      ))}
    </div>
  ),
};
