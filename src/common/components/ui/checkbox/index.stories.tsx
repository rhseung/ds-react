import { useState } from 'react';

import { Controller, useForm } from 'react-hook-form';

import { Flex, Label, Text } from '@/common/components/primitive';
import { Button } from '@/common/components/ui/button';
import { SizeContext } from '@/common/hooks';

import { Checkbox } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Checkbox> = {
  title: 'UI/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    checked: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    disabled: { control: 'boolean' },
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
    checked: false,
    indeterminate: false,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(args.checked ?? false);
    return <Checkbox {...args} checked={checked} onChange={setChecked} />;
  },
};

const SIZES = ['sm', 'md', 'lg'] as const;
const COLORS = ['primary', 'secondary', 'tertiary'] as const;

export const States: Story = {
  render: () => (
    <Flex.Column gap={3}>
      <Flex.Row gap={2} className="items-center">
        <Checkbox id="unchecked" />
        <Label htmlFor="unchecked">미체크</Label>
      </Flex.Row>
      <Flex.Row gap={2} className="items-center">
        <Checkbox id="checked" defaultChecked />
        <Label htmlFor="checked">체크됨</Label>
      </Flex.Row>
      <Flex.Row gap={2} className="items-center">
        <Checkbox id="indeterminate" indeterminate />
        <Label htmlFor="indeterminate">불확정</Label>
      </Flex.Row>
      <Flex.Row gap={2} className="items-center">
        <Checkbox id="disabled" disabled />
        <Label htmlFor="disabled">비활성</Label>
      </Flex.Row>
      <Flex.Row gap={2} className="items-center">
        <Checkbox id="disabled-checked" disabled defaultChecked />
        <Label htmlFor="disabled-checked">비활성 (체크됨)</Label>
      </Flex.Row>
    </Flex.Column>
  ),
};

export const Colors: Story = {
  render: () => (
    <Flex.Column gap={3}>
      {COLORS.map((color) => (
        <Flex.Row key={color} gap={4} className="items-center">
          <Text size="xs" color="neutral-text-weak" className="w-16 font-semibold">
            {color}
          </Text>
          <Checkbox color={color} defaultChecked />
          <Checkbox color={color} indeterminate />
        </Flex.Row>
      ))}
    </Flex.Column>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Flex.Column gap={3}>
      {SIZES.map((size) => (
        <Flex.Row key={size} gap={4} className="items-center">
          <Text size="xs" color="neutral-text-weak" className="w-6 font-semibold">
            {size}
          </Text>
          <Checkbox size={size} />
          <Checkbox size={size} defaultChecked />
          <Checkbox size={size} indeterminate />
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
            <Flex.Row gap={4} className="items-center">
              <Checkbox />
              <Checkbox defaultChecked />
            </Flex.Row>
          </SizeContext.Provider>
        </Flex.Column>
      ))}
    </Flex.Column>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <Flex.Column gap={3} className="w-48">
        <Flex.Row gap={2} className="items-center">
          <Checkbox id="ctrl" checked={checked} onChange={setChecked} />
          <Label htmlFor="ctrl">{checked ? '체크됨' : '미체크'}</Label>
        </Flex.Row>
        <Text size="xs" color="neutral-text-weak">
          상태: {String(checked)}
        </Text>
      </Flex.Column>
    );
  },
};

export const Indeterminate: Story = {
  render: () => {
    const [items, setItems] = useState([false, false, false]);
    const allChecked = items.every(Boolean);
    const someChecked = items.some(Boolean) && !allChecked;

    const toggleAll = () => setItems(items.map(() => !allChecked));
    const toggle = (i: number) => setItems(items.map((v, idx) => (idx === i ? !v : v)));

    return (
      <Flex.Column gap={2}>
        <Flex.Row gap={2} className="items-center">
          <Checkbox
            id="all"
            checked={allChecked}
            indeterminate={someChecked}
            onChange={toggleAll}
          />
          <Label htmlFor="all" className="font-semibold">
            전체 선택
          </Label>
        </Flex.Row>
        <Flex.Column gap={2} className="pl-6">
          {['항목 A', '항목 B', '항목 C'].map((label, i) => (
            <Flex.Row key={label} gap={2} className="items-center">
              <Checkbox id={label} checked={items[i]} onChange={() => toggle(i)} />
              <Label htmlFor={label}>{label}</Label>
            </Flex.Row>
          ))}
        </Flex.Column>
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
    const { control, handleSubmit } = useForm<NotificationSettings>({
      defaultValues: { marketing: false, updates: true, security: true },
    });

    const onSubmit = (data: NotificationSettings) => alert(JSON.stringify(data, null, 2));

    return (
      <form onSubmit={handleSubmit(onSubmit)} className="flex w-72 flex-col gap-4">
        {(
          [
            { name: 'marketing', label: '마케팅 알림 수신' },
            { name: 'updates', label: '업데이트 알림 수신' },
            { name: 'security', label: '보안 알림 수신' },
          ] as const
        ).map(({ name, label }) => (
          <Flex.Row key={name} gap={2} className="items-center">
            <Controller
              name={name}
              control={control}
              render={({ field }) => (
                <Checkbox id={name} checked={field.value} onChange={field.onChange} />
              )}
            />
            <Label htmlFor={name}>{label}</Label>
          </Flex.Row>
        ))}
        <Button type="submit" tone="default">
          저장
        </Button>
      </form>
    );
  },
};
