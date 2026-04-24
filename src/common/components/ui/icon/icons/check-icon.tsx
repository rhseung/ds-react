import { IconCheck, IconCheckFilled } from '@tabler/icons-react';

import { createIcon } from '../create-icon';

export const CheckIcon = createIcon(
  'CheckIcon',
  {
    outline: (props) => <IconCheck {...props} />,
    filled: (props) => <IconCheckFilled {...props} />,
  },
  'outline',
);
