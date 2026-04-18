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
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Loading: Story = {
  render: () => (
    <Flex.Row gap={3}>
      {(['solid', 'outline', 'ghost'] as const).map((variant) => (
        <Button key={variant} variant={variant} tone="default" disabled>
          <Spinner size="sm" tone="default" />
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
