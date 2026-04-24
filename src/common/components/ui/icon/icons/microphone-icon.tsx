import {
  IconMicrophone,
  IconMicrophone2,
  IconMicrophone2Off,
  IconMicrophoneFilled,
  IconMicrophoneOff,
} from '@tabler/icons-react';

import { createIcon } from '../create-icon';

export const MicrophoneIcon = createIcon(
  'MicrophoneIcon',
  {
    outline: (props) => <IconMicrophone {...props} />,
    filled: (props) => <IconMicrophoneFilled {...props} />,
    off: (props) => <IconMicrophoneOff {...props} />,
    alt: (props) => <IconMicrophone2 {...props} />,
    altOff: (props) => <IconMicrophone2Off {...props} />,
  },
  'outline',
);
