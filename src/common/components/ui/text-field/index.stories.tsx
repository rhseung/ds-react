import { useState } from 'react';

import { useForm } from 'react-hook-form';

import { Box, Text } from '@/common/components/primitive';

import { Button } from '../button';

import { TextField } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof TextField> = {
  title: 'Common/TextField',
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
};

export default meta;
type Story = StoryObj<typeof TextField>;

export const Outline: Story = {
  args: { variant: 'outline', placeholder: '입력하세요' },
};

export const Filled: Story = {
  args: { variant: 'filled', placeholder: '입력하세요' },
};

export const Underline: Story = {
  args: { variant: 'underline', placeholder: '입력하세요' },
};

const VARIANTS = ['outline', 'filled', 'underline'] as const;
const COLORS = ['primary', 'secondary', 'tertiary'] as const;

export const Overview: Story = {
  render: () => (
    <Box className="grid grid-cols-4 gap-3">
      <span />
      {COLORS.map((color) => (
        <Text key={color} size="xs" color="neutral-text-weak" className="text-center">
          {color}
        </Text>
      ))}
      {VARIANTS.map((variant) => (
        <>
          <Text key={variant} size="xs" color="neutral-text-weak">
            {variant}
          </Text>
          {COLORS.map((color) => (
            <TextField
              key={color}
              variant={variant}
              color={color}
              tone="default"
              placeholder="입력하세요"
            />
          ))}
        </>
      ))}
    </Box>
  ),
};

export const Disabled: Story = {
  args: { variant: 'outline', placeholder: '비활성화', disabled: true },
};

// 비제어
export const Uncontrolled: Story = {
  render: () => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const data = new FormData(e.currentTarget);
      alert(`입력값: ${data.get('username')}`);
    };

    return (
      <form onSubmit={handleSubmit} className="flex w-72 flex-col gap-3">
        <TextField name="username" placeholder="이름" defaultValue="홍길동" tone="default" />
        <Button type="submit" tone="default">
          제출
        </Button>
      </form>
    );
  },
};

// 제어
export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('');

    return (
      <div className="flex w-72 flex-col gap-3">
        <TextField
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="입력하세요"
          tone="default"
        />
        <p className="text-neutral-text-weak text-sm">
          현재 값: <span className="text-neutral-text font-medium">{value || '—'}</span>
        </p>
        <p className="text-neutral-text-weak text-sm">
          글자 수: <span className="text-neutral-text font-medium">{value.length}</span>
        </p>
      </div>
    );
  },
};

// react-hook-form 제어
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
          <label className="text-neutral-text text-sm font-medium">이메일</label>
          <TextField
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
          <label className="text-neutral-text text-sm font-medium">비밀번호</label>
          <TextField
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
