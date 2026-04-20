import { useEffect } from 'react';

import { useFloating, offset, flip, shift, autoUpdate } from '@floating-ui/react';
import { type Meta, type StoryObj } from '@storybook/react-vite';
import { OverlayProvider, overlay } from 'overlay-kit';

import { Button } from '@/common/components/ui/button';

/**
 * overlay-kit + @floating-ui/react 연동 테스트
 *
 * 검증 목표:
 * 1. overlay.open() 클로저로 anchor element 전달 가능한지
 * 2. @floating-ui가 overlay-kit 렌더 트리 내에서 정상 동작하는지
 * 3. 싱글톤 overlay 객체로 anchor-based 오버레이를 열 수 있는지
 *
 * anchor 전달 패턴:
 * - useRef 불필요 — 클릭 이벤트의 e.currentTarget이 곧 anchor 엘리먼트
 * - overlay.open() 하나로 anchor 유무 관계없이 인터페이스 통일 가능
 *
 * React 19 ref 관련 주의사항:
 * - `refs.setFloating` lint 오탐은 `const { setFloating } = refs` destructure로 해결
 *   (React 이슈 #34775)
 */

// ─── Floating Popover ────────────────────────────────────────────────────────

interface AnchoredPopoverProps {
  isOpen: boolean;
  onClose: () => void;
  anchor: HTMLElement;
  children: React.ReactNode;
}

function AnchoredPopover({ isOpen, onClose, anchor, children }: AnchoredPopoverProps) {
  const { refs, floatingStyles } = useFloating({
    middleware: [offset(8), flip(), shift({ padding: 8 })],
    whileElementsMounted: autoUpdate,
    placement: 'bottom-start',
  });
  const { setReference, setFloating } = refs;

  useEffect(() => {
    setReference(anchor);
  }, [anchor, setReference]);

  if (!isOpen) return null;

  return (
    <>
      {/* backdrop */}
      <div className="fixed inset-0" onClick={onClose} />
      {/* floating panel */}
      <div
        ref={setFloating}
        style={floatingStyles}
        className="border-neutral-border bg-neutral-bg z-50 rounded-lg border p-3 shadow-md"
      >
        {children}
      </div>
    </>
  );
}

// ─── Stories ─────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: 'Test/OverlayKit + FloatingUI',
  decorators: [
    (Story) => (
      <OverlayProvider>
        <Story />
      </OverlayProvider>
    ),
  ],
};
export default meta;

type Story = StoryObj;

export const AnchorBasedOverlay: Story = {
  name: '1. anchor-based overlay (overlay-kit + @floating-ui)',
  render: () => {
    const handleOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
      const anchor = e.currentTarget;
      overlay.open(({ isOpen, close }) => (
        <AnchoredPopover isOpen={isOpen} onClose={close} anchor={anchor}>
          <p className="text-sm">overlay-kit으로 열렸고</p>
          <p className="text-sm">@floating-ui로 위치 잡힘</p>
          <Button size="sm" variant="ghost" onClick={close} className="mt-2 w-full">
            닫기
          </Button>
        </AnchoredPopover>
      ));
    };

    return (
      <div className="flex h-64 items-start justify-center pt-16">
        <Button onClick={handleOpen}>Popover 열기</Button>
      </div>
    );
  },
};

export const MultipleAnchors: Story = {
  name: '2. 여러 trigger — 각자 다른 anchor',
  render: () => {
    const openFor = (e: React.MouseEvent<HTMLButtonElement>, label: string) => {
      const anchor = e.currentTarget;
      overlay.open(({ isOpen, close }) => (
        <AnchoredPopover isOpen={isOpen} onClose={close} anchor={anchor}>
          <p className="text-sm font-semibold">{label} 기준 팝오버</p>
        </AnchoredPopover>
      ));
    };

    return (
      <div className="flex h-64 items-start justify-between px-8 pt-16">
        <Button variant="outline" onClick={(e) => openFor(e, '왼쪽')}>
          왼쪽
        </Button>
        <Button variant="outline" onClick={(e) => openFor(e, '가운데')}>
          가운데
        </Button>
        <Button variant="outline" onClick={(e) => openFor(e, '오른쪽')}>
          오른쪽
        </Button>
      </div>
    );
  },
};

export const AsyncOverlay: Story = {
  name: '3. openAsync — anchor-based confirm',
  render: () => {
    const handleConfirm = async (e: React.MouseEvent<HTMLButtonElement>) => {
      const anchor = e.currentTarget;
      const confirmed = await overlay.openAsync<boolean>(({ isOpen, close }) => (
        <AnchoredPopover isOpen={isOpen} onClose={() => close(false)} anchor={anchor}>
          <p className="mb-2 text-sm">정말 삭제할까요?</p>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => close(false)}>
              취소
            </Button>
            <Button size="sm" onClick={() => close(true)}>
              삭제
            </Button>
          </div>
        </AnchoredPopover>
      ));

      alert(confirmed ? '삭제됨' : '취소됨');
    };

    return (
      <div className="flex h-64 items-start justify-center pt-16">
        <Button onClick={handleConfirm}>삭제</Button>
      </div>
    );
  },
};
