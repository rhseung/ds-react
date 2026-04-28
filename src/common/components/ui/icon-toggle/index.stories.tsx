import { useState } from 'react';

import { HStack, VStack, Text } from '@/common/components/primitive';
import { Icons } from '@/common/components/ui/icon';
import { SizeContext } from '@/common/hooks';

import { IconToggle, useIconToggle } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof IconToggle> = {
  title: 'UI/IconToggle',
  component: IconToggle,
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
    icon: <Icons.Bold />,
  },
};

export default meta;
type Story = StoryObj<typeof IconToggle>;

export const Default: Story = {};

const SIZES = ['sm', 'md', 'lg'] as const;

export const ToolbarGroup: Story = {
  render: () => {
    const [bold, setBold] = useState(false);
    const [italic, setItalic] = useState(false);
    const [underline, setUnderline] = useState(false);

    return (
      <HStack gap={1}>
        <IconToggle
          variant="ghost"
          tone="default"
          pressed={bold}
          onPressedChange={setBold}
          icon={<Icons.Bold />}
        />
        <IconToggle
          variant="ghost"
          tone="default"
          pressed={italic}
          onPressedChange={setItalic}
          icon={<Icons.Italic />}
        />
        <IconToggle
          variant="ghost"
          tone="default"
          pressed={underline}
          onPressedChange={setUnderline}
          icon={<Icons.Underline />}
        />
      </HStack>
    );
  },
};

export const Sizes: Story = {
  render: () => (
    <VStack gap={3}>
      {SIZES.map((size) => (
        <HStack key={size} gap={2} className="items-center">
          <Text size="xs" color="neutral-text-weak" className="w-6 font-semibold">
            {size}
          </Text>
          <IconToggle size={size} tone="default" defaultPressed icon={<Icons.Bold />} />
          <IconToggle size={size} variant="outline" tone="default" icon={<Icons.Italic />} />
          <IconToggle size={size} variant="ghost" tone="default" icon={<Icons.Underline />} />
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
              <IconToggle tone="default" defaultPressed icon={<Icons.Bold />} />
              <IconToggle variant="outline" tone="default" icon={<Icons.Italic />} />
            </HStack>
          </SizeContext.Provider>
        </VStack>
      ))}
    </VStack>
  ),
};

export const StateAPI: Story = {
  render: () => {
    const store = useIconToggle();
    return (
      <HStack gap={8} className="items-start">
        <IconToggle store={store} tone="default" icon={<Icons.Bold />} />
        <VStack gap={2}>
          <Text size="xs" color="neutral-text-weak" className="font-semibold">
            store.state
          </Text>
          {(['hovered', 'focused', 'active', 'toggled', 'disabled'] as const).map((key) => (
            <Text key={key} size="xs" color="neutral-text-weak">
              {key}: {String(store.get((s) => s[key]))}
            </Text>
          ))}
        </VStack>
      </HStack>
    );
  },
};
