import { IconCheck, IconDownload, IconPlus, IconSearch, IconTrash } from '@tabler/icons-react';

import { Box, Flex, Text } from '@/common/components/primitive';
import { Badge } from '@/common/components/ui/badge';
import { Spinner } from '@/common/components/ui/spinner';
import { TextField } from '@/common/components/ui/text-field';
import { SizeContext } from '@/common/hooks';

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
      options: ['sm', 'md', 'lg'],
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
                  <Button key={tone} size="md" icon variant={variant} color={color} tone={tone}>
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
const SIZES = ['sm', 'md', 'lg'] as const;
const ICON_SIZE = { sm: 14, md: 16, lg: 18 } as const;

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
                    <IconCheck size={16} />
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

export const Sizes: Story = {
  render: () => (
    <Flex.Column gap={3}>
      {SIZES.map((size) => (
        <Flex.Row key={size} gap={2} className="items-center">
          <Text size="xs" color="neutral-text-weak" className="w-6 font-semibold">
            {size}
          </Text>
          <Button size={size} tone="default">
            <IconPlus size={ICON_SIZE[size]} />
            추가
          </Button>
          <Button size={size} variant="outline" tone="default">
            <IconDownload size={ICON_SIZE[size]} />
            내보내기
          </Button>
          <Button size={size} variant="ghost" color="tertiary" tone="default">
            <IconTrash size={ICON_SIZE[size]} />
            삭제
          </Button>
          <Button size={size} icon tone="default">
            <IconSearch size={ICON_SIZE[size]} />
          </Button>
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
              <Button tone="default">
                <IconPlus size={ICON_SIZE[size]} />
                추가
              </Button>
              <Button icon tone="default">
                <IconSearch size={ICON_SIZE[size]} />
              </Button>
              <TextField placeholder="텍스트 필드" tone="default" className="w-48" />
              <Badge tone="default">뱃지</Badge>
              <Spinner />
            </Flex.Row>
          </SizeContext.Provider>
        </Flex.Column>
      ))}
    </Flex.Column>
  ),
};
