# IDS for React — 컴포넌트 계획

현재 구현 상태와 우선순위를 포함한 전체 컴포넌트 목록.
원칙 번호는 [PRINCIPLE.md](./PRINCIPLE.md) 기준.

---

## 구현 현황

| 상태 | 의미        |
| ---- | ----------- |
| ✅   | 완료        |
| 🔄   | 재설계 필요 |
| 🔲   | 미구현      |

---

## Phase 1 — MVP 기반

> 계획서 기준 4월 4주 ~ 5월 2주. 모든 예제 코드의 기반이 되는 컴포넌트.

### Primitives

#### `Box` ✅

모든 레이아웃의 기본 단위. 시맨틱 없는 블록 컨테이너.

- 원칙 5 (Layout Primitives), 원칙 8 (asChild)
- Zero External Spacing Rule: 외곽 마진 없음
- 스타일은 `className`으로 Tailwind를 직접 사용. Box 자체는 prop으로 스타일을 추상화하지 않음
- `asChild`로 임의 엘리먼트로 렌더 가능 (Slot 기반)

```tsx
<Box className="p-4 rounded-lg bg-neutral-bg">...</Box>

// asChild — span으로 렌더
<Box asChild>
  <span>...</span>
</Box>
```

---

#### `HStack` ✅

수평 방향 flex 컨테이너. `display: flex; flex-direction: row`.

- 원칙 5 (Layout Primitives)
- `gap` prop만 지원 — 그 외 정렬/분배는 `className`으로 Tailwind 사용
- `gap`은 숫자 (Tailwind spacing 단위 기준, `gap={4}` → 16px)
- 반응형 지원: `gap={{ xs: 2, md: 4 }}`

```tsx
<HStack gap={2} className="items-center">
  <Avatar />
  <Text>홍길동</Text>
</HStack>
```

---

#### `VStack` ✅

수직 방향 flex 컨테이너. `display: flex; flex-direction: column`.

- 원칙 5 (Layout Primitives)
- `gap` prop만 지원 — 그 외는 `className`으로 Tailwind 사용

```tsx
<VStack gap={1}>
  <Text>이름</Text>
  <Text>직책</Text>
</VStack>
```

---

#### `Spacer` ✅

flex 컨테이너 내부에서 남은 공간을 채우는 확장 요소.

- `flex: 1`로 동작
- `HStack` / `VStack` 내부 전용

```tsx
<HStack>
  <Text>왼쪽</Text>
  <Spacer />
  <Button>오른쪽</Button>
</HStack>
```

---

#### `Grid` ✅

CSS Grid 레이아웃 컨테이너.

- `cols`, `rows`: 컬럼/행 수 — 반응형 지원 (`cols={{ xs: 1, md: 3 }}`)
- `gap`, `colGap`, `rowGap`: 간격 (Tailwind spacing 단위)
- `Grid.Item`: `colSpan`, `rowSpan`, `colStart`, `rowStart` 지원

```tsx
<Grid cols={3} gap={4}>
  <Grid.Item colSpan={2}>...</Grid.Item>
  <div>...</div>
</Grid>
```

---

#### `Group` 🔲

인접 처리(Adjacency)의 핵심 엔진. 원칙 1의 구현체.
children을 순회하며 첫/중간/마지막 요소에 자동으로 스타일을 부여한다.

- 원칙 1 (Declarative by Default) — `ButtonGroup`, `InputGroup`의 기반
- `orientation`: `horizontal` | `vertical`
- `role="group"` 자동 주입 (원칙 12)

```tsx
// ButtonGroup은 Group을 기반으로 구현됨
<Group>
  <Button>첫 번째</Button> {/* 오른쪽 radius 제거 */}
  <Button>두 번째</Button> {/* 양쪽 radius 제거, 좌측 border 중첩 해결 */}
  <Button>세 번째</Button> {/* 왼쪽 radius 제거 */}
</Group>
```

---

### Typography

#### `Text` ✅

인라인 / 블록 텍스트. 기본 타이포그래피 단위.

