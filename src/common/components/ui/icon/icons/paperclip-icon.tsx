import { IconPaperclip } from '@tabler/icons-react';

import { createIcon } from '../create-icon';

export const PaperclipIcon = createIcon(
  'PaperclipIcon',
  {
    outline: (props) => <IconPaperclip {...props} />,
  },
  'outline',
);
