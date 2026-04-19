import { useState } from 'react';

import { Flex } from '@/common/components/primitive';

import { Button } from '../button';
import { Divider } from '../divider';

import { TextArea } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof TextArea> = {
  title: 'UI/TextArea',
  component: TextArea,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['outline', 'filled', 'underline'] },
    tone: { control: 'select', options: ['default', 'weak', 'contrast'] },
    resize: { control: 'select', options: ['none', 'vertical', 'horizontal', 'both'] },
    autoResize: { control: 'boolean' },
    rows: { control: 'number' },
  },
  args: {
    placeholder: '내용을 입력하세요',
    rows: 3,
  },
};

export default meta;
type Story = StoryObj<typeof TextArea>;

export const Default: Story = {};

export const WithFooter: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const max = 280;
    return (
      <TextArea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Write a comment..."
        maxLength={max}
        className="w-80"
      >
        <TextArea.Inner />
        <Divider />
        <Flex.Row gap={2} className="items-center px-2.5 py-2">
          <span className="text-neutral-text-weak text-xs">
            {value.length}/{max}
          </span>
          <Flex.Spacer />
          <Button variant="solid">Post</Button>
        </Flex.Row>
      </TextArea>
    );
  },
};

export const WithHeader: Story = {
  render: () => (
    <TextArea placeholder="console.log('Hello, world!');" className="w-80">
      <Flex.Row gap={2} className="items-center px-2.5 py-2">
        <span className="text-neutral-text-weak text-xs">script.js</span>
      </Flex.Row>
      <Divider />
      <TextArea.Inner />
      <Divider />
      <Flex.Row gap={2} className="items-center px-2.5 py-2">
        <span className="text-neutral-text-weak text-xs">Line 1, Column 1</span>
        <Flex.Spacer />
        <Button variant="solid">Run</Button>
      </Flex.Row>
    </TextArea>
  ),
};

export const AutoResize: Story = {
  args: {
    autoResize: true,
    placeholder: '입력할수록 높이가 늘어납니다',
  },
};

export const Overview: Story = {
  render: () => (
    <Flex.Column gap={4} className="w-80">
      <TextArea variant="outline" placeholder="outline" />
      <TextArea variant="filled" placeholder="filled" />
      <TextArea variant="underline" placeholder="underline" />
    </Flex.Column>
  ),
};