- 원칙 6 (Brand-agnostic) — `color`는 시맨틱 토큰만
- `size`: `xs` | `sm` | `md` | `lg` | `xl` — 폰트 크기 + line-height 세트
- `weight`: `normal` | `medium` | `semibold` | `bold`
- `color`: 시맨틱 토큰만 허용 (`neutral-text`, `neutral-text-weak`, `primary`, `danger` 등)
- 그 외 스타일은 `className`으로 Tailwind 사용
- `asChild`로 임의 엘리먼트 렌더 가능 (원칙 8, Slot 기반)

```tsx
<Text size="sm" color="neutral-text-weak">부제목</Text>
<Text size="md" weight="semibold">강조 텍스트</Text>
```

---

#### `Heading` ✅

문서 구조 제목. h1 ~ h6 시맨틱을 명시적으로 선언.

- `level`: `1` | `2` | `3` | `4` | `5` | `6` → 실제 `<h1>` ~ `<h6>` 렌더
- level별 기본 size: h1=4xl, h2=3xl, h3=2xl, h4=xl, h5=lg, h6=md
- `size`를 별도로 지정해 시각적 크기와 시맨틱 레벨을 분리 가능
- `weight` 기본값 `bold`
- 원칙 9 (Native-first) — 시맨틱 HTML 우선

```tsx
<Heading level={2}>섹션 제목</Heading>
<Heading level={3} size="xl">시각적 크기를 레벨과 분리</Heading>
```

---

#### `Label` ✅

폼 레이블. `<label>` 시맨틱 래퍼.

- `htmlFor`를 직접 받거나 `FormField`와 조합 시 자동 연결 (원칙 12)
- `required` prop → `*` 시각 표시 + `aria-required` 자동 (원칙 12)

```tsx
<Label htmlFor="email" required>
  이메일
</Label>
```

---

#### `Code` ✅

인라인 코드 스니펫. `<code>` 시맨틱.

```tsx
<Text>
  설치: <Code>bun add @ids/react</Code>
</Text>
```

---

#### `Kbd` ✅

키보드 단축키 표시. `<kbd>` 시맨틱.

```tsx
<Text>
  저장: <Kbd>Ctrl</Kbd> + <Kbd>S</Kbd>
</Text>
```

---

### Actions

#### `Button` ✅

범용 액션 버튼.

- `variant`: `solid` | `solid-elevated` | `outline` | `ghost`
- `tone`: `default` | `weak` | `contrast`
- `size`: `default` | `icon`
- `color`: accent 색상 시스템 (`primary`, `secondary`, `tertiary`, `danger` 등)
- `asChild`: Slot 기반 다형성 (원칙 8)
- `useButton` 훅 — `data-hovered`, `data-active`, `data-focused`, `data-disabled` 자동 주입

```tsx
<Button variant="solid" color="primary">저장</Button>
<Button variant="outline" tone="weak" size="icon"><SearchIcon /></Button>
```

---

#### `Toggle` ✅

on/off 토글 버튼. Button과 동일한 시각 체계 + 활성 상태 유지.

- Button과 동일한 `variant`, `tone`, `size`, `color` prop
- `pressed` / `defaultPressed` / `onPressedChange` (원칙 15)
- `aria-pressed` 자동 처리 (원칙 12)
- `data-toggled` — 활성 상태 StateMask 오버레이
- `useToggle` 훅 — 인터랙션 + 토글 상태 통합

```tsx
<Toggle defaultPressed>굵게</Toggle>
<Toggle pressed={isBold} onPressedChange={setIsBold}>B</Toggle>
```

---

#### `ButtonGroup` 🔲

버튼을 인접 처리로 묶는 컴포넌트. 원칙 1의 대표 구현체.

- `Group` 기반 — radius/border 중첩을 시스템이 자동 처리
- `variant` prop → 내부 `Button`에 Context로 전파 (원칙 3)
- `size` prop → 내부 `Button`에 Context로 전파 (원칙 3)
- `aria-label` 필수 + `role="group"` 자동 (원칙 12)
- `ButtonGroup.Separator` — 구분선 sentinel

