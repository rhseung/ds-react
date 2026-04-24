import { IconX, IconXFilled, IconXMark, IconXPowerY } from '@tabler/icons-react';

import { createIcon } from '../create-icon';

export const XIcon = createIcon(
  'XIcon',
  {
    outline: (props) => <IconX {...props} />,
    filled: (props) => <IconXFilled {...props} />,
    mark: (props) => <IconXMark {...props} />,
    powerY: (props) => <IconXPowerY {...props} />,
  },
  'outline',
);
