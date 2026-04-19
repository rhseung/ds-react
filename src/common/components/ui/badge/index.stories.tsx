import { Box, Flex, Text } from '@/common/components/primitive';
import { SizeContext } from '@/common/hooks';

import { Badge } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Badge> = {
  title: 'UI/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'radio',
      options: ['solid', 'outline', 'ghost'],
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
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: 'Badge',
    variant: 'solid',
    tone: 'weak',
  },
};

const VARIANTS = ['solid', 'outline', 'ghost'] as const;
const COLORS = ['primary', 'secondary', 'tertiary'] as const;
const TONES = ['default', 'weak', 'contrast'] as const;
const SIZES = ['sm', 'md', 'lg'] as const;

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
                  <Badge key={tone} variant={variant} color={color} tone={tone}>
                    Badge
                  </Badge>
                ))}
              </>
            ))}
          </Box>
        </Flex.Column>
      ))}
    </Flex.Column>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Flex.Column gap={3}>
      {SIZES.map((size) => (
        <Flex.Row key={size} gap={2} className="items-center">
          <Text size="xs" color="neutral-text-weak" className="w-6 font-semibold">
            {size}
          </Text>
          <Badge size={size} tone="default">
            Badge
          </Badge>
          <Badge size={size} variant="outline" tone="default">
            Badge
          </Badge>
          <Badge size={size} variant="ghost" tone="default">
            Badge
          </Badge>
        </Flex.Row>
      ))}
    </Flex.Column>
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
              {/* 컨텍스트 상속 */}
              <Badge tone="default">상속</Badge>
              {/* 명시값이 컨텍스트보다 우선 */}
              <Badge size={size === 'lg' ? 'sm' : 'lg'} tone="default">
                override → {size === 'lg' ? 'sm' : 'lg'}
              </Badge>
            </Flex.Row>
          </SizeContext.Provider>
        </Flex.Column>
      ))}
    </Flex.Column>
  ),
};