```tsx
<ButtonGroup variant="outline" aria-label="텍스트 서식">
  <Button>굵게</Button>
  <Button>기울임</Button>
  <ButtonGroup.Separator />
  <Button>정렬</Button>
</ButtonGroup>
```

---

## Phase 2 — 핵심 폼

> 5월 1주 ~ 2주.

### `AvatarGroup` 🔲

Avatar를 겹쳐서 그룹 표시. 초과 시 `+N` 표시.

```tsx
<AvatarGroup max={4}>
  <Avatar name="홍길동" />
  <Avatar name="김철수" />
  <Avatar name="이영희" />
</AvatarGroup>
```

---

### `Avatar` ✅

사용자 아바타. 이미지 → 이니셜 → fallback 순으로 렌더.

- `size`: `sm` | `md` | `lg` | `xl`
- `color` + `tone`: accent 색상 시스템
- `src`: 이미지 URL. 로드 실패 시 이니셜로 fallback
- `name`: 이니셜 자동 추출

```tsx
<Avatar name="홍길동" size="md" />
<Avatar src="/profile.jpg" name="홍길동" />
```

---

### `Tag` / `Chip` 🔲

- `Tag` — 읽기 전용 레이블 (Badge보다 크고 닫기 버튼 가능)
- `Chip` — 선택 가능한 인터랙티브 레이블 (필터, 멀티셀렉트 등)

```tsx
<Tag onRemove={handleRemove}>React</Tag>
<Chip selected={isSelected} onClick={toggle}>디자인</Chip>
```

---

### `Badge` ✅

상태/카테고리 레이블.

- `variant`: `solid` | `outline` | `ghost`
- `tone`: `default` | `weak` | `contrast`
- `color`: accent 색상 시스템

```tsx
<Badge color="success">완료</Badge>
<Badge variant="outline" color="danger">오류</Badge>
```

---

### `Divider` ✅

구분선.

- `orientation`: `horizontal` | `vertical`

```tsx
<Divider />
<Divider orientation="vertical" />
```

---

### `Spinner` ✅

로딩 스피너.

- `size`: `sm` | `md` | `lg`

```tsx
<Spinner size="md" />
```

---

### `TextField` ✅

텍스트 입력. 원칙 2 (Structural Children) 기반 compound component.

- `TextField.Inner` — pivot sentinel. input의 렌더 위치를 선언
- `TextField.Inner` 이전 children → leading 영역 (아이콘, prefix 등)
- `TextField.Inner` 이후 children → trailing 영역 (clear 버튼, suffix 등)
- 유효성 상태(`invalid` 등)는 `Field`가 담당 — TextField는 시각만 책임
- `TextField.Inner` 누락 시 dev-time 경고 (원칙 16)

```tsx
// 단순 사용 (Inner 생략 가능 → 기본 배치)
<TextField placeholder="검색" />

// 구조적 children
<TextField placeholder="검색어를 입력하세요">
  <SearchIcon />
  <TextField.Inner />
  <ClearIcon onClick={clear} />
</TextField>
```

---

### `TextArea` ✅

여러 줄 텍스트 입력. TextField와 동일한 variant/tone 체계의 compound component.

- `TextArea.Inner` — textarea의 렌더 위치를 선언하는 pivot sentinel
- wrapper가 `flex-col`로 동작 — `TextArea.Inner` 위아래에 자유롭게 content 배치 가능
- `resize` 는 wrapper div에 적용, textarea는 내부에서 `h-full`로 따라옴
- `resize`: `none` | `vertical` | `horizontal` | `both` (기본 `vertical`)
- `autoResize`: 입력 내용에 따라 높이 자동 조절 (`scrollHeight` 기반)
- 유효성 상태는 `Field`가 담당 — TextArea는 시각만 책임

