import { Directive, ElementRef, inject, input } from '@angular/core';

@Directive({
  selector: '[appHeroLayer]',
  standalone: true,
})
export class HeroLayerDirective {
  appHeroLayer = input('');
  startValue = input(0);
  endValue = input(0);
  property = input('');

  el = inject(ElementRef);
}
