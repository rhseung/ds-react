import {
  IconStar,
  IconStarFilled,
  IconStarHalf,
  IconStarHalfFilled,
  IconStarOff,
  IconStars,
  IconStarsFilled,
  IconStarsOff,
} from '@tabler/icons-react';

import { createIcon } from '../create-icon';

export const StarIcon = createIcon(
  'StarIcon',
  {
    outline: (props) => <IconStar {...props} />,
    filled: (props) => <IconStarFilled {...props} />,
    half: (props) => <IconStarHalf {...props} />,
    halfFilled: (props) => <IconStarHalfFilled {...props} />,
    off: (props) => <IconStarOff {...props} />,
    stars: (props) => <IconStars {...props} />,
    starsFilled: (props) => <IconStarsFilled {...props} />,
    starsOff: (props) => <IconStarsOff {...props} />,
  },
  'outline',
);
