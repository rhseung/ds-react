import { IconBold, IconBoldOff } from '@tabler/icons-react';

import { createIcon } from '../create-icon';

export const BoldIcon = createIcon(
  'BoldIcon',
  {
    outline: (props) => <IconBold {...props} />,
    off: (props) => <IconBoldOff {...props} />,
  },
  'outline',
);
