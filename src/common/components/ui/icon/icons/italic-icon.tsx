import { IconItalic } from '@tabler/icons-react';

import { createIcon } from '../create-icon';

export const ItalicIcon = createIcon(
  'ItalicIcon',
  {
    outline: (props) => <IconItalic {...props} />,
  },
  'outline',
);
