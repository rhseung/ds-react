import { IconBlockquote } from '@tabler/icons-react';

import { createIcon } from '../create-icon';

export const BlockquoteIcon = createIcon(
  'BlockquoteIcon',
  {
    outline: (props) => <IconBlockquote {...props} />,
  },
  'outline',
);
