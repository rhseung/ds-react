import { IconStrikethrough } from '@tabler/icons-react';

import { createIcon } from '../create-icon';

export const StrikethroughIcon = createIcon(
  'StrikethroughIcon',
  {
    outline: (props) => <IconStrikethrough {...props} />,
  },
  'outline',
);
