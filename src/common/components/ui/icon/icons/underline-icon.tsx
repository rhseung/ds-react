import { IconUnderline } from '@tabler/icons-react';

import { createIcon } from '../create-icon';

export const UnderlineIcon = createIcon(
  'UnderlineIcon',
  {
    outline: (props) => <IconUnderline {...props} />,
  },
  'outline',
);
