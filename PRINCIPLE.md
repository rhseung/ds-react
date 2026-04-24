# IDS for React — 설계 원칙

IDS는 UI 구현의 반복 패턴을 시스템이 흡수하는 **선언적 컴포넌트 시스템**입니다.

개발자는 원하는 UI를 선언하고, 접근성 연결·상태 처리·레이아웃 계산은 IDS가 처리합니다. 이 문서는 그 설계 결정들이 왜 그렇게 만들어졌는지를 설명합니다.

---

## 1부 — 선언적 UI (Declarative UI)

개발자가 의도를 선언하면, 시스템이 나머지를 처리합니다. 이 섹션은 IDS의 가장 핵심적인 작동 방식을 설명합니다.

### 선언적 UI와 시스템 책임

`radius`, `border`, `spacing` 같은 시각적 디테일과, 컴포넌트가 서로 맞닿을 때 발생하는 스타일 수정은 시스템의 몫입니다.

```typescript
<ButtonGroup variant="outline">
  <Button>왼쪽</Button>
  <Button>가운데</Button>
  <ButtonGroup.Separator />
  <Button>오른쪽</Button>
</ButtonGroup>
```

중간 버튼의 `border-radius` 제거, 좌측 `border` 중첩 처리, Separator 전후 간격 조정 — 전부 시스템이 처리합니다. 개발자가 직접 계산하고 있다면, 그것은 시스템이 해결해야 할 문제입니다.

### 구조적 Children

`leading`, `trailing` 같은 prop 이름을 외우지 않아도 됩니다. **children의 선언 순서**가 곧 시각적 구조입니다.

```typescript
// 피해야 할 방식: prop 이름을 외워야 하고, 코드가 길어짐
<TextField
  InputProps={{
    startAdornment: <SearchIcon />,
    endAdornment: <ClearIcon onClick={clear} />,
  }}
/>

// IDS 방식: 선언 순서 = 시각적 순서
<TextField placeholder="검색어를 입력하세요">
  <SearchIcon />
  <TextField.Input />
  <ClearIcon onClick={clear} />
</TextField>
```

`TextField.Input`가 pivot 역할을 합니다. 앞에 놓은 요소는 leading, 뒤에 놓은 요소는 trailing 영역으로 자동 배치됩니다.

### 시스템 속성의 전파

`size` 같은 시스템 prop은 React Context를 통해 하위 요소로 자동 전파됩니다. 자식에 명시된 값이 부모의 전파값보다 항상 우선합니다.

```typescript
<ButtonGroup size="lg">
  <Button>대형 버튼</Button>
  <Button size="sm">나만 소형</Button>  // 명시한 값이 우선
</ButtonGroup>
```

아이콘 컴포넌트도 마찬가지입니다. `SizeContext`를 자동으로 소비하므로 크기를 직접 전달할 필요가 없습니다.

```typescript
<Button size="lg">
  <SearchIcon />                   // 24px 자동 적용
  <SearchIcon variant="filled" />  // variant로 시각적 강조 수준 표현
  검색
</Button>
```

### 레이아웃 프리미티브

의미 없는 `div` 중첩을 줄이고, 레이아웃의 **의도**를 명확히 드러내는 프리미티브를 사용합니다.

**Zero External Spacing Rule**: 모든 원자 컴포넌트(`Button`, `Input` 등)는 외곽 마진이 0입니다. 간격은 항상 레이아웃 컴포넌트가 책임집니다.

```typescript
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

## 2부 — 컴포넌트 모델 (Component Model)

IDS 컴포넌트가 어떻게 설계됐는지, 그리고 왜 그렇게 결정했는지를 설명합니다.

### View vs Control 분리

View 컴포넌트는 "어떻게 보이는가"만 책임집니다. "언제 열리고 닫히는가" 같은 제어 로직은 외부 비즈니스 레이어의 몫입니다.

```typescript
// 피해야 할 방식: Modal이 트리거까지 소유 — 재사용이 어렵고 테스트가 복잡해짐
<Modal.Root>
  <Modal.Trigger>
    <Button>열기</Button>
  </Modal.Trigger>
  <Modal.Content>
    <MyModalContent />
  </Modal.Content>
</Modal.Root>

// IDS 방식: 트리거는 외부에서 관리
const { open } = useOverlay()
<Button onClick={() => open(() => <MyModal />)} />
```

이 분리는 동일한 View를 여러 트리거에서 재사용하거나, 트리거 없이 프로그래매틱하게 제어할 수 있게 합니다.

### 브랜드 독립적 설계

IDS 컴포넌트는 특정 색상값을 알지 못합니다. 오직 **시맨틱 토큰**만 참조하며, 브랜드 색상은 토큰 매핑을 통해 외부에서 주입됩니다.

```typescript
// 피해야 할 방식: 색상값 하드코딩
<button className="bg-[#0057FF] text-white" />

