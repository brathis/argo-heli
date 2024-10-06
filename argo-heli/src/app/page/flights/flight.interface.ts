export interface Flight {
  /** The name of the flight. */
  title: string;

  /** The URL path of the flight. */
  path: string;

  /** The flight cost per person, in CHF. */
  cost: number;

  /** The approximate flight duration in minutes. */
  duration: number;

  /** A short textual description of the flight's highlights. */
  synopsis: string;

  /** The config for the hero section at the top of the page. */
  hero: HeroConfig;
}

export interface HeroConfig {
  /** URL/path to the foreground image. */
  foregroundImgSrc: string;

  /** URL/path to the background image. */
  backgroundImgSrc: string;
}
