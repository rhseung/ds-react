import { IconSend2 } from '@tabler/icons-react';

import { createIcon } from '../create-icon';

export const Send2Icon = createIcon(
  'Send2Icon',
  {
    outline: (props) => <IconSend2 {...props} />,
  },
  'outline',
);