// IDS 방식: 시맨틱 토큰 참조
<button className="bg-primary text-on-primary" />
```

**State Layering**: hover · active 상태에서 색상 값을 직접 바꾸지 않습니다. 어떤 배경색 위에서도 일관된 상태 피드백을 주기 위해, 반투명 **State Mask 레이어**를 얹습니다. `primary`든 `danger`든 임의의 브랜드 색이든, 별도의 hover 토큰을 정의하지 않아도 됩니다.

**인터랙션 상태**: CSS pseudo-class(`:hover`, `:active`, `:focus`) 대신 `data-*` 속성을 사용합니다. 표준 인터랙션과 커스텀 상태(`data-toggled`, `data-filled` 등)를 동일한 방식으로 다룰 수 있어 일관성이 유지됩니다.

노출되는 인터랙션 상태: `data-hovered`, `data-active`, `data-focused`, `data-focus-visible`, `data-disabled`.

```typescript
<button
  className="bg-primary
             data-hovered:ring-2
             data-active:scale-[0.98]
             data-disabled:opacity-50
             data-focus-visible:outline-2"
  {...dataProps}
>
  {children}
</button>
```

다크 모드는 루트 요소의 `data-theme="dark"` 속성으로 토글됩니다.

### 네임스페이스와 타입 안전성

IDS는 컴포넌트 이름에 prefix를 붙이지 않습니다. **패키지 자체가 네임스페이스**이며, 충돌 해소는 사용하는 쪽의 책임입니다.

```typescript
import { Button, TextField, HStack } from '@ids/react'

// 충돌 시 사용하는 쪽에서 해소
import * as Ids from '@ids/react'
import { Button } from 'some-other-lib'

<Ids.Button />
<Button />   // some-other-lib의 Button
```

모든 컴포넌트는 `{Component}.Props`, `{Component}.State`, 서브컴포넌트를 하나의 네임스페이스 아래 공개합니다. IDE에서 `Checkbox.`을 입력하는 것만으로 사용 가능한 모든 것을 탐색할 수 있습니다.

```typescript
// 타입 참조
const props: Button.Props = { size: 'md' }
const state: Button.State = { hovered: true, ... }

// 서브컴포넌트와 그 타입
<Checkbox.Indicator asChild>
  <MyStarIcon />
</Checkbox.Indicator>

const props: Checkbox.Indicator.Props = { asChild: true }
```

### 플랫폼 우선 기본 경험

HTML의 기본 속성을 가리거나 래핑하지 않습니다. 모든 네이티브 HTML 속성이 그대로 전달됩니다.

```typescript
<TextField type="password" autoComplete="current-password" />
<TextField type="email"    inputMode="email" />
<Button    type="submit"   form="login-form" />
```

**Smart Enhancement**: `Input` 컴포넌트가 `type` prop에 따라 적합한 컴포넌트로 자동 분기합니다. 개발자는 항상 동일한 인터페이스를 사용하고, 내부에서 최적 UI로 교체됩니다.

```typescript
<Input type="text" placeholder="이름" />
<Input type="date" value={date} onChange={setDate} />    // 내부적으로 DatePicker
<Input type="color" value={color} onChange={setColor} /> // 내부적으로 ColorPicker
<Input type="number" min={0} max={100} />                // 내부적으로 NumberField
```

---

## 3부 — API 표현력 (API Expressiveness)

IDS 컴포넌트가 얼마나 다양한 방식으로 조합되고 확장될 수 있는지를 설명합니다.

### 다형성 표준 (asChild)

타입 안전성을 저해하고 prop 충돌을 일으키는 `as` 속성 대신, **`asChild`** 패턴을 사용합니다. 자식 엘리먼트가 렌더링 대상이 되고, IDS 컴포넌트의 스타일과 동작이 그 위에 합성됩니다.

```typescript
// 피해야 할 방식: as prop (타입 추론 붕괴, prop 충돌 위험)
<Button as="a" href="/docs">문서 읽기</Button>

// IDS 방식: asChild (자식의 타입이 그대로 보존됨)
<Button asChild>
  <a href="/docs">문서 읽기</a>
</Button>

// Next.js Link와 결합
<Button asChild>
  <Link href="/docs">문서 읽기</Link>
