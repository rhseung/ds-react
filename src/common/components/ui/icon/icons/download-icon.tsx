import { IconDownload, IconDownloadFilled, IconDownloadOff } from '@tabler/icons-react';

import { createIcon } from '../create-icon';

export const DownloadIcon = createIcon(
  'DownloadIcon',
  {
    outline: (props) => <IconDownload {...props} />,
    filled: (props) => <IconDownloadFilled {...props} />,
    off: (props) => <IconDownloadOff {...props} />,
  },
  'outline',
);
