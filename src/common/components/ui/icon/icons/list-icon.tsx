import {
  IconList,
  IconListCheck,
  IconListCheckFilled,
  IconListDetails,
  IconListDetailsFilled,
  IconListFilled,
  IconListLetters,
  IconListNumbers,
  IconListSearch,
  IconListTree,
} from '@tabler/icons-react';

import { createIcon } from '../create-icon';

export const ListIcon = createIcon(
  'ListIcon',
  {
    outline: (props) => <IconList {...props} />,
    filled: (props) => <IconListFilled {...props} />,
    check: (props) => <IconListCheck {...props} />,
    checkFilled: (props) => <IconListCheckFilled {...props} />,
    details: (props) => <IconListDetails {...props} />,
    detailsFilled: (props) => <IconListDetailsFilled {...props} />,
    letters: (props) => <IconListLetters {...props} />,
    numbers: (props) => <IconListNumbers {...props} />,
    search: (props) => <IconListSearch {...props} />,
    tree: (props) => <IconListTree {...props} />,
  },
  'outline',
);
