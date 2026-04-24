import { useState } from 'react';

import { Label, Text, VStack } from '@/common/components/primitive';

import { CheckboxGroup } from '.';

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
    const [values, setValues] = useState<Fruit[]>(['banana']);

    return (
      <VStack gap={2}>
        <CheckboxGroup<Fruit> value={values} onChange={setValues}>
          {({ Item }) =>
            FRUITS.map((fruit) => (
              <Label key={fruit} className="flex items-center gap-2">
                <Item value={fruit} />
                {FRUIT_LABELS[fruit]}
              </Label>
            ))
          }
        </CheckboxGroup>
        <Text size="xs" color="neutral-text-weak">
          선택됨: {values.join(', ') || '없음'}
        </Text>
      </VStack>
    );
  },
};

export const WithAll: Story = {
  render: () => {
    const [values, setValues] = useState<Fruit[]>([]);

    return (
      <VStack gap={2}>
        <CheckboxGroup<Fruit> value={values} onChange={setValues}>
          {({ Item, All }) => (
            <>
              <Label className="flex items-center gap-2 font-semibold">
                <All />
                전체 선택
              </Label>
              <VStack gap={2} className="pl-6">
                {FRUITS.map((fruit) => (
                  <Label key={fruit} className="flex items-center gap-2">
                    <Item value={fruit} />
                    {FRUIT_LABELS[fruit]}
                  </Label>
                ))}
              </VStack>
            </>
          )}
        </CheckboxGroup>
        <Text size="xs" color="neutral-text-weak">
          선택됨: {values.join(', ') || '없음'}
        </Text>
      </VStack>
    );
  },
};

export const Uncontrolled: Story = {
  render: () => (
    <CheckboxGroup<Fruit> defaultValue={['apple']}>
      {({ Item }) =>
        FRUITS.map((fruit) => (
          <Label key={fruit} className="flex items-center gap-2">
            <Item value={fruit} />
            {FRUIT_LABELS[fruit]}
          </Label>
        ))
      }
    </CheckboxGroup>
  ),
};

export const WithCustomIndicator: Story = {
  render: () => {
    const [values, setValues] = useState<Fruit[]>(['banana']);

    return (
      <VStack gap={2}>
        <CheckboxGroup<Fruit> value={values} onChange={setValues}>
          {({ Item, All }) => (
            <>
              <Label className="flex items-center gap-2 font-semibold">
                <All>
                  {(state) =>
                    state.indeterminate ? (
                      <span style={{ fontSize: 10 }}>—</span>
                    ) : state.checked ? (
                      <span style={{ fontSize: 10 }}>★</span>
                    ) : null
                  }
                </All>
                전체 선택
              </Label>
              <VStack gap={2} className="pl-6">
                {FRUITS.map((fruit) => (
                  <Label key={fruit} className="flex items-center gap-2">
                    <Item value={fruit}>
                      {(state) => (state.checked ? <span style={{ fontSize: 10 }}>★</span> : null)}
                    </Item>
                    {FRUIT_LABELS[fruit]}
                  </Label>
                ))}
              </VStack>
            </>
          )}
        </CheckboxGroup>
        <Text size="xs" color="neutral-text-weak">
          선택됨: {values.join(', ') || '없음'}
        </Text>
      </VStack>
    );
  },
};

export const TypeSafety: Story = {
  render: () => (
    <VStack gap={2}>
      <Text size="xs" color="neutral-text-weak">
        value=&quot;mango&quot;는 Fruit가 아니므로 컴파일 에러 발생 (타입 안전성 확인용)
      </Text>
      <CheckboxGroup<Fruit>>
        {({ Item }) => (
          <Label className="flex items-center gap-2">
            <Item value="apple" />
            사과
          </Label>
        )}
      </CheckboxGroup>
    </VStack>
  ),
};
