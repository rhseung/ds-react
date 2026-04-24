import { useState } from 'react';

import { HStack, VStack, Spacer, Text } from '@/common/components/primitive';
import { Badge } from '@/common/components/ui/badge';
import { Icons } from '@/common/components/ui/icon';
import { Toggle } from '@/common/components/ui/toggle';
import { SizeContext } from '@/common/hooks';
import { cn } from '@/common/utils';

import { Button } from '../button';
import { Divider } from '../divider';

import { TextArea, useTextArea } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof TextArea> = {
  title: 'UI/TextArea',
  component: TextArea,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['outline', 'filled', 'underline'] },
    tone: { control: 'select', options: ['default', 'weak', 'contrast'] },
    resize: { control: 'select', options: ['none', 'vertical', 'horizontal', 'both'] },
    autoResize: { control: 'boolean' },
    rows: { control: 'number' },
  },
  args: {
    placeholder: '내용을 입력하세요',
    rows: 3,
  },
};

export default meta;
type Story = StoryObj<typeof TextArea>;

export const Default: Story = {};

export const AutoResize: Story = {
  args: {
    autoResize: true,
    placeholder: '입력할수록 높이가 늘어납니다',
  },
};

export const WithSlots: Story = {
  render: () => {
    const [chatValue, setChatValue] = useState('');
    const [recording, setRecording] = useState(false);

    const [mdValue, setMdValue] = useState('');
    const [bold, setBold] = useState(false);
    const [italic, setItalic] = useState(false);
    const [strike, setStrike] = useState(false);
    const [code, setCode] = useState(false);
    const [h1, setH1] = useState(false);
    const [h2, setH2] = useState(false);
    const [blockquote, setBlockquote] = useState(false);

    const [codeValue, setCodeValue] = useState('');
    const [language, setLanguage] = useState('TypeScript');

    const [noteValue, setNoteValue] = useState('');
    const tags = ['디자인 시스템', 'React', '컴포넌트'];

    const [commentValue, setCommentValue] = useState('');
    const max = 280;

    const [aiValue1, setAiValue1] = useState('');
    const [aiValue2, setAiValue2] = useState('');

    return (
      <VStack gap={8} className="w-110">
        {/* Header + footer */}
        <VStack gap={1.5}>
          <Text size="xs" color="neutral-text-weak" className="font-semibold">
            헤더 + 푸터
          </Text>
          <TextArea placeholder="내용을 입력하세요...">
            <HStack gap={2} className="items-center px-2.5 py-1.5">
              <span className="text-neutral-text-weak text-xs">script.js</span>
              <Spacer />
              <Badge size="sm" variant="outline" tone="weak">
                JS
              </Badge>
            </HStack>
            <Divider />
            <TextArea.Input />
            <Divider />
            <HStack gap={2} className="items-center px-2.5 py-1.5">
              <span className="text-neutral-text-weak text-xs">Line 1, Column 1</span>
              <Spacer />
              <Button size="sm" variant="solid" tone="default">
                Run
              </Button>
            </HStack>
          </TextArea>
        </VStack>

        {/* Chat bar */}
        <VStack gap={1.5}>
          <Text size="xs" color="neutral-text-weak" className="font-semibold">
            채팅바
          </Text>
          <TextArea
            value={chatValue}
            onChange={(e) => setChatValue(e.target.value)}
            placeholder="메시지를 입력하세요..."
            autoResize
            rows={1}
          >
            <TextArea.Input />
            <HStack gap={1} className="items-center px-2 py-1.5">
              <Toggle
                size="sm"
                icon
                variant="ghost"
                tone="default"
                pressed={recording}
                onPressedChange={setRecording}
                aria-label="음성 녹음"
                color={recording ? 'tertiary' : undefined}
              >
                <Icons.Microphone />
              </Toggle>
              <Button size="sm" icon variant="ghost" tone="default" aria-label="파일 첨부">
                <Icons.Paperclip />
              </Button>
              <Button size="sm" icon variant="ghost" tone="default" aria-label="이미지 첨부">
                <Icons.Photo />
              </Button>
              <Spacer />
              <Button
                size="sm"
                icon
                variant="solid"
                tone="default"
                disabled={!chatValue.trim()}
                aria-label="전송"
              >
                <Icons.Send2 />
              </Button>
            </HStack>
          </TextArea>
        </VStack>

        {/* Markdown editor */}
        <VStack gap={1.5}>
          <Text size="xs" color="neutral-text-weak" className="font-semibold">
            마크다운 에디터
          </Text>
          <TextArea
            value={mdValue}
            onChange={(e) => setMdValue(e.target.value)}
            placeholder="마크다운을 입력하세요..."
            rows={5}
          >
            <HStack gap={0.5} className="items-center overflow-x-auto px-2 py-1.5">
              <Toggle
                size="sm"
                icon
                variant="ghost"
                tone="default"
                pressed={bold}
                onPressedChange={setBold}
                aria-label="굵게"
              >
                <Icons.Bold />
              </Toggle>
              <Toggle
                size="sm"
                icon
                variant="ghost"
                tone="default"
                pressed={italic}
                onPressedChange={setItalic}
                aria-label="기울임"
              >
                <Icons.Italic />
              </Toggle>
              <Toggle
                size="sm"
                icon
                variant="ghost"
                tone="default"
                pressed={strike}
                onPressedChange={setStrike}
                aria-label="취소선"
              >
                <Icons.Strikethrough />
              </Toggle>
              <Toggle
                size="sm"
                icon
                variant="ghost"
                tone="default"
                pressed={code}
                onPressedChange={setCode}
                aria-label="코드"
              >
                <Icons.Code />
              </Toggle>
              <Divider orientation="vertical" className="mx-1 h-4" />
              <Toggle
                size="sm"
                icon
                variant="ghost"
                tone="default"
                pressed={h1}
                onPressedChange={setH1}
                aria-label="제목 1"
              >
                <Icons.H1 />
              </Toggle>
              <Toggle
                size="sm"
                icon
                variant="ghost"
                tone="default"
                pressed={h2}
                onPressedChange={setH2}
                aria-label="제목 2"
              >
                <Icons.H2 />
              </Toggle>
              <Toggle
                size="sm"
                icon
                variant="ghost"
                tone="default"
                pressed={blockquote}
                onPressedChange={setBlockquote}
                aria-label="인용"
              >
                <Icons.Blockquote />
              </Toggle>
              <Divider orientation="vertical" className="mx-1 h-4" />
              <Button size="sm" icon variant="ghost" tone="default" aria-label="링크">
                <Icons.Link />
              </Button>
              <Button size="sm" icon variant="ghost" tone="default" aria-label="순서 없는 목록">
                <Icons.List />
              </Button>
              <Button size="sm" icon variant="ghost" tone="default" aria-label="순서 있는 목록">
                <Icons.List variant="numbers" />
              </Button>
              <Button size="sm" icon variant="ghost" tone="default" aria-label="표">
                <Icons.Table />
              </Button>
            </HStack>
            <Divider />
            <TextArea.Input />
          </TextArea>
        </VStack>

        {/* Code editor */}
        <VStack gap={1.5}>
          <Text size="xs" color="neutral-text-weak" className="font-semibold">
            코드 에디터
          </Text>
          <TextArea
            value={codeValue}
            onChange={(e) => setCodeValue(e.target.value)}
            placeholder={`// ${language} 코드를 입력하세요`}
            rows={5}
          >
            <HStack gap={2} className="items-center px-2.5 py-1.5">
              {(['TypeScript', 'Python', 'Go'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className="text-neutral-text-weak hover:text-neutral-text cursor-pointer text-xs transition-colors"
                  style={{ fontWeight: language === lang ? 600 : 400 }}
                >
                  {lang}
                </button>
              ))}
              <Spacer />
              <Badge size="sm" variant="outline" tone="weak">
                {language}
              </Badge>
            </HStack>
            <Divider />
            <TextArea.Input />
            <Divider />
            <HStack gap={1} className="items-center px-2 py-1.5">
              <span className="text-neutral-text-weak text-xs">
                {codeValue.split('\n').length} lines
              </span>
              <Spacer />
              <Button size="sm" icon variant="ghost" tone="default" aria-label="복사">
                <Icons.Copy />
              </Button>
              <Button size="sm" icon variant="solid" tone="default" aria-label="실행">
                <Icons.PlayerPlay />
              </Button>
            </HStack>
          </TextArea>
        </VStack>

        {/* Note with tags */}
        <VStack gap={1.5}>
          <Text size="xs" color="neutral-text-weak" className="font-semibold">
            노트
          </Text>
          <TextArea
            value={noteValue}
            onChange={(e) => setNoteValue(e.target.value)}
            placeholder="노트를 입력하세요..."
            rows={4}
          >
            <HStack gap={1.5} className="flex-wrap items-center px-2.5 py-1.5">
              <Icons.Tag size="sm" className="text-neutral-text-weak shrink-0" />
              {tags.map((tag) => (
                <Badge key={tag} size="sm" variant="outline" tone="weak">
                  {tag}
                </Badge>
              ))}
            </HStack>
            <Divider />
            <TextArea.Input />
          </TextArea>
        </VStack>

        {/* Comment with char count */}
        <VStack gap={1.5}>
          <Text size="xs" color="neutral-text-weak" className="font-semibold">
            댓글
          </Text>
          <TextArea
            value={commentValue}
            onChange={(e) => setCommentValue(e.target.value)}
            placeholder="댓글을 입력하세요..."
            maxLength={max}
            rows={3}
          >
            <TextArea.Input />
            <Divider />
            <HStack gap={2} className="items-center px-2.5 py-1.5">
              <Button size="sm" icon variant="ghost" tone="default" aria-label="이미지 첨부">
                <Icons.Photo />
              </Button>
              <Spacer />
              <span className="text-xs">
                <span
                  className={
                    commentValue.length >= max
                      ? 'text-tertiary font-semibold'
                      : 'text-neutral-text-weak'
                  }
                >
                  {commentValue.length}
                </span>
                <span className="text-neutral-text-weak">/{max}</span>
              </span>
              <Button size="sm" variant="solid" tone="default" disabled={!commentValue.trim()}>
                등록
              </Button>
            </HStack>
          </TextArea>
        </VStack>

        {/* AI prompt bar 1 — context chip header */}
        <VStack gap={1.5}>
          <Text size="xs" color="neutral-text-weak" className="font-semibold">
            AI 프롬프트 바 (컨텍스트 칩)
          </Text>
          <TextArea
            value={aiValue1}
            onChange={(e) => setAiValue1(e.target.value)}
            placeholder="Ask, search, or make anything..."
            autoResize
            rows={2}
          >
            <HStack className="px-2.5 pt-2.5 pb-1">
              <button className="text-neutral-text border-neutral-border bg-neutral-bg-subtle hover:bg-neutral-bg inline-flex cursor-pointer items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors">
                <Icons.At size="sm" />
                Add context
              </button>
            </HStack>
            <TextArea.Input />
            <Divider />
            <HStack gap={2} className="items-center px-2 py-1.5">
              <Button size="sm" icon variant="ghost" tone="default" aria-label="첨부">
                <Icons.Paperclip />
              </Button>
              <span className="text-neutral-text-weak text-xs">Auto</span>
              <HStack gap={1} className="items-center">
                <Icons.World size="sm" className="text-neutral-text-weak" />
                <span className="text-neutral-text-weak text-xs">All Sources</span>
              </HStack>
              <Spacer />
              <Button
                size="sm"
                icon
                variant="solid"
                tone="default"
                disabled={!aiValue1.trim()}
                className="rounded-full"
                aria-label="전송"
              >
                <Icons.ArrowUp />
              </Button>
            </HStack>
          </TextArea>
        </VStack>

        {/* AI prompt bar 2 — usage indicator */}
        <VStack gap={1.5}>
          <Text size="xs" color="neutral-text-weak" className="font-semibold">
            AI 프롬프트 바 (사용량 표시)
          </Text>
          <TextArea
            value={aiValue2}
            onChange={(e) => setAiValue2(e.target.value)}
            placeholder="Ask, Search or Chat..."
            autoResize
            rows={2}
          >
            <TextArea.Input />
            <HStack gap={2} className="items-center px-2 py-1.5">
              <Button
                size="sm"
                icon
                variant="outline"
                tone="default"
                className="rounded-full"
                aria-label="추가"
              >
                <Icons.Plus />
              </Button>
              <span className="text-neutral-text-weak text-xs">Auto</span>
              <Spacer />
              <span className="text-neutral-text-weak text-xs">52% used</span>
              <Divider orientation="vertical" className="h-4" />
              <Button
                size="sm"
                icon
                variant="solid"
                tone="default"
                disabled={!aiValue2.trim()}
                className="rounded-full"
                aria-label="전송"
              >
                <Icons.ArrowUp />
              </Button>
            </HStack>
          </TextArea>
        </VStack>
      </VStack>
    );
  },
};

