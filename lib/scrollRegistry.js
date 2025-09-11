
import LargemouthBassScroll from '../components/Species/LargemouthBassScroll';
import SpinnerbaitScroll from '../components/Gear/SpinnerbaitScroll';
import WindScroll from '../components/Environment/WindScroll';

export const scrolls = {
  species: [
    {
      key: 'largemouth-bass',
      name: 'Largemouth Bass',
      component: LargemouthBassScroll
    }
  ],
  gear: [
    {
      key: 'spinnerbait',
      name: 'Spinnerbait',
      component: SpinnerbaitScroll
    }
  ],
  environment: [
    {
      key: 'wind',
      name: 'Wind',
      component: WindScroll
    }
  ]
};
