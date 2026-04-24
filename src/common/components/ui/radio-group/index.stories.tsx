import { useState } from 'react';

import { Label, Text, VStack } from '@/common/components/primitive';
import { Button } from '@/common/components/ui/button';

import { RadioGroup, useRadioGroup } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta = {
  title: 'UI/RadioGroup',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

type Lang = 'ko' | 'en' | 'ja';
const LANG_LABELS: Record<Lang, string> = { ko: '한국어', en: 'English', ja: '日本語' };
const LANGS = Object.keys(LANG_LABELS) as Lang[];

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<Lang>('ko');

    return (
      <VStack gap={2}>
        <RadioGroup<Lang> value={value} onChange={setValue}>
          {({ Item }) =>
            LANGS.map((lang) => (
              <Label key={lang} className="flex items-center gap-2">
                <Item value={lang} />
                {LANG_LABELS[lang]}
              </Label>
            ))
          }
        </RadioGroup>
        <Text size="xs" color="neutral-text-weak">
          선택됨: {value}
        </Text>
      </VStack>
    );
  },
};

export const Uncontrolled: Story = {
  render: () => (
    <RadioGroup<Lang> defaultValue="en">
      {({ Item }) =>
        LANGS.map((lang) => (
          <Label key={lang} className="flex items-center gap-2">
            <Item value={lang} />
            {LANG_LABELS[lang]}
          </Label>
        ))
      }
    </RadioGroup>
  ),
};

export const WithCustomIndicator: Story = {
  render: () => {
    const [value, setValue] = useState<Lang>('ko');

    return (
      <VStack gap={2}>
        <RadioGroup<Lang> value={value} onChange={setValue}>
          {({ Item }) =>
            LANGS.map((lang) => (
              <Label key={lang} className="flex items-center gap-2">
                <Item value={lang}>
                  <Item.Indicator asChild>
                    <span style={{ fontSize: 10 }}>★</span>
                  </Item.Indicator>
                </Item>
                {LANG_LABELS[lang]}
              </Label>
            ))
          }
        </RadioGroup>
        <Text size="xs" color="neutral-text-weak">
          선택됨: {value}
        </Text>
      </VStack>
    );
  },
};

export const StaticChildren: Story = {
  render: () => {
    const [value, setValue] = useState<Lang>('ko');

    return (
      <VStack gap={2}>
        <RadioGroup defaultValue="ko" onChange={(v) => setValue(v as Lang)}>
          {LANGS.map((lang) => (
            <Label key={lang} className="flex items-center gap-2">
              <RadioGroup.Item value={lang} />
              {LANG_LABELS[lang]}
            </Label>
          ))}
        </RadioGroup>
        <Text size="xs" color="neutral-text-weak">
          선택됨: {value}
        </Text>
      </VStack>
    );
  },
};

export const TypeSafety: Story = {
  render: () => (
    <VStack gap={2}>
      <Text size="xs" color="neutral-text-weak">
        value=&quot;zh&quot;는 Lang가 아니므로 컴파일 에러 발생 (타입 안전성 확인용)
      </Text>
      <RadioGroup<Lang> defaultValue="ko">
        {({ Item }) => (
          <Label className="flex items-center gap-2">
            <Item value="ko" />
            한국어
          </Label>
        )}
      </RadioGroup>
    </VStack>
  ),
};

export const WithDisabledItem: Story = {
  render: () => {
    const [value, setValue] = useState<Lang>('ko');

    return (
      <VStack gap={2}>
        <RadioGroup<Lang> value={value} onChange={setValue}>
          {({ Item }) =>
            LANGS.map((lang) => (
              <Label key={lang} className="flex items-center gap-2">
                <Item value={lang} disabled={lang === 'ja'} />
                {LANG_LABELS[lang]}
                {lang === 'ja' && (
                  <Text size="xs" color="neutral-text-weak">
                    (비활성)
                  </Text>
                )}
              </Label>
            ))
          }
        </RadioGroup>
        <Text size="xs" color="neutral-text-weak">
          선택됨: {value}
        </Text>
      </VStack>
    );
  },
};

export const NoInitialValue: Story = {
  render: () => {
    const [value, setValue] = useState<Lang | undefined>(undefined);

    return (
      <VStack gap={2}>
        <RadioGroup<Lang> value={value} onChange={setValue}>
          {({ Item }) =>
            LANGS.map((lang) => (
              <Label key={lang} className="flex items-center gap-2">
                <Item value={lang} />
                {LANG_LABELS[lang]}
              </Label>
            ))
          }
        </RadioGroup>
        <Text size="xs" color="neutral-text-weak">
          선택됨: {value ?? '없음'}
        </Text>
      </VStack>
    );
  },
};

export const WithColors: Story = {
  render: () => {
    const [value, setValue] = useState<Lang>('ko');

    return (
      <VStack gap={2}>
        <RadioGroup<Lang> value={value} onChange={setValue}>
          {({ Item }) =>
            LANGS.map((lang) => (
              <Label key={lang} className="flex items-center gap-2">
                <Item value={lang} color="secondary" />
                {LANG_LABELS[lang]}
              </Label>
            ))
          }
        </RadioGroup>
        <Text size="xs" color="neutral-text-weak">
          선택됨: {value}
        </Text>
      </VStack>
    );
  },
};

export const WithStore: Story = {
  render: () => {
    const store = useRadioGroup<Lang>({ defaultValue: 'ko' });
    const { value } = store.get();

    return (
      <VStack gap={2}>
        <RadioGroup store={store}>
          {({ Item }) =>
            LANGS.map((lang) => (
              <Label key={lang} className="flex items-center gap-2">
                <Item value={lang} />
                {LANG_LABELS[lang]}
              </Label>
            ))
          }
        </RadioGroup>
        <Text size="xs" color="neutral-text-weak">
          선택됨: {value ?? '없음'}
        </Text>
        <VStack gap={2} className="flex-row">
          {LANGS.map((lang) => (
            <Button key={lang} size="sm" onClick={() => store.select(lang)}>
              {LANG_LABELS[lang]} 선택
            </Button>
          ))}
        </VStack>
      </VStack>
    );
  },
};
