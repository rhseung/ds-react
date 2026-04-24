import { IconPlus, IconPlusEqual, IconPlusFilled, IconPlusMinus } from '@tabler/icons-react';

import { createIcon } from '../create-icon';

export const PlusIcon = createIcon(
  'PlusIcon',
  {
    outline: (props) => <IconPlus {...props} />,
    filled: (props) => <IconPlusFilled {...props} />,
    equal: (props) => <IconPlusEqual {...props} />,
    minus: (props) => <IconPlusMinus {...props} />,
  },
  'outline',
);