```tsx
// 단순 사용
<TextArea placeholder="내용을 입력하세요" autoResize />

// 푸터 추가
<TextArea placeholder="Write a comment..." maxLength={280}>
  <TextArea.Inner />
  <Divider />
  <HStack gap={2} className="items-center px-2.5 py-2">
    <Text size="xs">{count}/280</Text>
    <Spacer />
    <Button>Post</Button>
  </HStack>
</TextArea>
```

---

### `Checkbox` ✅

단일 체크박스. 라벨은 `Label`이 담당 — Checkbox는 컨트롤만 렌더.

- `defaultChecked` / `checked` + `onChange` (원칙 15)
- `indeterminate`: 불확정 상태 (tristate)
- 숨김 native input + 커스텀 UI (원칙 9)
- `aria-checked="mixed"` 자동 처리 (원칙 12)
- `color`: accent 색상 시스템
- `size`: `sm` | `md` | `lg`

```tsx
<HStack gap={2} className="items-center">
  <Checkbox id="agree" defaultChecked />
  <Label htmlFor="agree">동의합니다</Label>
</HStack>
```

---

### `useCheckboxGroup` 🔲

복수 선택 체크박스 그룹. `useRadio`와 대칭되는 구조.

- `useCheckboxGroup<T>()` — 타입 `T`로 스코프된 `{ Group, Item, All }` 반환
- `Group`: `defaultValue?: T[]` / `value?: T[]` + `onChange?: (v: T[]) => void` (원칙 15)
- `Item`: `value: T` — `T` 이외의 값은 컴파일 오류 (원칙 3)
- `All` — 전체 선택 sentinel. 일부만 선택 시 `indeterminate` 자동 계산
- `role="group"` 자동 (원칙 12)

```tsx
type Fruit = 'apple' | 'banana' | 'cherry';
const checkbox = useCheckboxGroup<Fruit>();

// 기본 사용
<checkbox.Group defaultValue={['banana']} onChange={setValues}>
  <HStack gap={2} className="items-center">
    <checkbox.Item value="apple" id="apple" />
    <Label htmlFor="apple">사과</Label>
  </HStack>
  <HStack gap={2} className="items-center">
    <checkbox.Item value="mango" id="mango" />  {/* ❌ 'mango' is not assignable to Fruit */}
    <Label htmlFor="mango">망고</Label>
  </HStack>
</checkbox.Group>

// 전체 선택 포함
<checkbox.Group defaultValue={[]} onChange={setValues}>
  <HStack gap={2} className="items-center">
    <checkbox.All id="all" />
    <Label htmlFor="all">전체 선택</Label>
  </HStack>
  <VStack gap={2} className="pl-6">
    <HStack gap={2} className="items-center">
      <checkbox.Item value="apple" id="apple" />
      <Label htmlFor="apple">사과</Label>
    </HStack>
    <HStack gap={2} className="items-center">
      <checkbox.Item value="banana" id="banana" />
      <Label htmlFor="banana">바나나</Label>
    </HStack>
  </VStack>
</checkbox.Group>
```

---

### `Switch` 🔲

토글 스위치.

- `defaultChecked` / `checked` + `onChange` (원칙 15)
- `role="switch"` + `aria-checked` 자동 (원칙 12)

```tsx
<Switch defaultChecked>알림 받기</Switch>
```

---

### `useRadio` 🔲

라디오 버튼 그룹.

- `useRadio<T>()` — 타입 `T`로 스코프된 `{ Group, Item }` 반환
- `Group`: `defaultValue?: T` / `value?: T` + `onChange?: (v: T) => void` (원칙 15)
- `Item`: `value: T` — `T` 이외의 값은 컴파일 오류 (원칙 3)
- `role="radiogroup"` 자동 (원칙 12)

```tsx
type Lang = 'ko' | 'en' | 'ja';
const radio = useRadio<Lang>();

<radio.Group defaultValue="ko" onChange={setLang}>
  <radio.Item value="ko">한국어</radio.Item>
  <radio.Item value="en">English</radio.Item>
  <radio.Item value="zh">中文</radio.Item> {/* ❌ 'zh' is not assignable to Lang */}
</radio.Group>;
```

---

### `Field` 🔲

