import { Box, Flex, Text } from '@/common/components/primitive';
import { Spinner } from '@/common/components/ui/spinner';

import { Button } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Button> = {
  title: 'Common/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'radio',
      options: ['solid', 'solid-elevated', 'soft', 'soft-elevated', 'outline', 'ghost'],
    },
    contrast: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Solid: Story = {
  args: { children: '확인', variant: 'solid' },
};

export const SolidElevated: Story = {
  args: { children: '확인', variant: 'solid-elevated' },
};

export const Soft: Story = {
  args: { children: '확인', variant: 'soft' },
};

export const SoftElevated: Story = {
  args: { children: '확인', variant: 'soft-elevated' },
};

export const Outline: Story = {
  args: { children: '취소', variant: 'outline' },
};

export const Ghost: Story = {
  args: { children: '취소', variant: 'ghost' },
};

export const Loading: Story = {
  render: () => (
    <Flex.Row gap={3}>
      {(['solid', 'soft', 'outline', 'ghost'] as const).map((variant) => (
        <Button key={variant} variant={variant} disabled>
          <Spinner size="sm" />
          로딩 중
        </Button>
      ))}
    </Flex.Row>
  ),
};

const VARIANTS = ['solid', 'solid-elevated', 'soft', 'soft-elevated', 'outline', 'ghost'] as const;

export const Overview: Story = {
  render: () => (
    <Flex.Column gap={2}>
      <Box className="grid grid-cols-4 gap-3">
        <span />
        {(['기본', 'contrast', 'disabled'] as const).map((label) => (
          <Text key={label} size="xs" color="neutral-text-weak" className="text-center">
            {label}
          </Text>
        ))}
      </Box>
      {VARIANTS.map((variant) => (
        <Box key={variant} className="grid grid-cols-4 items-center gap-3">
          <Text size="xs" color="neutral-text-weak">
            {variant}
          </Text>
          <Button variant={variant}>확인</Button>
          <Button variant={variant} contrast>
            확인
          </Button>
          <Button variant={variant} disabled>
            확인
          </Button>
        </Box>
      ))}
    </Flex.Column>
  ),
};
