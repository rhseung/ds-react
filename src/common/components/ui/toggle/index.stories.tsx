import { useState } from 'react';

import { IconBold, IconItalic, IconUnderline } from '@tabler/icons-react';
import { Controller, useForm } from 'react-hook-form';

import { Box, Flex, Label, Text } from '@/common/components/primitive';
import { Button } from '@/common/components/ui/button';
import { SizeContext } from '@/common/hooks';

import { Toggle } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Toggle> = {
  title: 'UI/Toggle',
  component: Toggle,
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
    tone: 'default',
    children: '굵게',
  },
};

export default meta;
type Story = StoryObj<typeof Toggle>;

export const Default: Story = {};

const VARIANTS = ['solid', 'solid-elevated', 'outline', 'ghost'] as const;
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
                  <Toggle key={tone} variant={variant} color={color} tone={tone} defaultPressed>
                    확인
                  </Toggle>
                ))}
              </>
            ))}
          </Box>
        </Flex.Column>
      ))}
    </Flex.Column>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [pressed, setPressed] = useState(false);
    return (
      <Flex.Column gap={3} className="w-48">
        <Toggle pressed={pressed} onPressedChange={setPressed} tone="default">
          {pressed ? '눌림' : '안 눌림'}
        </Toggle>
        <Text size="xs" color="neutral-text-weak">
          상태: {String(pressed)}
        </Text>
      </Flex.Column>
    );
  },
};

type NotificationSettings = {
  marketing: boolean;
  updates: boolean;
  security: boolean;
};

export const WithReactHookForm: Story = {
  render: () => {
    const { control, handleSubmit, watch } = useForm<NotificationSettings>({
      defaultValues: { marketing: false, updates: true, security: true },
    });

    const onSubmit = (data: NotificationSettings) => alert(JSON.stringify(data, null, 2));
    const values = watch();

    return (
      <form onSubmit={handleSubmit(onSubmit)} className="flex w-72 flex-col gap-4">
        {(
          [
            { name: 'marketing', label: '마케팅 알림' },
            { name: 'updates', label: '업데이트 알림' },
            { name: 'security', label: '보안 알림' },
          ] as const
        ).map(({ name, label }) => (
          <div key={name} className="flex items-center justify-between">
            <Label htmlFor={name}>{label}</Label>
            <Controller
              name={name}
              control={control}
              render={({ field }) => (
                <Toggle
                  id={name}
                  variant="outline"
                  tone="default"
                  size="md"
                  pressed={field.value}
                  onPressedChange={field.onChange}
                >
                  {values[name] ? 'ON' : 'OFF'}
                </Toggle>
              )}
            />
          </div>
        ))}
        <Button type="submit" tone="default">
          저장
        </Button>
      </form>
    );
  },
};

export const ToolbarGroup: Story = {
  render: () => {
    const [bold, setBold] = useState(false);
    const [italic, setItalic] = useState(false);
    const [underline, setUnderline] = useState(false);

    return (
      <Flex.Row gap={1}>
        <Toggle icon variant="ghost" tone="default" pressed={bold} onPressedChange={setBold}>
          <IconBold size={16} />
        </Toggle>
        <Toggle icon variant="ghost" tone="default" pressed={italic} onPressedChange={setItalic}>
          <IconItalic size={16} />
        </Toggle>
        <Toggle
          icon
          variant="ghost"
          tone="default"
          pressed={underline}
          onPressedChange={setUnderline}
        >
          <IconUnderline size={16} />
        </Toggle>
      </Flex.Row>
    );
  },
};

export const Sizes: Story = {
  render: () => (
    <Flex.Column gap={3}>
      {SIZES.map((size) => (
        <Flex.Row key={size} gap={2} className="items-center">
          <Text size="xs" color="neutral-text-weak" className="w-6 font-semibold">
            {size}
          </Text>
          <Toggle size={size} tone="default" defaultPressed>
            굵게
          </Toggle>
          <Toggle size={size} icon tone="default" defaultPressed>
            <IconBold size={16} />
          </Toggle>
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
              <Toggle tone="default" defaultPressed>
                굵게
              </Toggle>
              <Toggle icon tone="default" defaultPressed>
                <IconBold size={16} />
              </Toggle>
            </Flex.Row>
          </SizeContext.Provider>
        </Flex.Column>
      ))}
    </Flex.Column>
  ),
};