</Button>
```

**제네릭 compound component**: `CheckboxGroup`, `RadioGroup`, `Select` 등은 render-prop children과 제네릭을 결합합니다. 잘못된 value 전달이 컴파일 오류로 잡힙니다.

```typescript
<CheckboxGroup<Fruit> value={selected} onChange={setSelected}>
  {({ Item, All }) => (
    <>
      <Item value="apple">사과</Item>    // Fruit에 속함
      <Item value="xyz">X</Item>          // 컴파일 오류
      <All>전체 선택</All>
    </>
  )}
</CheckboxGroup>
```

**asChild 적용 단위**: 단일 엘리먼트 컴포넌트(Button, Badge 등)는 루트에 `asChild`를 적용하면 됩니다. 복수의 시각적 영역으로 구성된 컴포넌트(예: Checkbox = wrapper + hidden input + indicator)에서는 각 영역을 서브컴포넌트로 분리하고 서브컴포넌트 각각에 `asChild`를 적용합니다.

```tsx
// 모호: wrapper를 교체하면 input과 indicator가 div의 children이 됨
<Checkbox asChild defaultChecked>
  <div />
</Checkbox>

// 명확: indicator만 교체
<Checkbox defaultChecked>
  <Checkbox.Indicator asChild>
    <MyStarIcon />
  </Checkbox.Indicator>
</Checkbox>
```

이 원칙은 Switch(`Switch.Thumb`), Slider(`Slider.Track`, `Slider.Thumb`) 등 앞으로 추가될 복합 인터랙티브 컴포넌트에도 동일하게 적용됩니다.

### 상태 기반 UI 합성

모든 인터랙티브 컴포넌트의 `className`, `style`, `children`은 정적 값 대신 **컴포넌트의 런타임 상태를 인자로 받는 함수**를 허용합니다. 외부 상태를 추가하거나 ref를 사용하지 않아도, 컴포넌트가 이미 알고 있는 상태를 소비자가 직접 받아 UI를 분기할 수 있습니다.

```typescript
// className — 호버 시 ring 추가
<Button className={(state) => cn('base', state.hovered && 'ring-2 ring-offset-2')}>
  확인
</Button>

// style — 포커스 시 letter-spacing 증가
<Button style={(state) => ({ letterSpacing: state.focused ? '0.1em' : undefined })}>
  포커스해보세요
</Button>

// children — 상태에 따라 콘텐츠 분기
<Toggle>
  {(state) => state.toggled ? '켜짐' : '꺼짐'}
</Toggle>

// asChild + render children 동시 사용
<Button asChild variant="ghost">
  {(state) => <a href="#" className={state.focused ? 'ring-2' : ''}>링크</a>}
</Button>
```

정적 값과 함수 형태를 모두 허용하므로, 단순한 경우엔 기존 방식 그대로 사용하면 됩니다.

**컴포넌트 고유 상태**: 인터랙션 상태(`hovered`, `focused`, `active`, `disabled`) 외에 컴포넌트마다 고유 상태가 추가됩니다.

```typescript
// Toggle — toggled 상태
<Toggle>
  {(state) => state.toggled ? 'ON' : 'OFF'}
</Toggle>

// TextField / TextArea — filled 상태 (value.length > 0으로 파생)
<TextField>
  {(state) => (
    <>
      <TextField.Input />
      {state.filled && <ClearButton />}
    </>
  )}
</TextField>
```

### 컴포넌트 상태의 외부 구독

모든 상태성 컴포넌트에 **동일한 인터페이스**를 강제합니다.

- `defaultValue` → uncontrolled (내부 상태 관리)
- `value` + `onChange` → controlled (외부 상태 관리)
- `store` → 외부에서 rich state를 구독·조작해야 할 때의 opt-in

```typescript
// Uncontrolled
<Tabs defaultValue="home" />

// Controlled
<Tabs value={activeTab} onChange={(value) => setActiveTab(value)} />

// Store
const checkboxStore = useCheckbox({ defaultChecked: false })
<Checkbox store={checkboxStore} />
checkboxStore.get(s => s.indeterminate)     // 어디서든 reactive read
checkboxStore.set({ indeterminate: true })  // 어디서든 type-safe write
```

**언제 `value/onChange` vs `store`를 선택할까**: `value/onChange`는 리스트 렌더링, 폼 라이브러리, HTML label 연동 등 **대부분의 케이스**에 적합합니다. React Hook 규칙상 루프나 콜백 내부에서는 `use[Component]()`를 호출할 수 없기 때문입니다. `store`는 컴포넌트 외부에서 rich state 구독이 필요한 경우에만 사용합니다.

```typescript
// store 활용 예
const allStore = useCheckbox({ defaultChecked: false })
<Checkbox store={allStore} />
<SummaryBar indeterminate={allStore.get(s => s.indeterminate)} />

