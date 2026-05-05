import { useState } from 'react';

import { HStack, VStack, Label, Text } from '@/common/components/primitive';
import { Toggle } from '@/common/components/ui/toggle';
import { SizeContext } from '@/common/hooks';
import { cn } from '@/common/utils';

import { Switch, useSwitch } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Switch> = {
  title: 'UI/Switch',
  component: Switch,
  tags: ['autodocs'],
  argTypes: {
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
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {};

const COLORS = ['primary', 'secondary', 'tertiary'] as const;
const TONES = ['default', 'weak', 'contrast'] as const;
const SIZES = ['sm', 'md', 'lg'] as const;

export const Overview: Story = {
  render: () => (
    <VStack gap={4}>
      {COLORS.map((color) => (
        <HStack key={color} gap={4} className="items-center">
          <Text size="xs" color="neutral-text-weak" className="w-16 font-semibold">
            {color}
          </Text>
          {TONES.map((tone) => (
            <HStack key={tone} gap={2} className="items-center">
              <Switch color={color} tone={tone} defaultChecked />
              <Switch color={color} tone={tone} />
            </HStack>
          ))}
        </HStack>
      ))}
    </VStack>
  ),
};

export const Sizes: Story = {
  render: () => (
    <VStack gap={3}>
      {SIZES.map((size) => (
        <HStack key={size} gap={3} className="items-center">
          <Text size="xs" color="neutral-text-weak" className="w-6 font-semibold">
            {size}
          </Text>
          <Switch size={size} tone="default" defaultChecked />
          <Switch size={size} tone="default" />
          <Switch size={size} tone="default" disabled defaultChecked />
          <Switch size={size} tone="default" disabled />
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
            <HStack gap={3} className="items-center">
              <Switch tone="default" defaultChecked />
              <Switch tone="default" />
            </HStack>
          </SizeContext.Provider>
        </VStack>
      ))}
    </VStack>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <VStack gap={3} className="items-start">
        <Switch checked={checked} onChange={setChecked} tone="default" />
        <Text size="xs" color="neutral-text-weak">
          상태: {checked ? '켜짐' : '꺼짐'}
        </Text>
      </VStack>
    );
  },
};

export const StateAPI: Story = {
  render: () => {
    const store = useSwitch();
    return (
      <HStack gap={8} className="items-start">
        <Switch store={store} tone="default" />
        <VStack gap={2}>
          <Text size="xs" color="neutral-text-weak" className="font-semibold">
            store.state
          </Text>
          {(['hovered', 'focused', 'active', 'checked', 'disabled'] as const).map((key) => (
            <Text key={key} size="xs" color="neutral-text-weak">
              {key}: {String(store.get((s) => s[key]))}
            </Text>
          ))}
        </VStack>
        <VStack gap={2}>
          <Text size="xs" color="neutral-text-weak" className="font-semibold">
            store.set()
          </Text>
          <Toggle
            size="sm"
            pressed={store.get((s) => s.checked)}
            onPressedChange={(v) => store.set({ checked: v })}
          >
            checked 토글
          </Toggle>
          <Toggle
            size="sm"
            pressed={store.get((s) => s.disabled)}
            onPressedChange={(v) => store.set({ disabled: v })}
          >
            disabled 토글
          </Toggle>
        </VStack>
      </HStack>
    );
  },
};

export const WithCustomThumb: Story = {
  render: () => (
    <VStack gap={4}>
      <VStack gap={1}>
        <Text size="xs" color="neutral-text-weak" className="font-semibold">
          기본 Thumb
        </Text>
        <Switch tone="default" defaultChecked />
      </VStack>
      <VStack gap={1}>
        <Text size="xs" color="neutral-text-weak" className="font-semibold">
          asChild — 그라디언트 Thumb
        </Text>
        <Switch tone="default" defaultChecked>
          <Switch.Thumb asChild>
            <span className={cn('bg-linear-to-br from-white to-neutral-200')} />
          </Switch.Thumb>
        </Switch>
      </VStack>
      <VStack gap={1}>
        <Text size="xs" color="neutral-text-weak" className="font-semibold">
          asChild — 테두리 Thumb
        </Text>
        <Switch tone="default" defaultChecked>
          <Switch.Thumb asChild>
            <span className={cn('outline-accent bg-white outline-2 -outline-offset-2')} />
          </Switch.Thumb>
        </Switch>
      </VStack>
    </VStack>
  ),
};

export const WithLabel: Story = {
  render: () => {
    const [notifications, setNotifications] = useState(true);
    const [marketing, setMarketing] = useState(false);
    const [updates, setUpdates] = useState(true);

    return (
      <VStack gap={4} className="w-72">
        {(
          [
            {
              id: 'notifications',
              label: '알림',
              checked: notifications,
              onChange: setNotifications,
            },
            { id: 'marketing', label: '마케팅 수신', checked: marketing, onChange: setMarketing },
            { id: 'updates', label: '업데이트 알림', checked: updates, onChange: setUpdates },
          ] as const
        ).map(({ id, label, checked, onChange }) => (
          <HStack key={id} className="items-center justify-between">
            <Label htmlFor={id}>{label}</Label>
            <Switch id={id} tone="default" checked={checked} onChange={onChange} />
          </HStack>
        ))}
      </VStack>
    );
  },
};
