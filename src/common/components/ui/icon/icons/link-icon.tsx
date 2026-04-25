import {
  IconLink,
  IconLinkFilled,
  IconLinkMinus,
  IconLinkOff,
  IconLinkPlus,
} from '@tabler/icons-react';

import { createIcon } from '../create-icon';

export const LinkIcon = createIcon(
  'LinkIcon',
  {
    outline: (props) => <IconLink {...props} />,
    filled: (props) => <IconLinkFilled {...props} />,
    off: (props) => <IconLinkOff {...props} />,
    plus: (props) => <IconLinkPlus {...props} />,
    minus: (props) => <IconLinkMinus {...props} />,
  },
  'outline',
);
