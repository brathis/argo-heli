import { Flight } from '../flight.interface';

export const saentis: Flight = {
  title: 'Säntis',
  path: '/flights/saentis',
  cost: 140,
  duration: 25,
  hero: {
    foreground: {
      startValue: 20,
      endValue: 37,
      property: 'top',
      imgSrc: '/flights/saentis/foreground.webp',
    },
    text: {
      startValue: 10,
      endValue: 20,
      property: 'top',
    },
    background: {
      startValue: -5,
      endValue: 0,
      property: 'top',
      imgSrc: '/flights/saentis/background.webp',
    },
  },
  synopsis:
    'In ca. 80 Minuten geht es zunächst via Einsiedeln zu den Mythen, dann via ' +
    'Andermatt zum Oberalppass. Dort überfliegen wir den Claridenfirn mit einer ' +
    'atemberaubenden Aussicht auf den Tödi.',
};
