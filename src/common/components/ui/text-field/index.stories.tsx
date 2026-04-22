import { useState } from 'react';

import {
  IconAt,
  IconCalendar,
  IconCurrencyWon,
  IconEye,
  IconEyeOff,
  IconFilter,
  IconHash,
  IconLink,
  IconLock,
  IconSearch,
  IconX,
} from '@tabler/icons-react';
import { useForm } from 'react-hook-form';

import { Box, HStack, VStack, Label, Text } from '@/common/components/primitive';
import { Button } from '@/common/components/ui/button';
import { Toggle } from '@/common/components/ui/toggle';
import { SizeContext } from '@/common/hooks';
import { cn } from '@/common/utils';

import { TextField, useTextField } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof TextField> = {
  title: 'UI/TextField',
  component: TextField,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'radio',
      options: ['outline', 'filled', 'underline'],
    },
    tone: {
      control: 'radio',
      options: ['default', 'weak', 'contrast'],
    },
    color: {
      control: 'radio',
      options: ['primary', 'secondary', 'tertiary'],
    },
  },
  args: {
    placeholder: '입력하세요',
    tone: 'default',
  },
};

export default meta;
type Story = StoryObj<typeof TextField>;

export const Default: Story = {};

const VARIANTS = ['outline', 'filled', 'underline'] as const;
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
                  <TextField
                    key={tone}
                    variant={variant}
                    color={color}
                    tone={tone}
                    placeholder="입력하세요"
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

export const Disabled: Story = {
  args: { disabled: true },
};

export const Sizes: Story = {
  render: () => (
    <VStack gap={3} className="w-72">
      {SIZES.map((size) => (
        <HStack key={size} gap={2} className="items-center">
          <Text size="xs" color="neutral-text-weak" className="w-6 font-semibold">
            {size}
          </Text>
          <TextField size={size} placeholder="입력하세요" tone="default" />
        </HStack>
      ))}
    </VStack>
  ),
};

function IconExamples({ variant }: { variant: (typeof VARIANTS)[number] }) {
  const [query, setQuery] = useState('');
  const [visible, setVisible] = useState(false);
  const iconClass = 'text-neutral-text-weak shrink-0';
  const iconBtnClass =
    'text-neutral-text-weak shrink-0 rounded-lg p-1 transition-colors bg-neutral-text/5 hover:bg-neutral-text/10 hover:text-neutral-text';

  return (
    <VStack gap={2} className="w-80">
      <TextField
        variant={variant}
        tone="default"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="검색하세요"
      >
        <IconSearch size={16} className={iconClass} />
        <TextField.Input />
        {query && (
          <button type="button" onClick={() => setQuery('')} className={iconBtnClass}>
            <IconX size={16} />
          </button>
        )}
      </TextField>

      <TextField variant={variant} tone="default" placeholder="필터 검색">
        <IconSearch size={16} className={iconClass} />
        <TextField.Input />
        <button type="button" className={iconBtnClass}>
          <IconFilter size={16} />
        </button>
        <button type="button" className={iconBtnClass}>
          <IconX size={16} />
        </button>
      </TextField>

      <TextField variant={variant} tone="default" placeholder="example@email.com">
        <IconAt size={16} className={iconClass} />
        <TextField.Input />
      </TextField>

      <TextField variant={variant} tone="default" placeholder="도메인 입력">
        <span className="text-neutral-text-weak shrink-0 text-sm">https://</span>
        <TextField.Input />
        <IconLink size={16} className={iconClass} />
      </TextField>

      <TextField
        variant={variant}
        tone="default"
        type={visible ? 'text' : 'password'}
        placeholder="비밀번호"
      >
        <IconLock size={16} className={iconClass} />
        <TextField.Input />
        <button type="button" onClick={() => setVisible((v) => !v)} className={iconBtnClass}>
          {visible ? <IconEyeOff size={16} /> : <IconEye size={16} />}
        </button>
      </TextField>

      <TextField variant={variant} tone="default" placeholder="0" type="number">
        <IconCurrencyWon size={16} className={iconClass} />
        <TextField.Input />
        <span className="text-neutral-text-weak shrink-0 text-sm">원</span>
      </TextField>

      <TextField variant={variant} tone="default" placeholder="0" type="number">
        <TextField.Input />
        <span className="text-neutral-text-weak shrink-0 text-sm">kg</span>
      </TextField>

      <TextField variant={variant} tone="default" placeholder="태그명">
        <IconHash size={16} className={iconClass} />
        <TextField.Input />
      </TextField>

      <TextField variant={variant} tone="default" placeholder="YYYY-MM-DD">
        <TextField.Input />
        <IconCalendar size={16} className={iconClass} />
      </TextField>
    </VStack>
  );
}

export const WithIcons: Story = {
  render: () => (
    <HStack gap={8} className="items-start">
      {VARIANTS.map((variant) => (
        <VStack key={variant} gap={2}>
          <Text size="xs" color="neutral-text-weak" className="font-semibold">
            {variant}
          </Text>
          <IconExamples variant={variant} />
        </VStack>
      ))}
    </HStack>
  ),
};

export const FormBinding: Story = {
  render: () => {
    const [value, setValue] = useState('');

    return (
      <VStack gap={6} className="w-72">
        <VStack gap={1}>
          <Text size="xs" color="neutral-text-weak" className="font-semibold">
            비제어
          </Text>
          <TextField name="username" placeholder="이름" defaultValue="홍길동" tone="default" />
        </VStack>

        <VStack gap={1}>
          <Text size="xs" color="neutral-text-weak" className="font-semibold">
            제어
          </Text>
          <TextField
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="입력하세요"
            tone="default"
          >
            <TextField.Input />
            <span className="text-neutral-text-weak shrink-0 text-xs">{value.length}</span>
          </TextField>
        </VStack>
      </VStack>
    );
  },
};

