import { useState } from 'react';

import { Label, Text, VStack } from '@/common/components/primitive';

import { useCheckboxGroup } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta = {
  title: 'UI/CheckboxGroup',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

type Fruit = 'apple' | 'banana' | 'cherry';
const FRUIT_LABELS: Record<Fruit, string> = { apple: '사과', banana: '바나나', cherry: '체리' };
const FRUITS = Object.keys(FRUIT_LABELS) as Fruit[];

export const Default: Story = {
  render: () => {
    const checkbox = useCheckboxGroup<Fruit>();
    const [values, setValues] = useState<Fruit[]>(['banana']);

    return (
      <VStack gap={2}>
        <checkbox.Group value={values} onChange={setValues}>
          {FRUITS.map((fruit) => (
            <Label key={fruit} className="flex items-center gap-2">
              <checkbox.Item value={fruit} />
              {FRUIT_LABELS[fruit]}
            </Label>
          ))}
        </checkbox.Group>
        <Text size="xs" color="neutral-text-weak">
          선택됨: {values.join(', ') || '없음'}
        </Text>
      </VStack>
    );
  },
};

export const WithAll: Story = {
  render: () => {
    const checkbox = useCheckboxGroup<Fruit>();
    const [values, setValues] = useState<Fruit[]>([]);

    return (
      <VStack gap={2}>
        <checkbox.Group value={values} onChange={setValues}>
          <Label className="flex items-center gap-2 font-semibold">
            <checkbox.All />
            전체 선택
          </Label>
          <VStack gap={2} className="pl-6">
            {FRUITS.map((fruit) => (
              <Label key={fruit} className="flex items-center gap-2">
                <checkbox.Item value={fruit} />
                {FRUIT_LABELS[fruit]}
              </Label>
            ))}
          </VStack>
        </checkbox.Group>
        <Text size="xs" color="neutral-text-weak">
          선택됨: {values.join(', ') || '없음'}
        </Text>
      </VStack>
    );
  },
};

export const Uncontrolled: Story = {
  render: () => {
    const checkbox = useCheckboxGroup<Fruit>();

    return (
      <checkbox.Group defaultValue={['apple']}>
        {FRUITS.map((fruit) => (
          <Label key={fruit} className="flex items-center gap-2">
            <checkbox.Item value={fruit} />
            {FRUIT_LABELS[fruit]}
          </Label>
        ))}
      </checkbox.Group>
    );
  },
};

export const TypeSafety: Story = {
  render: () => {
    const checkbox = useCheckboxGroup<Fruit>();

    return (
      <VStack gap={2}>
        <Text size="xs" color="neutral-text-weak">
          value=&quot;mango&quot;는 Fruit가 아니므로 컴파일 에러 발생 (타입 안전성 확인용)
        </Text>
        <checkbox.Group>
          <Label className="flex items-center gap-2">
            <checkbox.Item value="apple" />
            사과
          </Label>
          {/* <checkbox.Item value="mango" /> */}
        </checkbox.Group>
      </VStack>
    );
  },
};