export const StateAPI: Story = {
  render: () => {
    const store = useTextArea();

    return (
      <VStack gap={8} className="items-start">
        <HStack gap={8} className="items-start">
          <TextArea store={store} placeholder="입력하세요" rows={3} className="w-48" />
          <VStack gap={2}>
            <Text size="xs" color="neutral-text-weak" className="font-semibold">
              store.state
            </Text>
            {(['hovered', 'focused', 'active', 'value', 'disabled'] as const).map((key) => (
              <Text key={key} size="xs" color="neutral-text-weak">
                {key}: {String(store.get((s) => s[key]))}
              </Text>
            ))}
            <Text size="xs" color="neutral-text-weak">
              length: {store.get((s) => s.value.length)}
            </Text>
            <Text size="xs" color="neutral-text-weak">
              lines: {store.get((s) => s.value.split('\n').length)}
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
            <Button size="sm" onClick={() => store.set({ value: '' })}>
              초기화
            </Button>
          </VStack>
        </HStack>

        <VStack gap={4} className="w-96">
          <VStack gap={1}>
            <Text size="xs" color="neutral-text-weak" className="font-semibold">
              className 함수 — focused 시 shadow 추가
            </Text>
            <TextArea
              placeholder="포커스해보세요"
              rows={3}
              className={(state) => cn(state.focused && 'shadow-md')}
            />
          </VStack>
          <VStack gap={1}>
            <Text size="xs" color="neutral-text-weak" className="font-semibold">
              children 함수 — filled 시 전송 버튼 활성화
            </Text>
            <TextArea placeholder="내용을 입력하면 전송 버튼이 활성화됩니다" autoResize rows={2}>
              {(state) => (
                <>
                  <TextArea.Input />
                  <Divider />
                  <HStack gap={2} className="items-center px-2.5 py-1.5">
                    <Spacer />
                    <Button
                      size="sm"
                      variant="solid"
                      tone="default"
                      disabled={!state.filled}
                      aria-label="전송"
                    >
                      <Icons.ArrowUp />
                      전송
                    </Button>
                  </HStack>
                </>
              )}
            </TextArea>
          </VStack>
          <VStack gap={1}>
            <Text size="xs" color="neutral-text-weak" className="font-semibold">
              children 함수 — filled 시 완료 아이콘 표시
            </Text>
            <TextArea placeholder="입력 완료 시 체크 아이콘이 나타납니다" rows={3}>
              {(state) => (
                <>
                  <TextArea.Input />
                  {state.filled && (
                    <HStack gap={1} className="text-accent items-center px-2.5 py-1 text-xs">
                      <Icons.Check size="sm" />
                      <span>입력 완료</span>
                    </HStack>
                  )}
                </>
              )}
            </TextArea>
          </VStack>
        </VStack>
      </VStack>
    );
  },
};

