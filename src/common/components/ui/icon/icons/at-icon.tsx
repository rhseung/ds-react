import { IconAt, IconAtOff } from '@tabler/icons-react';

import { createIcon } from '../create-icon';

export const AtIcon = createIcon(
  'AtIcon',
  {
    outline: (props) => <IconAt {...props} />,
    off: (props) => <IconAtOff {...props} />,
  },
  'outline',
);