레이블 + 입력 + 메시지를 묶는 폼 필드 컨테이너. 원칙 2의 구조적 children 패턴.

- `Field.Label` — `<label>`. 내부 입력의 id와 자동 연결 (원칙 12)
- `Field.ErrorMessage` — 에러 메시지. 항상 JSX에 선언하고 내용이 있을 때만 렌더
- `Field.HelperText` — 보조 안내 텍스트
- `required` → `Field.Label`에 `*` 표시 + 입력에 `aria-required` 전파 (원칙 3, 12)

```tsx
// react-hook-form과 조합
const { register, formState: { errors } } = useForm()

<Field>
  <Field.Label required>이메일</Field.Label>
  <TextField {...register('email', { required: '이메일을 입력하세요' })} />
  <Field.ErrorMessage>{errors.email?.message}</Field.ErrorMessage>
  <Field.HelperText>로그인에 사용한 이메일 주소</Field.HelperText>
</Field>
```

---

## Phase 3 — 피드백

> 5월 3주 ~ 6월 1주.

### `Alert` 🔲

인라인 알림 배너.

- `color`: `info` | `success` | `warning` | `danger`
- `Alert.Title`, `Alert.Description` 서브 컴포넌트
- `role="alert"` 자동 (원칙 12)

```tsx
<Alert color="warning">
  <Alert.Title>주의</Alert.Title>
  <Alert.Description>저장되지 않은 변경사항이 있습니다.</Alert.Description>
</Alert>
```

---

### `Progress` 🔲

진행률 표시.

- `value`: 0 ~ 100
- `indeterminate`: 진행률 미확정 시
- `aria-valuenow` / `aria-valuemin` / `aria-valuemax` 자동 (원칙 12)

```tsx
<Progress value={72} />
<Progress indeterminate />
```

---

### `Skeleton` 🔲

로딩 중 콘텐츠 자리 표시자.

- `variant`: `text` | `circle` | `rect`
- `prefers-reduced-motion` 시 애니메이션 중단 (원칙 13)

```tsx
<Skeleton variant="text" />
<Skeleton variant="circle" size="md" />
```

---

## Phase 4 — 오버레이

> 6월 초.

