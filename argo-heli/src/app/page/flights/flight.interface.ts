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

  /** The config for the highlights section at the bottom of the page. */
  highlights?: HighlightsConfig;
}

// TODO: needed?
export enum HeroLayerType {
  IMAGE,
  TEXT,
}

export interface HeroLayerConfig {
  startValue: number;
  endValue: number;
  property: string;
}

export interface HeroImageLayerConfig extends HeroLayerConfig {
  imgSrc: string;
}

export interface HeroConfig {
  foreground: HeroImageLayerConfig;
  text: HeroLayerConfig;
  background: HeroImageLayerConfig;
}

export interface HighlightsConfig {
  /** The individual highlights along the route. */
  highlights: HighlightConfig[];

  /** The map's raw SVG data. */
  mapSvg: string;
}

export interface HighlightConfig {
  /** Title of the highlight. */
  title: string;

  /** Short description of the highlight. */
  description: string;

  /** URL/path to the highlight photo. */
  imgSrc: string;

  /** Position along the flight path in range [0, 1]. */
  pathPosition: number;

  /** X-component in SVG coordinates of the highlight label's position. */
  legendX: number;

  /** Y-component in SVG coordinates of the highlight label's position. */
  legendY: number;
}
