# IDS for React — 설계 원칙

IDS는 단순한 컴포넌트 모음이 아닌, **선언적인 UI 문법(Declarative UI Syntax)**입니다.
개발자가 UI의 **구조(Structure)**를 선언하면, 시스템이 **디테일(Detail)**과 **인접 처리(Adjacency)**를 책임집니다. "어떻게 구현할지"가 아니라 "무엇을 만들고 싶은지"만 코드에 남습니다.

---

## 1. 선언적 UI와 시스템 책임 (Declarative by Default)

개발자는 UI의 **의도**만 선언합니다. `radius`, `border`, `spacing` 같은 시각적 디테일과, 컴포넌트가 서로 맞닿을 때 발생하는 스타일 수정은 전부 시스템의 몫입니다.

```typescript
// ✅ 개발자는 구조만 선언합니다.
<ButtonGroup variant="outline">
  <Button>왼쪽</Button>
  <Button>가운데</Button>
  <ButtonGroup.Separator />
  <Button>오른쪽</Button>
</ButtonGroup>

/**
 * [시스템의 책임]
 * 1. 첫 번째 버튼: 오른쪽 border-radius 제거
 * 2. 중간 버튼: 양쪽 border-radius 제거 및 좌측 border 중첩 해결
 * 3. Separator 뒤의 버튼: 간격 및 경계면 재설정
 */
```

이 원칙은 IDS 전체를 관통합니다. 개발자가 직접 계산하고 있다면, 그것은 시스템이 해결해야 할 문제입니다.

---

## 2. 구조적 Children (Structural Children over Prop-Dumping)

`leading`, `trailing` 같은 명시적 key 없이, **children의 선언 순서**만으로 구조를 선언합니다. `TextField.Inner`가 pivot 역할을 하며, 그 앞뒤에 자유롭게 슬롯을 배치합니다. 내부는 flex 레이아웃으로 시각적 순서를 그대로 반영합니다.

### 기존 방식의 문제

```typescript
// ❌ 비권장: Prop-Dumping (코드가 비대해지고 구조가 숨음)
<TextField
  label="검색"
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <SearchIcon />
      </InputAdornment>
    ),
    endAdornment: (
      <IconButton onClick={clear}>
        <ClearIcon />
      </IconButton>
    ),
  }}
/>
```

### IDS의 해결책

```typescript
// ✅ 권장: 선언 순서 = 시각적 순서
<TextField placeholder="검색어를 입력하세요">
  <SearchIcon />                {/* pivot 앞 → leading 영역  */}
  <TextField.Inner />           {/* ← pivot: input 위치     */}
  <ClearIcon onClick={clear} /> {/* pivot 뒤 → trailing 영역 */}
</TextField>
```

개발자는 `leading`/`trailing` 같은 API를 전혀 몰라도 됩니다. 시각적 순서대로 나열하면 됩니다.

---

## 3. 시스템 속성의 전파 (System Prop Propagation)

`size`, `intent`와 같은 시스템 prop은 React Context를 통해 하위 요소로 자동 전파됩니다. 반복 선언이 줄어들고, 자식 요소에 명시된 값이 부모의 전파값보다 항상 우선합니다.

```typescript
// ✅ Icon은 부모 Button의 size를 Context로 자동 감지
<Button size="md">
  <SunIcon />   {/* size="md"를 prop으로 받지 않아도 자동 적용 */}
  라이트 모드
</Button>

// 복합 구조에서의 전파와 override
<ButtonGroup size="lg">
  <Button>대형 버튼</Button>            {/* lg 자동 적용 */}
  <Button size="sm">나만 소형</Button>  {/* 명시값이 전파값보다 우선 */}
</ButtonGroup>
```

전파는 **단방향**입니다. 자식이 부모의 값을 변경하지 않으며, 명시적 override만 허용됩니다.

### 아이콘과 크기 전파