allStore.set({ checked: true, indeterminate: false })   // batch update
allStore.get(s => s.checked === true && !s.disabled)    // 파생 값
allStore.get(s => s.hovered || s.focused)               // 복합 조건
```

`store`와 `value/onChange`는 **상호 배타적**입니다. `store`가 전달되면 `value`, `onChange`, `defaultValue`는 무시됩니다.

`store`는 트리 구조와 무관하게 컴포넌트 상태를 공유할 때 특히 유용합니다.

```typescript
const tabsStore = useTabs()

<Tabs store={tabsStore}>
  <Tab value="info">정보</Tab>
  <Tab value="review">리뷰</Tab>
</Tabs>

// 완전히 다른 위치의 UI도 탭 상태에 반응
<Breadcrumb>
  <Breadcrumb.Item>{tabsStore.get(s => s.activeTab)}</Breadcrumb.Item>
</Breadcrumb>
```

---

## 4부 — 시스템 기능 (System Capabilities)

IDS가 내장으로 제공하는 기능들입니다. 개발자는 이 기능들을 직접 구현할 필요가 없습니다.

### 접근성 자동화

IDS는 각 컴포넌트의 의미(semantic)를 알고 있습니다. 필요한 ARIA 속성은 시스템이 자동으로 주입하며, 개발자가 직접 관리해야 할 경우에만 override합니다.

```typescript
// IDS 방식: 구조에서 ARIA를 자동 연결
<Modal>
  <Modal.Title>제목</Modal.Title>   // aria-labelledby 자동 연결
  <Modal.Body>설명</Modal.Body>     // aria-describedby 자동 연결
</Modal>

<ButtonGroup aria-label="텍스트 서식">  // role="group" 자동 주입
  <Button aria-label="굵게"><BoldIcon /></Button>
  <Button aria-label="기울임"><ItalicIcon /></Button>
</ButtonGroup>
```

키보드 탐색, focus 관리, 스크린 리더 대응은 IDS 내부에서 구현됩니다. 접근성은 옵션이 아닌 기본값입니다.

### 모션 선언적 표현

애니메이션 구현 세부사항을 컴포넌트 밖으로 노출하지 않습니다. IDS는 **의도 기반의 모션 토큰**을 제공하며, `prefers-reduced-motion` 대응도 시스템이 책임집니다.

```typescript
// 구현 세부사항이 노출되는 방식
<motion.div
  initial={{ opacity: 0, y: -8 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -8 }}
  transition={{ duration: 0.15, ease: 'easeOut' }}
>
  <Tooltip />
</motion.div>

// IDS 방식: 의도만 선언
<Tooltip motion="popup">내용</Tooltip>
```

enter/exit animation이 있는 모든 오버레이 컴포넌트에 `<Presence />`가 필요합니다.

### 반응형 Props

`useBreakpoint` 훅이나 미디어 쿼리를 컴포넌트 밖에서 직접 다루는 대신, **prop 자체가 반응형 값을 받을 수 있습니다.**

```typescript
// 반응형 로직이 컴포넌트 밖으로 누출되는 방식
const isMobile = useBreakpoint('sm')
<Grid columns={isMobile ? 1 : 3} />

// IDS 방식: prop이 직접 breakpoint 맵을 받음
<Grid columns={{ base: 1, sm: 2, lg: 3 }} gap={{ base: 'sm', lg: 'lg' }} />

<Text size={{ base: 'sm', md: 'md', lg: 'lg' }}>
  반응형 텍스트
</Text>
```

단일 값과 breakpoint 맵을 모두 허용하므로, 반응형이 필요 없는 경우엔 기존 방식 그대로 사용하면 됩니다.

### 조건부 렌더링과 빈 상태

`&&` 연산자나 삼항 연산자를 JSX 안에 직접 쓰는 방식은 중첩될수록 가독성이 급격히 떨어집니다. IDS는 조건부 렌더링과 빈/에러 상태를 **선언적 컴포넌트**로 흡수합니다.

```typescript
// 조건부 렌더링
<Match value={status}>
  <Match.Case when="loading"> <Spinner />             </Match.Case>
  <Match.Case when="error">   <ErrorMessage />        </Match.Case>
  <Match.Case when="success"> <Content data={data} /> </Match.Case>
</Match>

