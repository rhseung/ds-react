import {
  IconCopy,
  IconCopyCheck,
  IconCopyCheckFilled,
  IconCopyFilled,
  IconCopyMinus,
  IconCopyMinusFilled,
  IconCopyOff,
  IconCopyPlus,
  IconCopyPlusFilled,
  IconCopyX,
  IconCopyXFilled,
} from '@tabler/icons-react';

import { createIcon } from '../create-icon';

export const CopyIcon = createIcon(
  'CopyIcon',
  {
    outline: (props) => <IconCopy {...props} />,
    filled: (props) => <IconCopyFilled {...props} />,
    off: (props) => <IconCopyOff {...props} />,
    check: (props) => <IconCopyCheck {...props} />,
    checkFilled: (props) => <IconCopyCheckFilled {...props} />,
    plus: (props) => <IconCopyPlus {...props} />,
    plusFilled: (props) => <IconCopyPlusFilled {...props} />,
    minus: (props) => <IconCopyMinus {...props} />,
    minusFilled: (props) => <IconCopyMinusFilled {...props} />,
    x: (props) => <IconCopyX {...props} />,
    xFilled: (props) => <IconCopyXFilled {...props} />,
  },
  'outline',
);
