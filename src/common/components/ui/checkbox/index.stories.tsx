import { useState } from 'react';

import { Controller, useForm } from 'react-hook-form';

import { HStack, VStack, Label, Text } from '@/common/components/primitive';
import { Button } from '@/common/components/ui/button';
import { RadioGroup } from '@/common/components/ui/radio-group';
import { SizeContext } from '@/common/hooks';
import { cn } from '@/common/utils';

import { useCheckbox } from './use-checkbox';

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
  render: ({ store: _, ...args }) => {
    const [checked, setChecked] = useState(args.checked ?? false);
    return <Checkbox {...args} checked={checked} onChange={setChecked} />;
  },
};

const SIZES = ['sm', 'md', 'lg'] as const;
const COLORS = ['primary', 'secondary', 'tertiary'] as const;

export const States: Story = {
  render: () => (
    <VStack gap={3}>
      <HStack gap={2} className="items-center">
        <Checkbox id="unchecked" />
        <Label htmlFor="unchecked">미체크</Label>
      </HStack>
      <HStack gap={2} className="items-center">
        <Checkbox id="checked" defaultChecked />
        <Label htmlFor="checked">체크됨</Label>
      </HStack>
      <HStack gap={2} className="items-center">
        <Checkbox id="indeterminate" indeterminate />
        <Label htmlFor="indeterminate">불확정</Label>
      </HStack>
      <HStack gap={2} className="items-center">
        <Checkbox id="disabled" disabled />
        <Label htmlFor="disabled">비활성</Label>
      </HStack>
      <HStack gap={2} className="items-center">
        <Checkbox id="disabled-checked" disabled defaultChecked />
        <Label htmlFor="disabled-checked">비활성 (체크됨)</Label>
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
          <Checkbox color={color} defaultChecked />
          <Checkbox color={color} indeterminate />
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
          <Checkbox size={size} />
          <Checkbox size={size} defaultChecked />
          <Checkbox size={size} indeterminate />
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
          기본 — 상태에 따라 아이콘 자동 전환
        </Text>
        <HStack gap={3} className="items-center">
          <Checkbox />
          <Checkbox defaultChecked />
          <Checkbox indeterminate />
          <Checkbox disabled />
          <Checkbox disabled defaultChecked />
        </HStack>
      </VStack>
      <VStack gap={1}>
        <Text size="xs" color="neutral-text-weak" className="font-semibold">
          asChild — 커스텀 엘리먼트로 아이콘 교체
        </Text>
        <HStack gap={3} className="items-center">
          <Checkbox defaultChecked>
            <Checkbox.Indicator asChild>
              <span style={{ fontSize: 10 }}>★</span>
            </Checkbox.Indicator>
          </Checkbox>
          <Checkbox indeterminate>
            <Checkbox.Indicator asChild>
              <span style={{ fontSize: 10 }}>–</span>
            </Checkbox.Indicator>
          </Checkbox>
          <Checkbox>
            <Checkbox.Indicator asChild>
              <span style={{ fontSize: 10 }}>✓</span>
            </Checkbox.Indicator>
          </Checkbox>
        </HStack>
      </VStack>
      <VStack gap={1}>
        <Text size="xs" color="neutral-text-weak" className="font-semibold">
          asChild — 크기별
        </Text>
        {SIZES.map((size) => (
          <HStack key={size} gap={3} className="items-center">
            <Text size="xs" color="neutral-text-weak" className="w-6 font-semibold">
              {size}
            </Text>
            <Checkbox size={size} defaultChecked>
              <Checkbox.Indicator asChild>
                <span style={{ fontSize: size === 'sm' ? 8 : size === 'md' ? 10 : 12 }}>★</span>
              </Checkbox.Indicator>
            </Checkbox>
            <Checkbox size={size} indeterminate>
              <Checkbox.Indicator asChild>
                <span style={{ fontSize: size === 'sm' ? 8 : size === 'md' ? 10 : 12 }}>–</span>
              </Checkbox.Indicator>
            </Checkbox>
          </HStack>
        ))}
      </VStack>
    </VStack>
  ),
};

