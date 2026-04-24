import { IconH2 } from '@tabler/icons-react';

import { createIcon } from '../create-icon';

export const H2Icon = createIcon(
  'H2Icon',
  {
    outline: (props) => <IconH2 {...props} />,
  },
  'outline',
);