export const Overview: Story = {
  render: () => (
    <VStack gap={4} className="w-80">
      <TextArea variant="outline" placeholder="outline" />
      <TextArea variant="filled" placeholder="filled" />
      <TextArea variant="underline" placeholder="underline" />
    </VStack>
  ),
};

const SIZES = ['sm', 'md', 'lg'] as const;

export const Sizes: Story = {
  render: () => (
    <VStack gap={3} className="w-72">
      {SIZES.map((size) => (
        <HStack key={size} gap={2} className="items-start">
          <Text size="xs" color="neutral-text-weak" className="w-6 pt-2 font-semibold">
            {size}
          </Text>
          <TextArea size={size} placeholder="내용을 입력하세요" className="flex-1" />
        </HStack>
      ))}
    </VStack>
  ),
};

export const ContextPropagation: Story = {
  render: () => (
    <VStack gap={4} className="w-72">
      {SIZES.map((size) => (
        <VStack key={size} gap={2}>
          <Text size="xs" color="neutral-text-weak" className="font-semibold">
            SizeContext: {size}
          </Text>
          <SizeContext.Provider value={size}>
            <TextArea placeholder="상속" />
            <TextArea
              size={size === 'lg' ? 'sm' : 'lg'}
              placeholder={`override → ${size === 'lg' ? 'sm' : 'lg'}`}
            />
          </SizeContext.Provider>
        </VStack>
      ))}
    </VStack>
  ),
};