type FormValues = {
  email: string;
  password: string;
};

export const WithReactHookForm: Story = {
  render: () => {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<FormValues>();

    const onSubmit = (data: FormValues) => alert(JSON.stringify(data, null, 2));

    return (
      <form onSubmit={handleSubmit(onSubmit)} className="flex w-72 flex-col gap-4">
        <div className="flex flex-col gap-1">
          <Label htmlFor="email" required>
            이메일
          </Label>
          <TextField
            id="email"
            {...register('email', {
              required: '이메일을 입력하세요',
              pattern: { value: /\S+@\S+\.\S+/, message: '올바른 이메일 형식이 아닙니다' },
            })}
            placeholder="example@email.com"
            aria-invalid={!!errors.email}
            tone="default"
          />
          {errors.email && <p className="text-danger text-xs">{errors.email.message}</p>}
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="password" required>
            비밀번호
          </Label>
          <TextField
            id="password"
            {...register('password', {
              required: '비밀번호를 입력하세요',
              minLength: { value: 8, message: '8자 이상 입력하세요' },
            })}
            type="password"
            placeholder="비밀번호"
            aria-invalid={!!errors.password}
            tone="default"
          />
          {errors.password && <p className="text-danger text-xs">{errors.password.message}</p>}
        </div>
        <Button type="submit" tone="default">
          로그인
        </Button>
      </form>
    );
  },
};

export const StateAPI: Story = {
  render: () => {
    const store = useTextField();
    const [query, setQuery] = useState('');

    return (
      <VStack gap={8} className="items-start">
        <HStack gap={8} className="items-start">
          <TextField store={store} placeholder="입력하세요" tone="default" className="w-48" />
          <VStack gap={2}>
            <Text size="xs" color="neutral-text-weak" className="font-semibold">
              store.state
            </Text>
            {(['hovered', 'focused', 'active', 'value', 'disabled'] as const).map((key) => (
              <Text key={key} size="xs" color="neutral-text-weak">
                {key}: {String(store.get(s => s[key]))}
              </Text>
            ))}
            <Text size="xs" color="neutral-text-weak">
              length: {store.get(s => s.value.length)}
            </Text>
            <Text size="xs" color="neutral-text-weak">
              filled: {String(store.get(s => s.value.length > 0))}
            </Text>
          </VStack>
          <VStack gap={2}>
            <Text size="xs" color="neutral-text-weak" className="font-semibold">
              store.set()
            </Text>
            <Toggle
              size="sm"
              pressed={store.get(s => s.disabled)}
              onPressedChange={(v) => store.set({ disabled: v })}
            >
              disabled 토글
            </Toggle>
            <Button size="sm" onClick={() => store.set({ value: '' })}>
              초기화
            </Button>
          </VStack>
        </HStack>

        <VStack gap={4} className="w-80">
          <VStack gap={1}>
            <Text size="xs" color="neutral-text-weak" className="font-semibold">
              className 함수 — focused 시 shadow 추가
            </Text>
            <TextField
              placeholder="포커스해보세요"
              tone="default"
              className={(state) => cn(state.focused && 'shadow-md')}
            />
          </VStack>
          <VStack gap={1}>
            <Text size="xs" color="neutral-text-weak" className="font-semibold">
              children 함수 — filled 시 clear 버튼 노출
            </Text>
            <TextField
              placeholder="입력하면 X 버튼이 나타납니다"
              tone="default"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            >
              {(state) => (
                <>
                  <IconSearch size={14} className="text-neutral-text-weak shrink-0" />
                  <TextField.Input />
                  {state.filled && (
                    <button
                      type="button"
                      className="text-neutral-text-weak hover:text-neutral-text shrink-0 transition-colors"
                      onClick={() => setQuery('')}
                    >
                      <IconX size={14} />
                    </button>
                  )}
                </>
              )}
            </TextField>
          </VStack>
          <VStack gap={1}>
            <Text size="xs" color="neutral-text-weak" className="font-semibold">
              children 함수 — filled 여부에 따라 suffix 색상 변경
            </Text>
            <TextField placeholder="금액 입력" tone="default" type="number">
              {(state) => (
                <>
                  <TextField.Input />
                  <span
                    className={cn(
                      'shrink-0 text-sm transition-colors',
                      state.filled ? 'text-accent font-semibold' : 'text-neutral-text-weak',
                    )}
                  >
                    원
                  </span>
                </>
              )}
            </TextField>
          </VStack>
        </VStack>
      </VStack>
    );
  },
};

export const ContextPropagation: Story = {
  render: () => (
    <VStack gap={4} className="w-72">
      {SIZES.map((size) => (
        <VStack key={size} gap={1}>
          <Text size="xs" color="neutral-text-weak" className="font-semibold">
            SizeContext: {size}
          </Text>
          <SizeContext.Provider value={size}>
            <TextField placeholder="상속" tone="default">
              <IconSearch size={16} className="text-neutral-text-weak shrink-0" />
              <TextField.Input />
            </TextField>
            <TextField
              size={size === 'lg' ? 'sm' : 'lg'}
              placeholder={`override → ${size === 'lg' ? 'sm' : 'lg'}`}
              tone="default"
            />
          </SizeContext.Provider>
        </VStack>
      ))}
    </VStack>
  ),
};