아이콘은 크기를 스스로 알지 못합니다. `createIcon`으로 만들어진 아이콘 컴포넌트는 `SizeContext`를 자동으로 소비하며, 개발자는 크기를 직접 계산하거나 전달하지 않습니다.

```typescript
// ✅ 아이콘은 부모의 size를 Context로 자동 감지
<Button size="lg">
  <SearchIcon />            {/* 24px 자동 적용 */}
  <SearchIcon variant="filled" />  {/* variant로 시각적 강조를 표현 */}
  검색
</Button>

// ❌ 크기를 직접 계산 — 시스템의 책임을 침범
<Button size="lg">
  <SearchIcon size={24} />
  검색
</Button>
```

아이콘 variant(`outline`, `filled`, `duo` 등)는 **시각적 강조 수준**을 표현합니다. 어떤 variant가 존재하는지는 `createIcon` 정의 시 결정되며, 정의되지 않은 variant를 사용하면 컴파일 에러가 납니다.

---

## 4. 관심사의 분리 (View vs Control)

View 컴포넌트는 "어떻게 보이는가"만 책임집니다. "언제 열리고 닫히는가" 같은 제어 로직은 외부 비즈니스 레이어의 몫입니다.

```typescript
// ❌ 비권장: Modal이 트리거까지 소유
<Modal.Root>
  <Modal.Trigger>
    <Button>열기</Button>
  </Modal.Trigger>
  <Modal.Content>
    <MyModalContent />
  </Modal.Content>
</Modal.Root>

// ✅ 권장: 트리거는 외부 비즈니스 로직에서 관리
const { open } = useOverlay()

<Button onClick={() => open(() => <MyModal />)} />
```

이 분리는 동일한 View를 여러 트리거에서 재사용하거나, 트리거 없이 프로그래매틱하게 제어할 수 있게 합니다.

---

## 5. 레이아웃 프리미티브 (Layout Primitives)

의미 없는 `div` 중첩을 줄이고, 레이아웃의 **의도**를 명확히 드러내는 프리미티브를 사용합니다.

**Zero External Spacing Rule**: 모든 원자 컴포넌트(`Button`, `Input` 등)는 외곽 마진이 0입니다. 간격은 항상 레이아웃 컴포넌트가 책임집니다.

```typescript
// ❌ 비권장: div와 margin으로 레이아웃 의도가 숨음
<div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
    <Avatar />
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <span>홍길동</span>
      <span>개발자</span>
    </div>
  </div>
  <Button>프로필 보기</Button>
</div>

// ✅ 권장: 레이아웃 의도가 구조에 드러남
<VStack gap={4}>
  <HStack gap={2}>
    <Avatar />
    <VStack gap={1}>
      <Text>홍길동</Text>
      <Text>개발자</Text>
    </VStack>
  </HStack>
  <Button>프로필 보기</Button>
</VStack>
```

제공되는 레이아웃 프리미티브: `Box`, `HStack`, `VStack`, `Spacer`, `Grid`, `Group`.

---

## 6. 브랜드 독립적 설계 (Brand-agnostic)

IDS 컴포넌트는 특정 색상값을 알지 못합니다. 오직 **시맨틱 토큰**만 참조하며, 브랜드 색상은 토큰 매핑을 통해 외부에서 주입됩니다.

```typescript
// ❌ 비권장: 색상값 하드코딩
<button className="bg-[#0057FF] text-white" />

// ✅ 권장: 시맨틱 토큰 참조
<button className="bg-primary text-on-primary" />
```

**State Layering**: hover / active / pressed 상태 시 색상을 직접 변경하지 않습니다. 어떤 색상 위에서도 일관된 상태 피드백을 주기 위해, 반투명 **State Mask 레이어**를 얹습니다.

```typescript
// 컴포넌트 내부 구현 예시
<button
  className="relative bg-primary text-on-primary"
  data-hovered={isHovered}
  data-pressed={isPressed}
>
  <span className="absolute inset-0 rounded-[inherit] pointer-events-none"
        style={{ background: 'var(--ids-state-mask)' }} />
  {children}
</button>
```

