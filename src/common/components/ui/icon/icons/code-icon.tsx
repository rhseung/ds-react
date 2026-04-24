import {
  IconCode,
  IconCodeAsterisk,
  IconCodeAsterix,
  IconCodeCircle,
  IconCodeCircle2,
  IconCodeCircle2Filled,
  IconCodeCircleFilled,
  IconCodeDots,
  IconCodeMinus,
  IconCodeOff,
  IconCodePlus,
  IconCodeVariable,
  IconCodeVariableMinus,
  IconCodeVariablePlus,
} from '@tabler/icons-react';

import { createIcon } from '../create-icon';

export const CodeIcon = createIcon(
  'CodeIcon',
  {
    outline: (props) => <IconCode {...props} />,
    off: (props) => <IconCodeOff {...props} />,
    dots: (props) => <IconCodeDots {...props} />,
    plus: (props) => <IconCodePlus {...props} />,
    minus: (props) => <IconCodeMinus {...props} />,
    asterisk: (props) => <IconCodeAsterisk {...props} />,
    asterix: (props) => <IconCodeAsterix {...props} />,
    circle: (props) => <IconCodeCircle {...props} />,
    circleFilled: (props) => <IconCodeCircleFilled {...props} />,
    circle2: (props) => <IconCodeCircle2 {...props} />,
    circle2Filled: (props) => <IconCodeCircle2Filled {...props} />,
    variable: (props) => <IconCodeVariable {...props} />,
    variablePlus: (props) => <IconCodeVariablePlus {...props} />,
    variableMinus: (props) => <IconCodeVariableMinus {...props} />,
  },
  'outline',
);
