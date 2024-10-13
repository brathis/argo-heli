import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appHeroLayer]',
  standalone: true,
})
export class HeroLayerDirective {
  @Input()
  appHeroLayer: string = '';

  @Input()
  startValue: number = 0;

  @Input()
  endValue: number = 0;

  @Input()
  property: string = '';

  constructor(public readonly el: ElementRef) {
    this.el.nativeElement.style.width = '100%';
    this.el.nativeElement.style.position = 'absolute';
  }
}