```css
[data-hovered] {
  --ids-state-mask: rgba(0, 0, 0, 0.06);
}
[data-pressed] {
  --ids-state-mask: rgba(0, 0, 0, 0.12);
}

[data-mode='dark'] [data-hovered] {
  --ids-state-mask: rgba(255, 255, 255, 0.08);
}
[data-mode='dark'] [data-pressed] {
  --ids-state-mask: rgba(255, 255, 255, 0.14);
}
```

`primary`든 `danger`든 임의의 브랜드 색이든, hover 토큰을 따로 정의하지 않아도 됩니다.

---

## 7. 네임스페이스와 타입 안전성 (Module as Namespace)

IDS는 컴포넌트 이름에 prefix를 붙이지 않습니다. **패키지 자체가 네임스페이스**이며, 충돌 해소는 사용하는 쪽의 책임입니다.

```typescript
// 충돌 없으면 그냥 사용
import { Button, TextField, HStack } from '@ids/react'

// 충돌 시 사용하는 쪽에서 해소
import * as Ids from '@ids/react'
import { Button } from 'some-other-lib'

<Ids.Button />
<Button />   // some-other-lib의 Button
```

모든 컴포넌트는 `{Component}.Props`와 `{Component}.State`를 공개하여 IDE 탐색성을 보장합니다. IDE에서 `Button.`을 입력하는 것만으로 사용 가능한 모든 서브 컴포넌트와 타입을 탐색할 수 있습니다.

```typescript
export function Button(props: Button.Props) { ... }

export namespace Button {
  export type State = { hovered: boolean; focused: boolean; pressed: boolean }
  export interface Props {
    size?:    'sm' | 'md' | 'lg'
    disabled?: boolean
    asChild?:  boolean
  }
}
```

서브컴포넌트가 있는 경우, 서브컴포넌트 함수와 그 `Props` 타입을 **모두 namespace 안에서 직접 선언**합니다. 별도 함수를 최상단에 정의한 뒤 `Namespace.Sub = Fn`으로 할당하는 방식은 사용하지 않습니다.

```typescript
export namespace Checkbox {
  export type State = ReturnType<typeof useCheckbox>['state']

  // 서브컴포넌트 구현을 namespace 안에서 직접 선언
  export function Indicator({ asChild, children }: Indicator.Props) { ... }

  // 중첩 namespace로 Checkbox.Indicator.Props 접근 가능
  export namespace Indicator {
    export interface Props {
      asChild?: boolean
      children?: ReactNode
    }
  }

  export interface Props { ... }
}
```

이 패턴은 루트 컴포넌트가 `Checkbox.Props`를 노출하는 것과 동일한 방식으로 서브컴포넌트의 타입을 `Checkbox.Indicator.Props`로 노출합니다. 트리 쉐이킹도 가능하며, IDE 자동완성에서 컴포넌트·서브컴포넌트·타입이 한 네임스페이스 아래 일관되게 탐색됩니다.

---

## 8. 다형성 표준 (Polymorphism: asChild + Render Children)

타입 안전성을 저해하고 prop 충돌을 일으키는 `as` 속성 대신, **`asChild`** 패턴을 사용합니다. 자식 엘리먼트가 렌더링 대상이 되고, IDS 컴포넌트의 스타일과 동작이 그 위에 합성됩니다.

```typescript
// ❌ 비권장: as prop (타입 추론 붕괴, prop 충돌 위험)
<Button as="a" href="/docs">문서 읽기</Button>

// ✅ 권장: asChild (자식의 타입이 그대로 보존됨)
<Button asChild>
  <a href="/docs">문서 읽기</a>
</Button>

// Next.js Link와 결합
<Button asChild>
  <Link href="/docs">문서 읽기</Link>
</Button>
```

### Render Children — 상태 기반 합성

