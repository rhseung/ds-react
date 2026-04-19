import { Checkbox } from '@/common/components/ui/checkbox';

import { Code } from './code';
import { Kbd } from './kbd';
import { Label } from './label';
import { Text } from './text';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta = {
  title: 'Primitive/Typography',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const TextSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      {(['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'] as const).map((size) => (
        <Text key={size} size={size}>
          {size} — 빠른 갈색 여우가 게으른 개를 뛰어넘었습니다
        </Text>
      ))}
    </div>
  ),
};

export const TextWeights: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      {(
        [
          'thin',
          'extralight',
          'light',
          'normal',
          'medium',
          'semibold',
          'bold',
          'extrabold',
          'black',
        ] as const
      ).map((weight) => (
        <Text key={weight} weight={weight}>
          {weight} — 빠른 갈색 여우가 게으른 개를 뛰어넘었습니다
        </Text>
      ))}
    </div>
  ),
};

export const TextColors: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      {(
        [
          'neutral-text',
          'neutral-text-weak',
          'neutral-text-disabled',
          'primary',
          'danger',
          'success',
          'warning',
          'info',
        ] as const
      ).map((color) => (
        <Text key={color} color={color}>
          {color}
        </Text>
      ))}
    </div>
  ),
};

export const LabelDefault: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Label>일반 레이블</Label>
      <Label required>필수 레이블</Label>
    </div>
  ),
};

export const LabelWithCheckbox: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Label className="flex items-center gap-2">
        <Checkbox defaultChecked />
        htmlFor 없이 children으로 연결
      </Label>
      <Label className="flex items-center gap-2">
        <Checkbox />
        미체크
      </Label>
      <Label className="flex items-center gap-2">
        <Checkbox disabled />
        비활성
      </Label>
    </div>
  ),
};

export const CodeDefault: Story = {
  render: () => (
    <Text>
      컴포넌트를 불러오려면 <Code>import {'{ Button }'} from '@/common/components/ui'</Code>를
      사용하세요.
    </Text>
  ),
};

export const KbdDefault: Story = {
  render: () => (
    <Text>
      저장하려면 <Kbd>⌘</Kbd> + <Kbd>S</Kbd>를 누르세요.
    </Text>
  ),
};
