export interface Flight {
  /** Internal identifier of the flight for use in URLs, HTML attributes, etc. */
  id: string;

  /** The name of the flight. */
  title: string;

  /** The flight cost per person, in CHF. */
  cost: number;

  /** The approximate flight duration in minutes. */
  duration: number;

  /** SVG source of the map depicting the flight route. */
  mapSvg: string;

  /** A short textual description of the flight's highlights. */
  synopsis: string;

  /** Optional override for hero text color. */
  textColor?: string;
}

export interface HeroLayerConfig {
  startValue: number;
  endValue: number;
  property: string;
}

export interface HeroImageLayerConfig extends HeroLayerConfig {
  imgSrc: string;
  aspectRatio: number;
}

export interface HeroConfig {
  duration: HeroLayerConfig;
  foreground: HeroImageLayerConfig;
  text: HeroLayerConfig;
  background: HeroImageLayerConfig;
}