`asChild`가 엘리먼트 교체를 위한 패턴이라면, **render children**은 컴포넌트의 런타임 상태를 소비하기 위한 패턴입니다. `className`, `style`, `children`은 정적 값 대신 상태를 인자로 받는 함수를 허용합니다.

```typescript
// className — 상태에 따라 동적으로 클래스 지정
<Button className={(state) => cn('base', state.hovered && 'ring-2')}>
  확인
</Button>

// children — 상태에 따라 콘텐츠 분기
<Toggle>
  {(state) => state.toggled ? '켜짐' : '꺼짐'}
</Toggle>

// asChild + render children 동시 사용 가능
// children 함수가 먼저 실행되어 ReactNode를 반환하고, Slot이 그 결과에 props를 합성함
<Button asChild>
  {(state) => <a className={state.focused ? 'ring' : ''}>링크</a>}
</Button>
```

이 패턴은 외부 상태를 추가하거나 조건부 렌더링 로직을 컴포넌트 밖으로 꺼내지 않아도 됩니다. 컴포넌트가 이미 알고 있는 상태를 소비하는 것이기 때문에 시스템의 책임 범위 안에 있습니다.

### asChild 적용 단위 — 영역별 서브컴포넌트 분리

단일 엘리먼트를 렌더링하는 컴포넌트(Button, Badge 등)는 루트에 `asChild`를 적용해도 교체 대상이 명확합니다.

반면, **시각적·의미적으로 구분되는 복수의 영역**을 렌더링하는 컴포넌트에서 루트에만 `asChild`를 두면 "무엇을 교체하는가"가 모호해집니다. 예를 들어 Checkbox는 wrapper(상호작용 영역), hidden `<input>`(폼 제출), indicator(체크 아이콘)로 구성됩니다. 이 상태에서 루트 `asChild`를 적용하면 내부 구조 전체가 통째로 사용자 엘리먼트의 children이 되어 교체 범위가 불명확합니다.

