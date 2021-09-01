import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

const buttonsFooter = [
  { to: '/bebidas',
    src: drinkIcon,
    alt: 'Footer Drink Icon',
    id: 'drinks-bottom-btn',
  },
  { to: '/explorar',
    src: exploreIcon,
    alt: 'Footer Explorer Icon',
    id: 'explore-bottom-btn',
  },
  { to: '/comidas',
    src: mealIcon,
    alt: 'Footer Meal Icon',
    id: 'food-bottom-btn',
  },
];

export default buttonsFooter;
