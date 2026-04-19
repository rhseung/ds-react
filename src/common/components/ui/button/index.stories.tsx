import { IconSearch } from '@tabler/icons-react';

import { Box, Flex, Text } from '@/common/components/primitive';
import { Spinner } from '@/common/components/ui/spinner';

import { Button } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'radio',
      options: ['solid', 'solid-elevated', 'outline', 'ghost'],
    },
    tone: {
      control: 'radio',
      options: ['default', 'weak', 'contrast'],
    },
    color: {
      control: 'radio',
      options: ['primary', 'secondary', 'tertiary'],
    },
    size: {
      control: 'radio',
      options: ['default', 'icon'],
    },
  },
  args: {
    children: '확인',
    tone: 'default',
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {};

export const IconOnly: Story = {
  render: () => (
    <Flex.Column gap={6}>
      {VARIANTS.map((variant) => (
        <Flex.Column key={variant} gap={2}>
          <Text size="xs" color="neutral-text-weak" className="font-semibold">
            {variant}
          </Text>
          <Box className="grid grid-cols-4 gap-2">
            <span />
            {TONES.map((tone) => (
              <Text key={tone} size="xs" color="neutral-text-weak" className="text-center">
                {tone}
              </Text>
            ))}
            {COLORS.map((color) => (
              <>
                <Text key={color} size="xs" color="neutral-text-weak">
                  {color}
                </Text>
                {TONES.map((tone) => (
                  <Button key={tone} size="icon" variant={variant} color={color} tone={tone}>
                    <IconSearch size={16} />
                  </Button>
                ))}
              </>
            ))}
          </Box>
        </Flex.Column>
      ))}
    </Flex.Column>
  ),
};

export const Loading: Story = {
  render: () => (
    <Flex.Row gap={3}>
      {(['solid', 'outline', 'ghost'] as const).map((variant) => (
        <Button key={variant} variant={variant} tone="default" disabled>
          <Spinner size="sm" />
          로딩 중
        </Button>
      ))}
    </Flex.Row>
  ),
};

const VARIANTS = ['solid', 'solid-elevated', 'outline', 'ghost'] as const;
const COLORS = ['primary', 'secondary', 'tertiary'] as const;
const TONES = ['default', 'weak', 'contrast'] as const;

export const Overview: Story = {
  render: () => (
    <Flex.Column gap={6}>
      {VARIANTS.map((variant) => (
        <Flex.Column key={variant} gap={2}>
          <Text size="xs" color="neutral-text-weak" className="font-semibold">
            {variant}
          </Text>
          <Box className="grid grid-cols-4 gap-2">
            <span />
            {TONES.map((tone) => (
              <Text key={tone} size="xs" color="neutral-text-weak" className="text-center">
                {tone}
              </Text>
            ))}
            {COLORS.map((color) => (
              <>
                <Text key={color} size="xs" color="neutral-text-weak">
                  {color}
                </Text>
                {TONES.map((tone) => (
                  <Button key={tone} variant={variant} color={color} tone={tone}>
                    확인
                  </Button>
                ))}
              </>
            ))}
          </Box>
        </Flex.Column>
      ))}
    </Flex.Column>
  ),
};