오버레이 상태 관리는 [`overlay-kit`](https://github.com/toss/overlay-kit) (Toss), 앵커 기반 포지셔닝은 [`@floating-ui/react`](https://floating-ui.com)를 사용한다.

### `Dialog` 🔲

모달 다이얼로그. 원칙 4 (View vs Control)의 대표 사례.

- 트리거를 소유하지 않음 — `useOverlay()`로 열기
- `Dialog.Title` → `aria-labelledby` 자동 (원칙 12)
- `Dialog.Body` → `aria-describedby` 자동 (원칙 12)
- `FocusTrap` 내장 (원칙 12)
- `prefers-reduced-motion` 대응 (원칙 13)

```tsx
const overlay = useOverlay()

<Button onClick={() => overlay.open(() => (
  <Dialog>
    <Dialog.Title>제목</Dialog.Title>
    <Dialog.Body>내용</Dialog.Body>
    <Dialog.Footer>
      <Button onClick={overlay.close}>닫기</Button>
    </Dialog.Footer>
  </Dialog>
))} />
```

---

### `Tooltip` 🔲

호버/포커스 시 보조 설명. 트리거 엘리먼트에 앵커링된 부동 패널.

- 앵커 기반 오버레이 — Select와 동일한 포지셔닝 인프라
- `role="tooltip"` + `aria-describedby` 자동 연결 (원칙 12)
- 키보드 포커스에도 동작 (원칙 12)
- `prefers-reduced-motion` 대응 (원칙 13)

```tsx
<Tooltip content="저장 (Ctrl+S)">
  <Button>저장</Button>
</Tooltip>
```

---

### `Toast` / `Toaster` 🔲

비침습적 알림. View vs Control 분리의 대표 사례 (원칙 4).

- `Toaster` — 렌더 위치 선언 (Portal 사용)
- `useToast()` — 비즈니스 레이어에서 호출
- `color`: `info` | `success` | `warning` | `danger`
- `prefers-reduced-motion` 대응 (원칙 13)

```tsx
// 앱 루트
<Toaster />;

// 비즈니스 레이어
const toast = useToast();
toast.success('저장되었습니다.');
toast.error('오류가 발생했습니다.');
```

---

### `useSelect` 🔲

드롭다운 선택. 앵커 기반 오버레이 — Dialog/Drawer와 동일한 오버레이 인프라 위에 동작.

- `useSelect<T>()` — 타입 `T`로 스코프된 `{ Group, Option, OptionGroup }` 반환
- `Group`: `defaultValue?: T` / `value?: T` + `onChange?: (v: T) => void` (원칙 15)
- `Option`: `value: T` — `T` 이외의 값은 컴파일 오류
- 트리거 엘리먼트에 앵커링된 부동 패널로 렌더 (Portal 사용)

```tsx
type Currency = 'KRW' | 'USD' | 'EUR';
const select = useSelect<Currency>();

<select.Group defaultValue="KRW" onChange={setCurrency}>
  <select.Option value="KRW">원화 (₩)</select.Option>
  <select.Option value="USD">달러 ($)</select.Option>
  <select.Option value="JPY">엔화 (¥)</select.Option> {/* ❌ 'JPY' is not assignable to Currency */}
</select.Group>;
```

---

### `Drawer` 🔲

사이드/바텀 슬라이드 패널. Bottom Sheet 포함.

- `placement`: `left` | `right` | `bottom` | `top`
- Dialog와 동일한 `useOverlay()` 인터페이스 (원칙 4)
- `motion="slide"` (원칙 13)

```tsx
overlay.open(() => (
  <Drawer placement="bottom">
    <Drawer.Title>필터</Drawer.Title>
    <Drawer.Body>...</Drawer.Body>
  </Drawer>
));
```

---

## Utility

### `Slot` ✅

`asChild` 패턴의 구현 기반. IDS 전체에서 다형성을 제공하는 핵심 유틸리티.

- `Slot`은 자신의 props를 단일 child element에 합성(merge)하여 렌더
- `asChild`가 `true`인 컴포넌트는 기본 엘리먼트 대신 `<Slot>`을 렌더해 child가 실제 DOM 엘리먼트가 됨
- className, event handler, ref 모두 병합됨

```tsx
// Slot 내부 구현
function Slot({ children, ...props }: SlotProps) {
  return React.isValidElement(children)
    ? React.cloneElement(children, mergeProps(props, children.props))
    : null;
}

// Button에서의 asChild 활용
function Button({ asChild, ...props }: Button.Props) {
  const Comp = asChild ? Slot : 'button';
  return <Comp {...props} />;
}

// 사용 — <a>가 실제 DOM 엘리먼트, Button 스타일/동작 합성
<Button asChild>
  <a href="/docs">문서 읽기</a>
</Button>;
```

---

### `Portal` 🔲

DOM 트리 외부로 children을 렌더. Dialog/Toast/Tooltip의 내부 기반.

```tsx
<Portal>
  <FloatingMenu />
</Portal>
```

---

### `VisuallyHidden` 🔲

시각적으로 숨기되 스크린 리더에는 노출.

- `aria-label` 대신 구조적으로 접근성 텍스트를 제공할 때 사용 (원칙 12)

```tsx
<Button>
  <SearchIcon />
  <VisuallyHidden>검색</VisuallyHidden>
</Button>
```

---

### `FocusTrap` 🔲

포커스를 특정 영역 내부로 가두는 유틸리티. Dialog/Drawer의 내부 기반.

- 원칙 12 (Accessibility by Default)

---

## 구현 예정 제외

- `Show` / `Match` — 원칙 10 노트에 "굳이 필요하지 않음"으로 명시
- `DataBoundary` — 충분한 서비스 적용 사례 확보 후 검토
- `Tree`, `Timeline`, `ColorPicker`, `DatePicker` 등 — MVP 범위 외
