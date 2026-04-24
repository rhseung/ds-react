import { IconPlayerPlay, IconPlayerPlayFilled } from '@tabler/icons-react';

import { createIcon } from '../create-icon';

export const PlayerPlayIcon = createIcon(
  'PlayerPlayIcon',
  {
    outline: (props) => <IconPlayerPlay {...props} />,
    filled: (props) => <IconPlayerPlayFilled {...props} />,
  },
  'outline',
);
