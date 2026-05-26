export interface Review {
  /** Short title summarizing the review, no more than about 5 words. Should fit on a single line. **/
  title: string;

  /** The main review text. Typically, no more than a single paragraph **/
  text: string;

  /** The name of the person or persons who authored the review. **/
  name: string;

  /** Path to the image shown alongside the review. **/
  imgSrc: string;
}
