import { Box, HStack, VStack, Text } from '@/common/components/primitive';
import { Badge } from '@/common/components/ui/badge';
import { Icons } from '@/common/components/ui/icon';
import { IconButton } from '@/common/components/ui/icon-button';
import { Spinner } from '@/common/components/ui/spinner';
import { TextField } from '@/common/components/ui/text-field';
import { Toggle } from '@/common/components/ui/toggle';
import { SizeContext } from '@/common/hooks';
import { cn } from '@/common/utils';

import { Button, useButton } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'radio',
      options: ['solid', 'elevated', 'outline', 'ghost'],
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
    children: '확인',
    tone: 'default',
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {};

export const IconOnly: Story = {
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
                  <IconButton
                    key={tone}
                    size="md"
                    variant={variant}
                    color={color}
                    tone={tone}
                    icon={<Icons.Search />}
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

export const Loading: Story = {
  render: () => (
    <HStack gap={3}>
      {(['solid', 'elevated', 'outline', 'ghost'] as const).map((variant) => (
        <Button key={variant} variant={variant} tone="default" disabled>
          <Spinner size="sm" />
          로딩 중
        </Button>
      ))}
    </HStack>
  ),
};

const VARIANTS = ['solid', 'elevated', 'outline', 'ghost'] as const;
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
                  <Button key={tone} variant={variant} color={color} tone={tone}>
                    <Icons.Check />
                    확인
                  </Button>
                ))}
              </>
            ))}
          </Box>
        </VStack>
      ))}
    </VStack>
  ),
};

export const Sizes: Story = {
  render: () => (
    <VStack gap={3}>
      {SIZES.map((size) => (
        <HStack key={size} gap={2} className="items-center">
          <Text size="xs" color="neutral-text-weak" className="w-6 font-semibold">
            {size}
          </Text>
          <Button size={size} tone="default">
            <Icons.Plus />
            추가
          </Button>
          <Button size={size} variant="outline" tone="default">
            <Icons.Download />
            내보내기
          </Button>
          <Button size={size} variant="ghost" color="tertiary" tone="default">
            <Icons.Trash />
            삭제
          </Button>
          <IconButton size={size} tone="default" icon={<Icons.Search />} />
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
            <HStack gap={2} className="items-center">
              <Button tone="default">
                <Icons.Plus />
                추가
              </Button>
              <IconButton tone="default" icon={<Icons.Search />} />
              <TextField placeholder="텍스트 필드" tone="default" className="w-48" />
              <Badge tone="default">뱃지</Badge>
              <Spinner />
            </HStack>
          </SizeContext.Provider>
        </VStack>
      ))}
    </VStack>
  ),
};

export const StateAPI: Story = {
  render: () => {
    const store = useButton();
    return (
      <VStack gap={8} className="items-start">
        <HStack gap={8} className="items-start">
          <Button store={store} tone="default">
            버튼
          </Button>
          <VStack gap={2}>
            <Text size="xs" color="neutral-text-weak" className="font-semibold">
              store.state
            </Text>
            {(['hovered', 'focused', 'active', 'disabled'] as const).map((key) => (
              <Text key={key} size="xs" color="neutral-text-weak">
                {key}: {String(store.get((s) => s[key]))}
              </Text>
            ))}
            <Text size="xs" color="neutral-text-weak">
              clickable: {String(store.get((s) => !s.disabled && !s.active))}
            </Text>
          </VStack>
          <VStack gap={2}>
            <Text size="xs" color="neutral-text-weak" className="font-semibold">
              store.set()
            </Text>
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
              className 함수 — 호버 시 ring 추가
            </Text>
            <HStack gap={2}>
              <Button
                variant="outline"
                tone="default"
                className={(state) => cn(state.hovered && 'ring-2 ring-offset-2')}
              >
                호버해보세요
              </Button>
            </HStack>
          </VStack>
          <VStack gap={1}>
            <Text size="xs" color="neutral-text-weak" className="font-semibold">
              style 함수 — 포커스 시 letter-spacing 증가
            </Text>
            <HStack gap={2}>
              <Button
                variant="ghost"
                tone="default"
                style={(state) => ({ letterSpacing: state.focused ? '0.1em' : undefined })}
              >
                포커스해보세요 (Tab)
              </Button>
            </HStack>
          </VStack>
          <VStack gap={1}>
            <Text size="xs" color="neutral-text-weak" className="font-semibold">
              children 함수 — 상태에 따라 콘텐츠 분기
            </Text>
            <HStack gap={2}>
              <Button variant="outline" tone="default">
                {(state) => (state.active ? '누르는 중...' : state.hovered ? '클릭하세요' : '버튼')}
              </Button>
            </HStack>
          </VStack>
          <VStack gap={1}>
            <Text size="xs" color="neutral-text-weak" className="font-semibold">
              asChild + render children — 링크에 IDS 스타일 + 상태 접근
            </Text>
            <HStack gap={2}>
              <Button asChild variant="ghost" tone="default">
                {(state) => (
                  <a href="#" style={{ textDecoration: state.hovered ? 'underline' : 'none' }}>
                    상태 기반 링크
                  </a>
                )}
              </Button>
              <Button asChild variant="outline" tone="default">
                {(state) => (
                  <a href="#" className={cn(state.focused && 'ring-2 ring-offset-2')}>
                    포커스 링 링크
                  </a>
                )}
              </Button>
            </HStack>
          </VStack>
        </VStack>
      </VStack>
    );
  },
};
