import {
  IconTag,
  IconTagFilled,
  IconTagMinus,
  IconTagOff,
  IconTagPlus,
  IconTagStarred,
} from '@tabler/icons-react';

import { createIcon } from '../create-icon';

export const TagIcon = createIcon(
  'TagIcon',
  {
    outline: (props) => <IconTag {...props} />,
    filled: (props) => <IconTagFilled {...props} />,
    off: (props) => <IconTagOff {...props} />,
    plus: (props) => <IconTagPlus {...props} />,
    minus: (props) => <IconTagMinus {...props} />,
    starred: (props) => <IconTagStarred {...props} />,
  },
  'outline',
);
