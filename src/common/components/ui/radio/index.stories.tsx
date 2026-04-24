import { useState } from 'react';

import { HStack, Label, Text, VStack } from '@/common/components/primitive';
import { Toggle } from '@/common/components/ui/toggle';
import { SizeContext } from '@/common/hooks';
import { cn } from '@/common/utils';

import { useRadio } from './use-radio';

import { Radio } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Radio> = {
  title: 'UI/Radio',
  component: Radio,
  tags: ['autodocs'],
  argTypes: {
    checked: { control: 'boolean' },
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
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof Radio>;

export const Default: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(args.checked ?? false);
    return <Radio {...args} checked={checked} onChange={setChecked} />;
  },
};

const SIZES = ['sm', 'md', 'lg'] as const;
const COLORS = ['primary', 'secondary', 'tertiary'] as const;

export const States: Story = {
  render: () => (
    <VStack gap={3}>
      <HStack gap={2} className="items-center">
        <Radio id="unchecked" />
        <Label htmlFor="unchecked">미선택</Label>
      </HStack>
      <HStack gap={2} className="items-center">
        <Radio id="checked" defaultChecked />
        <Label htmlFor="checked">선택됨</Label>
      </HStack>
      <HStack gap={2} className="items-center">
        <Radio id="disabled" disabled />
        <Label htmlFor="disabled">비활성</Label>
      </HStack>
      <HStack gap={2} className="items-center">
        <Radio id="disabled-checked" disabled defaultChecked />
        <Label htmlFor="disabled-checked">비활성 (선택됨)</Label>
      </HStack>
    </VStack>
  ),
};

export const Colors: Story = {
  render: () => (
    <VStack gap={3}>
      {COLORS.map((color) => (
        <HStack key={color} gap={4} className="items-center">
          <Text size="xs" color="neutral-text-weak" className="w-16 font-semibold">
            {color}
          </Text>
          <Radio color={color} defaultChecked />
        </HStack>
      ))}
    </VStack>
  ),
};

export const Sizes: Story = {
  render: () => (
    <VStack gap={3}>
      {SIZES.map((size) => (
        <HStack key={size} gap={4} className="items-center">
          <Text size="xs" color="neutral-text-weak" className="w-6 font-semibold">
            {size}
          </Text>
          <Radio size={size} />
          <Radio size={size} defaultChecked />
        </HStack>
      ))}
    </VStack>
  ),
};

export const IndicatorAsChild: Story = {
  render: () => (
    <VStack gap={4}>
      <VStack gap={1}>
        <Text size="xs" color="neutral-text-weak" className="font-semibold">
          기본 — 선택 시 dot 표시
        </Text>
        <HStack gap={3} className="items-center">
          <Radio />
          <Radio defaultChecked />
          <Radio disabled />
          <Radio disabled defaultChecked />
        </HStack>
      </VStack>
      <VStack gap={1}>
        <Text size="xs" color="neutral-text-weak" className="font-semibold">
          asChild — 커스텀 엘리먼트로 교체
        </Text>
        <HStack gap={3} className="items-center">
          <Radio defaultChecked>
            <Radio.Indicator asChild>
              <span style={{ fontSize: 10 }}>★</span>
            </Radio.Indicator>
          </Radio>
        </HStack>
      </VStack>
    </VStack>
  ),
};

export const StateAPI: Story = {
  render: () => {
    const store = useRadio({ defaultChecked: false });
    return (
      <VStack gap={8} className="items-start">
        <HStack gap={8} className="items-start">
          <VStack gap={2}>
            <Radio id="store" store={store} />
            <Label htmlFor="store">라디오</Label>
          </VStack>
          <VStack gap={2}>
            <Text size="xs" color="neutral-text-weak" className="font-semibold">
              store.state
            </Text>
            <VStack gap={1}>
              {(['hovered', 'focused', 'active', 'checked', 'disabled'] as const).map((key) => (
                <Text key={key} size="xs" color="neutral-text-weak">
                  {key}: {String(store.get((s) => s[key]))}
                </Text>
              ))}
            </VStack>
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

        <VStack gap={4}>
          <VStack gap={1}>
            <Text size="xs" color="neutral-text-weak" className="font-semibold">
              className 함수 — 선택 시 ring 추가
            </Text>
            <Radio
              defaultChecked
              className={(state) => cn(state.checked && 'ring-accent ring-2 ring-offset-2')}
            />
          </VStack>
        </VStack>
      </VStack>
    );
  },
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
            <HStack gap={4} className="items-center">
              <Radio />
              <Radio defaultChecked />
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
      <VStack gap={3} className="w-48">
        <HStack gap={2} className="items-center">
          <Radio id="ctrl" checked={checked} onChange={setChecked} />
          <Label htmlFor="ctrl">{checked ? '선택됨' : '미선택'}</Label>
        </HStack>
        <Text size="xs" color="neutral-text-weak">
          상태: {String(checked)}
        </Text>
      </VStack>
    );
  },
};
