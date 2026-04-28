import { Box, HStack, VStack, Text } from '@/common/components/primitive';
import { Icons } from '@/common/components/ui/icon';
import { SizeContext } from '@/common/hooks';

import { IconButton, useIconButton } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof IconButton> = {
  title: 'UI/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'radio',
      options: ['solid', 'elevated', 'outline', 'ghost'],
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
    tone: 'default',
    icon: <Icons.Search />,
  },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Default: Story = {};

const VARIANTS = ['solid', 'elevated', 'outline', 'ghost'] as const;
const COLORS = ['primary', 'secondary', 'tertiary'] as const;
const TONES = ['default', 'weak', 'contrast'] as const;
const SIZES = ['sm', 'md', 'lg'] as const;

export const Overview: Story = {
  render: () => (
    <VStack gap={6}>
      {VARIANTS.map((variant) => (
        <VStack key={variant} gap={2}>
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
                  <IconButton
                    key={tone}
                    variant={variant}
                    color={color}
                    tone={tone}
                    icon={<Icons.Search />}
                  />
                ))}
              </>
            ))}
          </Box>
        </VStack>
      ))}
    </VStack>
  ),
};

export const Sizes: Story = {
  render: () => (
    <VStack gap={3}>
      {SIZES.map((size) => (
        <HStack key={size} gap={2} className="items-center">
          <Text size="xs" color="neutral-text-weak" className="w-6 font-semibold">
            {size}
          </Text>
          <IconButton size={size} tone="default" icon={<Icons.Search />} />
          <IconButton size={size} variant="outline" tone="default" icon={<Icons.Plus />} />
          <IconButton
            size={size}
            variant="ghost"
            color="tertiary"
            tone="default"
            icon={<Icons.Trash />}
          />
        </HStack>
      ))}
    </VStack>
  ),
};

export const ContextPropagation: Story = {
  render: () => (
    <VStack gap={4}>
      {SIZES.map((size) => (
        <VStack key={size} gap={1}>
          <Text size="xs" color="neutral-text-weak" className="font-semibold">
            SizeContext: {size}
          </Text>
          <SizeContext.Provider value={size}>
            <HStack gap={2} className="items-center">
              <IconButton tone="default" icon={<Icons.Search />} />
              <IconButton variant="outline" tone="default" icon={<Icons.Plus />} />
            </HStack>
          </SizeContext.Provider>
        </VStack>
      ))}
    </VStack>
  ),
};

export const StateAPI: Story = {
  render: () => {
    const store = useIconButton();
    return (
      <HStack gap={8} className="items-start">
        <IconButton store={store} tone="default" icon={<Icons.Search />} />
        <VStack gap={2}>
          <Text size="xs" color="neutral-text-weak" className="font-semibold">
            store.state
          </Text>
          {(['hovered', 'focused', 'active', 'disabled'] as const).map((key) => (
            <Text key={key} size="xs" color="neutral-text-weak">
              {key}: {String(store.get((s) => s[key]))}
            </Text>
          ))}
        </VStack>
      </HStack>
    );
  },
};