export const StateAPI: Story = {
  render: () => {
    const store = useCheckbox({ defaultChecked: false });
    return (
      <VStack gap={8} className="items-start">
        <HStack gap={8} className="items-start">
          <VStack gap={2}>
            <Checkbox id="store" store={store} />
            <Label htmlFor="store">체크박스</Label>
          </VStack>
          <VStack gap={2}>
            <Text size="xs" color="neutral-text-weak" className="font-semibold">
              store.state
            </Text>
            <VStack gap={1}>
              {(
                ['hovered', 'focused', 'active', 'checked', 'indeterminate', 'disabled'] as const
              ).map((key) => (
                <Text key={key} size="xs" color="neutral-text-weak">
                  {key}: {String(store.get((s) => s[key]))}
                </Text>
              ))}
              <Text size="xs" color="neutral-text-weak">
                checked && !disabled: {String(store.get((s) => s.checked === true && !s.disabled))}
              </Text>
            </VStack>
          </VStack>
          <VStack gap={2}>
            <Text size="xs" color="neutral-text-weak" className="font-semibold">
              store.set()
            </Text>
            <RadioGroup<boolean>
              value={store.get((s) => s.checked === true)}
              onChange={(v) => store.set({ checked: v })}
            >
              {({ Item }) => (
                <HStack gap={2} className="items-center">
                  <Text size="xs" color="neutral-text-weak" className="w-24">
                    checked
                  </Text>
                  <Label className="flex items-center gap-1.5">
                    <Item value={true} size="sm" />
                    켜짐
                  </Label>
                  <Label className="flex items-center gap-1.5">
                    <Item value={false} size="sm" />
                    꺼짐
                  </Label>
                </HStack>
              )}
            </RadioGroup>
            <RadioGroup<boolean>
              value={store.get((s) => s.indeterminate === true)}
              onChange={(v) => store.set({ indeterminate: v })}
            >
              {({ Item }) => (
                <HStack gap={2} className="items-center">
                  <Text size="xs" color="neutral-text-weak" className="w-24">
                    indeterminate
                  </Text>
                  <Label className="flex items-center gap-1.5">
                    <Item value={true} size="sm" />
                    켜짐
                  </Label>
                  <Label className="flex items-center gap-1.5">
                    <Item value={false} size="sm" />
                    꺼짐
                  </Label>
                </HStack>
              )}
            </RadioGroup>
            <RadioGroup<boolean>
              value={store.get((s) => s.disabled)}
              onChange={(v) => store.set({ disabled: v })}
            >
              {({ Item }) => (
                <HStack gap={2} className="items-center">
                  <Text size="xs" color="neutral-text-weak" className="w-24">
                    disabled
                  </Text>
                  <Label className="flex items-center gap-1.5">
                    <Item value={true} size="sm" />
                    켜짐
                  </Label>
                  <Label className="flex items-center gap-1.5">
                    <Item value={false} size="sm" />
                    꺼짐
                  </Label>
                </HStack>
              )}
            </RadioGroup>
          </VStack>
        </HStack>

        <VStack gap={4}>
          <VStack gap={1}>
            <Text size="xs" color="neutral-text-weak" className="font-semibold">
              className 함수 — 체크 시 ring 추가
            </Text>
            <Checkbox
              defaultChecked
              className={(state) => cn(state.checked && 'ring-accent ring-2 ring-offset-2')}
            />
          </VStack>
          <VStack gap={1}>
            <Text size="xs" color="neutral-text-weak" className="font-semibold">
              style 함수 — 호버 시 scale 증가
            </Text>
            <Checkbox
              style={(state) => ({ transform: state.hovered ? 'scale(1.2)' : undefined })}
            />
          </VStack>
          <VStack gap={1}>
            <Text size="xs" color="neutral-text-weak" className="font-semibold">
              children 함수 — 상태에 따라 다른 콘텐츠
            </Text>
            <HStack gap={2} className="items-center">
              <Checkbox defaultChecked>
                {(state) =>
                  state.checked ? (
                    <Checkbox.Indicator />
                  ) : (
                    <span style={{ fontSize: 8, color: 'currentColor' }}>?</span>
                  )
                }
              </Checkbox>
              <Checkbox indeterminate>
                {(state) => (state.indeterminate ? <Checkbox.Indicator /> : null)}
              </Checkbox>
            </HStack>
          </VStack>
          <VStack gap={1}>
            <Text size="xs" color="neutral-text-weak" className="font-semibold">
              Indicator asChild — 커스텀 아이콘 교체
            </Text>
            <HStack gap={2} className="items-center">
              <Checkbox defaultChecked>
                <Checkbox.Indicator asChild>
                  <span style={{ fontSize: 10 }}>★</span>
                </Checkbox.Indicator>
              </Checkbox>
              <Checkbox indeterminate>
                <Checkbox.Indicator asChild>
                  <span style={{ fontSize: 10 }}>–</span>
                </Checkbox.Indicator>
              </Checkbox>
            </HStack>
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
              <Checkbox />
              <Checkbox defaultChecked />
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
          <Checkbox id="ctrl" checked={checked} onChange={setChecked} />
          <Label htmlFor="ctrl">{checked ? '체크됨' : '미체크'}</Label>
        </HStack>
        <Text size="xs" color="neutral-text-weak">
          상태: {String(checked)}
        </Text>
      </VStack>
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
      <VStack gap={2}>
        <HStack gap={2} className="items-center">
          <Checkbox
            id="all"
            checked={allChecked}
            indeterminate={someChecked}
            onChange={toggleAll}
          />
          <Label htmlFor="all" className="font-semibold">
            전체 선택
          </Label>
        </HStack>
        <VStack gap={2} className="pl-6">
          {['항목 A', '항목 B', '항목 C'].map((label, i) => (
            <HStack key={label} gap={2} className="items-center">
              <Checkbox id={label} checked={items[i]} onChange={() => toggle(i)} />
              <Label htmlFor={label}>{label}</Label>
            </HStack>
          ))}
        </VStack>
      </VStack>
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
          <HStack key={name} gap={2} className="items-center">
            <Controller
              name={name}
              control={control}
              render={({ field }) => (
                <Checkbox id={name} checked={field.value} onChange={field.onChange} />
              )}
            />
            <Label htmlFor={name}>{label}</Label>
          </HStack>
        ))}
        <Button type="submit" tone="default">
          저장
        </Button>
      </form>
    );
  },
};
