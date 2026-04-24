import { IconH1 } from '@tabler/icons-react';

import { createIcon } from '../create-icon';

export const H1Icon = createIcon(
  'H1Icon',
  {
    outline: (props) => <IconH1 {...props} />,
  },
  'outline',
);
