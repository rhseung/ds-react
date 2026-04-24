import {
  IconArrowUp,
  IconArrowUpBar,
  IconArrowUpCircle,
  IconArrowUpCircleFilled,
  IconArrowUpDashed,
  IconArrowUpFromArc,
  IconArrowUpLeft,
  IconArrowUpLeftCircle,
  IconArrowUpRhombus,
  IconArrowUpRhombusFilled,
  IconArrowUpRight,
  IconArrowUpRightCircle,
  IconArrowUpSquare,
  IconArrowUpSquareFilled,
  IconArrowUpTail,
  IconArrowUpToArc,
} from '@tabler/icons-react';

import { createIcon } from '../create-icon';

export const ArrowUpIcon = createIcon(
  'ArrowUpIcon',
  {
    outline: (props) => <IconArrowUp {...props} />,
    bar: (props) => <IconArrowUpBar {...props} />,
    circle: (props) => <IconArrowUpCircle {...props} />,
    circleFilled: (props) => <IconArrowUpCircleFilled {...props} />,
    dashed: (props) => <IconArrowUpDashed {...props} />,
    fromArc: (props) => <IconArrowUpFromArc {...props} />,
    left: (props) => <IconArrowUpLeft {...props} />,
    leftCircle: (props) => <IconArrowUpLeftCircle {...props} />,
    rhombus: (props) => <IconArrowUpRhombus {...props} />,
    rhombusFilled: (props) => <IconArrowUpRhombusFilled {...props} />,
    right: (props) => <IconArrowUpRight {...props} />,
    rightCircle: (props) => <IconArrowUpRightCircle {...props} />,
    square: (props) => <IconArrowUpSquare {...props} />,
    squareFilled: (props) => <IconArrowUpSquareFilled {...props} />,
    tail: (props) => <IconArrowUpTail {...props} />,
    toArc: (props) => <IconArrowUpToArc {...props} />,
  },
  'outline',
);