// 빈 상태
<List items={items}>
  <List.Empty>항목이 없습니다.</List.Empty>
</List>

// 데이터 페칭 경계
<DataBoundary query={useProductsQuery()}>
  <DataBoundary.Loading> <Skeleton />    </DataBoundary.Loading>
  <DataBoundary.Error>
    {(error) => <ErrorView message={error.message} />}
  </DataBoundary.Error>
  <DataBoundary.Data>
    {(products) => <ProductList items={products} />}
  </DataBoundary.Data>
</DataBoundary>
```

`Match`의 `value` 타입에 따라 `when`의 자동완성과 exhaustive 체크가 TypeScript 수준에서 가능합니다.

### 개발 시 자가 진단

잘못된 사용을 런타임 초기에 감지하고, 문서 링크를 포함한 경고 메시지로 안내합니다. 프로덕션 빌드에서는 완전히 제거됩니다.

```typescript
// TextField.Input 누락
<TextField>
  <SearchIcon />
</TextField>
// [IDS] TextField: children에 TextField.Input가 없습니다.
//    → https://design.gistory.me/components/text-field#input

// 잘못된 중첩
<Button>
  <Button>중첩</Button>
</Button>
// [IDS] Button: Button을 자식으로 사용할 수 없습니다.
//    여러 버튼을 묶으려면 ButtonGroup을 사용하세요.
//    → https://design.gistory.me/components/button-group

// 접근성 prop 누락
<ButtonGroup>
  <Button><BoldIcon /></Button>
</ButtonGroup>
// [IDS] ButtonGroup: 아이콘만 있는 Button에는 aria-label이 필요합니다.
//    → https://design.gistory.me/accessibility/icon-button
```

---

## 5부 — 확장성 (Scalability)

IDS가 여러 브랜드, 테마, 언어권에 걸쳐 어떻게 확장되는지를 설명합니다.

### 중첩 테마 프로바이더

accent 색상과 light/dark 모드는 **독립적인 축**으로 분리됩니다. 두 축의 합성은 CSS cascade가 자동으로 처리합니다.

```typescript
<ThemeProvider accent="#2563EB" theme="light">
  <App />
</ThemeProvider>
```

`accent`에 hex 색상 하나를 넘기면, OKLCH 색공간 기반으로 **primary / secondary / tertiary 세 팔레트 전체**가 자동 생성됩니다.

- **primary** — seed 색상 그대로
- **secondary** — 같은 hue, chroma 40% 감소 (채도를 낮춘 동반 색)
- **tertiary** — hue +60° (유사색 계열 강조)

각 팔레트는 `default` / `weak` / `contrast` 세 톤과, 위에 올라올 텍스트 색(`on-*`)을 포함해 총 18개의 CSS 변수로 확장됩니다. light/dark 모드 전환 시에도 대비비를 유지하도록 L값이 자동 조정됩니다.

브랜드 색상 하나만 정하면 디자인 시스템이 나머지 색 체계 전체를 도출합니다.

accent와 theme을 **독립적으로 중첩**할 수 있습니다.

```typescript
<ThemeProvider accent="blue" theme="light">
  <Header />

  {/* 사이드바만 dark — accent는 부모(blue) 상속 */}
  <ThemeProvider theme="dark">
    <Sidebar />
  </ThemeProvider>

  {/* 특정 섹션만 accent 교체 — theme은 부모(light) 상속 */}
  <ThemeProvider accent="red">
    <PromoBanner />
  </ThemeProvider>
</ThemeProvider>
```

### RTL / LTR 지원

레이아웃 방향은 브랜드·모드와 마찬가지로 독립적인 축입니다. `DirectionProvider`로 중첩 범위를 제어합니다.

```typescript
function DirectionProvider({ dir, children }: {
  dir: 'ltr' | 'rtl'
  children: React.ReactNode
}) {
  return <div dir={dir}>{children}</div>
}

// 아랍어 콘텐츠만 RTL
<DirectionProvider dir="ltr">
  <App />
  <DirectionProvider dir="rtl">
    <ArabicContent />
  </DirectionProvider>
</DirectionProvider>
```

모든 컴포넌트는 CSS 논리 속성(`margin-inline-start`, `padding-inline-end`)과 논리 Tailwind 클래스(`ms-*`, `me-*`, `ps-*`, `pe-*`)만 사용합니다. `dir` 변경만으로 전체 레이아웃이 미러링됩니다.

```css
/* 피해야 할 방식: 방향 고정 */
.icon { margin-left: 8px; }

/* IDS 방식: 방향 독립 */
.icon { margin-inline-start: 8px; }
```
