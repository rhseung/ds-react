import { IconHash } from '@tabler/icons-react';

import { createIcon } from '../create-icon';

export const HashIcon = createIcon(
  'HashIcon',
  {
    outline: (props) => <IconHash {...props} />,
  },
  'outline',
);