이 경우 각 영역을 **서브컴포넌트**로 분리하고, 서브컴포넌트 각각에 `asChild`를 적용합니다. 이는 [Base UI의 Checkbox](https://base-ui.com/react/components/checkbox)가 `Checkbox.Root` + `Checkbox.Indicator`로 나누는 이유와 같습니다.

```tsx
// ❌ 모호: wrapper를 교체하면 input과 indicator가 div의 children이 됨
<Checkbox asChild defaultChecked>
  <div />
</Checkbox>

// ✅ 명확: indicator만 교체
<Checkbox defaultChecked>
  <Checkbox.Indicator asChild>
    <MyStarIcon />
  </Checkbox.Indicator>
</Checkbox>
```

이 원칙은 Switch(`Switch.Thumb`), Slider(`Slider.Track`, `Slider.Thumb`) 등 앞으로 추가될 복합 인터랙티브 컴포넌트에도 동일하게 적용됩니다.

---

## 9. 플랫폼 우선 기본 경험 (Native-first)

HTML의 기본 속성을 가리거나 래핑하지 않습니다. 모든 네이티브 HTML 속성이 그대로 전달됩니다.

```typescript
// 네이티브 HTML 속성을 그대로 지원
<TextField type="password" autoComplete="current-password" />
<TextField type="email"    inputMode="email" />
<Button    type="submit"   form="login-form" />
```

**Smart Enhancement**: 인터페이스는 유지하되, 내부적으로 더 고도화된 UI로 대체 렌더링할 수 있습니다.

```typescript
// 개발자 인터페이스는 동일
// 내부적으로 native input 또는 custom DatePicker로 분기
<TextField type="date" />
```

---

## 10. 조건부 렌더링의 표준화 (Conditional Rendering Primitives)

`&&` 연산자나 삼항 연산자를 JSX 안에 직접 쓰는 방식은 중첩될수록 가독성이 급격히 떨어집니다. IDS는 조건부 렌더링을 **선언적 컴포넌트**로 흡수합니다.

```typescript
// ❌ 비권장: 로직이 JSX 안에 섞임
<div>
  {isLoading && <Spinner />}
  {!isLoading && error && <ErrorMessage />}
  {!isLoading && !error && data && <Content data={data} />}
</div>

// ✅ 권장: 상태를 선언적으로 표현
<Match value={status}>
  <Match.Case when="loading"> <Spinner />          </Match.Case>
  <Match.Case when="error">   <ErrorMessage />     </Match.Case>
  <Match.Case when="success"> <Content data={data} /> </Match.Case>
</Match>

// 단순 show/hide
<Show when={isVisible} fallback={<Skeleton />}>
  <Content />
</Show>
```

`Match`의 `value` 타입에 따라 `when`의 자동완성과 exhaustive 체크가 TypeScript 수준에서 가능합니다. 케이스가 누락되면 컴파일 에러로 즉시 감지합니다.

> **이건 근데 굳이 필요하지 않음**

---

## 11. 에러/빈 상태의 일급 처리 (First-class Empty & Error States)

컴포넌트가 데이터를 받을 때, `null` / 빈 배열 / 에러 상태에 대한 처리를 개발자에게 전가하지 않습니다. IDS 컴포넌트는 **상태별 기본 UI를 내장**하며, 필요할 때만 override합니다.

```typescript
// ❌ 비권장: 매번 방어 코드를 직접 작성
{isLoading
  ? <Skeleton />
  : items.length === 0
    ? <p>항목이 없습니다.</p>
    : <List items={items} />
}

// ✅ 권장: 컴포넌트가 각 상태를 알고 있음
<List items={items}>
  <List.Empty>항목이 없습니다.</List.Empty>
</List>

// 데이터 페칭과 결합
<DataBoundary query={useProductsQuery()}>
  <DataBoundary.Loading> <Skeleton />    </DataBoundary.Loading>
  <DataBoundary.Error>
    {(error) => <ErrorView message={error.message} />}
  </DataBoundary.Error>
  <DataBoundary.Empty>   <EmptyState />  </DataBoundary.Empty>
  <DataBoundary.Data>
    {(products) => <ProductList items={products} />}
  </DataBoundary.Data>
</DataBoundary>
```

---

## 12. 접근성의 자동화 (Accessibility by Default)

IDS는 각 컴포넌트의 의미(semantic)를 알고 있습니다. 필요한 ARIA 속성은 시스템이 자동으로 주입하며, 개발자가 직접 관리해야 할 경우에만 명시적으로 override합니다.

```typescript
// ❌ 비권장: ARIA를 개발자가 직접 관리
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title"
  aria-describedby="modal-desc"
>
  <h2 id="modal-title">제목</h2>
  <p id="modal-desc">설명</p>
</div>

// ✅ 권장: IDS가 구조에서 ARIA를 자동 연결
<Modal>
  <Modal.Title>제목</Modal.Title>  {/* → aria-labelledby 자동 연결 */}
  <Modal.Body>설명</Modal.Body>    {/* → aria-describedby 자동 연결 */}
</Modal>

// ButtonGroup에서도 자동 처리
<ButtonGroup aria-label="텍스트 서식">  {/* role="group" 자동 주입 */}
  <Button aria-label="굵게"><BoldIcon /></Button>
  <Button aria-label="기울임"><ItalicIcon /></Button>
</ButtonGroup>
```

키보드 탐색, focus 관리, 스크린 리더 대응은 IDS 내부에서 구현됩니다. 접근성은 옵션이 아닌 기본값입니다.

---

## 13. 애니메이션의 선언적 표현 (Declarative Motion)

애니메이션 구현 세부사항을 컴포넌트 밖으로 노출하지 않습니다. IDS는 **의도 기반의 모션 토큰**을 제공하며, `prefers-reduced-motion` 대응도 시스템이 책임집니다.

```typescript
// ❌ 비권장: 구현 세부사항이 노출됨
<motion.div
  initial={{ opacity: 0, y: -8 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -8 }}
  transition={{ duration: 0.15, ease: 'easeOut' }}
>
  <Tooltip />
</motion.div>

// ✅ 권장: 의도만 선언
<Tooltip motion="popup">내용</Tooltip>
```

enter/exit animation을 위해 모든 컴포넌트에 `<Presence />`를 제대로 장착하는 것이 좋다.

---

## 14. 반응형의 선언적 표현 (Responsive Props)

`useBreakpoint` 훅이나 미디어 쿼리를 컴포넌트 밖에서 직접 다루는 대신, **prop 자체가 반응형 값을 받을 수 있습니다.**

```typescript
// ❌ 비권장: 반응형 로직이 컴포넌트 밖으로 누출
const isMobile = useBreakpoint('sm')
<Grid columns={isMobile ? 1 : 3} gap={isMobile ? 'sm' : 'lg'} />

// ✅ 권장: prop이 직접 breakpoint 맵을 받음
<Grid columns={{ base: 1, sm: 2, lg: 3 }} gap={{ base: 'sm', lg: 'lg' }} />

<Text size={{ base: 'sm', md: 'md', lg: 'lg' }}>
  반응형 텍스트
</Text>

<HStack
  direction={{ base: 'vertical', md: 'horizontal' }}
  gap={{ base: 'sm', lg: 'lg' }}
>
  ...
</HStack>
```

반응형 prop의 타입은 `T | Responsive<T>`로 정의되어, 단일 값과 breakpoint 맵을 모두 허용합니다.

```typescript
type Responsive<T> =
  | T
  | {
      base?: T;
      sm?: T;
      md?: T;
      lg?: T;
      xl?: T;
    };
```

---

## 15. 컴포넌트 상태의 외부 구독 (Controlled/Uncontrolled 표준화)

모든 상태성 컴포넌트에 **동일한 인터페이스**를 강제합니다. 컴포넌트마다 다른 패턴을 익힐 필요가 없습니다.

- `defaultValue` → uncontrolled (내부 상태 관리)
- `value` + `onChange` → controlled (외부 상태 관리)
- `state` → 외부 강제 상태. **항상 동일한 prop 이름**

```typescript
// Uncontrolled
<Tabs defaultValue="home" />

// Controlled
<Tabs value={activeTab} onChange={(value) => setActiveTab(value)} />

// 외부 강제 상태 — state prop은 항상 동일한 이름
<TextField
  value={value}
  onChange={setValue}
  state="error"
  stateMessage="이미 사용 중인 이메일입니다."
/>
<Select   state="disabled" />
<Checkbox state="indeterminate" />
```

`state` prop의 허용값은 컴포넌트마다 다르지만, prop 이름은 항상 `state`로 통일됩니다.

---

## 16. 개발 시 자가 진단 (Dev-time Diagnostics)

잘못된 사용을 런타임 초기에 감지하고, 문서 링크를 포함한 경고 메시지로 안내합니다. 프로덕션 빌드에서는 완전히 제거됩니다.

```typescript
// TextField.Inner 누락
<TextField>
  <SearchIcon />
  {/* TextField.Inner 없음 */}
</TextField>
// ⚠️ [IDS] TextField: children에 TextField.Inner가 없습니다.
//    input이 렌더링될 위치를 선언해주세요.
//    → https://ids.dev/components/text-field#inner

// 잘못된 중첩
<Button>
  <Button>중첩</Button>
</Button>
// ⚠️ [IDS] Button: Button을 자식으로 사용할 수 없습니다.
//    여러 버튼을 묶으려면 ButtonGroup을 사용하세요.
//    → https://ids.dev/components/button-group

// 필수 접근성 prop 누락
<ButtonGroup>
  <Button><BoldIcon /></Button>
</ButtonGroup>
// ⚠️ [IDS] ButtonGroup: 아이콘만 있는 Button에는 aria-label이 필요합니다.
//    → https://ids.dev/accessibility/icon-button
```

---

## 17. 컴포넌트 훅 (Component Hooks via `use[Component]`)

모든 상태성 컴포넌트는 대응하는 `use[Component]` 훅을 공개합니다. 훅은 세 레이어로 구성되며, 필요한 레이어까지만 소비합니다.

```text
use[Component]()
├── 인터랙션 레이어   pressed / focused / hovered / handlers
├── 시스템 레이어     size / intent / disabled (전파된 값 포함)
└── 토큰 레이어       tokens.height / tokens.iconSize / tokens.color ...
```

### 로직만 가져와서 커스텀 UI에 적용

```typescript
const {
  pressed,
  focused,
  handlers,  // onPointerDown, onKeyDown, onFocus 등 접근성 포함
} = useButton({
  onClick: handleClick,
  disabled: isLoading,
})

return (
  <motion.div
    role="button"
    tabIndex={0}
    {...handlers}
    data-pressed={pressed}
    data-focused={focused}
  >
    {isLoading ? <Spinner /> : children}
  </motion.div>
)
```

### 부모 컴포넌트의 컨텍스트 구독

```typescript
function CustomIcon() {
  // 부모 Button의 size, intent, 토큰을 prop 없이 구독
  const { size, tokens } = useButtonContext()

  return (
    <svg
      width={tokens.iconSize}   // size="md" → 20, size="lg" → 24
      color={tokens.iconColor}  // intent="danger" → danger 토큰
    />
  )
}

<Button size="lg" intent="danger">
  <CustomIcon />   {/* size, intent를 prop으로 받지 않아도 자동 감지 */}
  삭제
</Button>
```

### 내부 상태 외부 구독

```typescript
// ref 없이 컴포넌트 상태를 외부에서 구독
const tabsStore = useTabs()

<Tabs store={tabsStore}>
  <Tab value="info">정보</Tab>
  <Tab value="review">리뷰</Tab>
</Tabs>

{/* 완전히 다른 위치에 있는 UI도 탭 상태에 반응 */}
<Breadcrumb>
  <Breadcrumb.Item>{tabsStore.activeTab}</Breadcrumb.Item>
</Breadcrumb>
```

### 테마 컨텍스트 직접 소비

```typescript
function AdaptiveIcon() {
  const { tokens, mode } = useTheme()

  return (
    <svg
      fill={tokens.color.primary}
      strokeWidth={mode === 'dark' ? 1.5 : 2}
    />
  )
}
```

---

## 18. 중첩 테마 프로바이더 (Nested Theme Provider)

브랜드와 모드는 **독립적인 축**으로 분리됩니다. 각 축은 서로 다른 토큰 계층만 담당하며, 두 축의 합성은 CSS cascade가 자동으로 처리합니다.

### `ThemeProvider`

```typescript
type Brand = 'blue' | 'red' | 'green'  // CSS에 정의된 것만 허용
type Mode  = 'light' | 'dark'

function ThemeProvider({ brand, mode, children }: {
  brand?:   Brand
  mode?:    Mode
  children: React.ReactNode
}) {
  return (
    <div data-brand={brand} data-mode={mode}>
      {children}
    </div>
  )
}
```

브랜드와 모드를 **독립적으로 중첩**할 수 있습니다.

```typescript
// 앱 전체: blue 브랜드, light 모드
<ThemeProvider brand="blue" mode="light">
  <Header />

  {/* 사이드바만 dark — 브랜드는 부모(blue) 상속 */}
  <ThemeProvider mode="dark">
    <Sidebar />
  </ThemeProvider>

  {/* 특정 섹션만 브랜드 교체 — 모드는 부모(light) 상속 */}
  <ThemeProvider brand="red">
    <PromoBanner />
  </ThemeProvider>
</ThemeProvider>
```

새 브랜드 추가 = CSS에 `[data-brand="..."]` 셀렉터 하나 + `Brand` 타입에 문자열 하나.
