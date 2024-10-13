import { Flight } from '../flight.interface';

export const churfirsten: Flight = {
  title: 'Churfirsten',
  path: '/flights/churfirsten',
  cost: 180,
  duration: 45,
  hero: {
    foreground: {
      startValue: 30,
      endValue: 48,
      property: 'top',
      imgSrc: '/flights/churfirsten/foreground.webp',
    },
    text: {
      startValue: 10,
      endValue: 20,
      property: 'top',
    },
    background: {
      startValue: -40,
      endValue: -35,
      property: 'top',
      imgSrc: '/flights/churfirsten/background.webp',
    },
  },
  synopsis:
    'In ca. 80 Minuten geht es zunächst via Einsiedeln zu den Mythen, dann via ' +
    'Andermatt zum Oberalppass. Dort überfliegen wir den Claridenfirn mit einer ' +
    'atemberaubenden Aussicht auf den Tödi.',
};
