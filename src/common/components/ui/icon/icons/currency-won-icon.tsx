import { IconCurrencyWon } from '@tabler/icons-react';

import { createIcon } from '../create-icon';

export const CurrencyWonIcon = createIcon(
  'CurrencyWonIcon',
  {
    outline: (props) => <IconCurrencyWon {...props} />,
  },
  'outline',
);
