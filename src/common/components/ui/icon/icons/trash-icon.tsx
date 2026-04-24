import { IconTrash, IconTrashFilled, IconTrashOff, IconTrashX, IconTrashXFilled } from '@tabler/icons-react';

import { createIcon } from '../create-icon';

export const TrashIcon = createIcon(
  'TrashIcon',
  {
    outline: (props) => <IconTrash {...props} />,
    filled: (props) => <IconTrashFilled {...props} />,
    off: (props) => <IconTrashOff {...props} />,
    x: (props) => <IconTrashX {...props} />,
    xFilled: (props) => <IconTrashXFilled {...props} />,
  },
  'outline',
);
