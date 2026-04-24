import { IconSearch, IconSearchFilled, IconSearchOff } from '@tabler/icons-react';

import { createIcon } from '../create-icon';

export const SearchIcon = createIcon(
  'SearchIcon',
  {
    outline: (props) => <IconSearch {...props} />,
    filled: (props) => <IconSearchFilled {...props} />,
    off: (props) => <IconSearchOff {...props} />,
  },
  'outline',
);
