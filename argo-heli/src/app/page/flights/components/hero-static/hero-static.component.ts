import { NgStyle } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import tailwindConfig from '../../../../../../tailwind.config.js';

@Component({
  selector: 'app-hero-static',
  imports: [NgStyle],
  templateUrl: './hero-static.component.html',
})
export class HeroStaticComponent {
  title = input.required<string>();
  duration = input<number>();
  maxPassengers = input<number>();
  imgSrc = input.required<string>();
  overrideTextColor = input<string>();

  private readonly defaultTextColor =
    // @ts-expect-error TailwindCSS typing is a bit messy, which is why it does not detect that 'primary' is in fact present.
    tailwindConfig.theme?.extend?.colors?.['primary'][400];

  textColor = computed(() => {
    const overrideTextColor = this.overrideTextColor();
    return overrideTextColor === null || overrideTextColor === undefined
      ? this.defaultTextColor
      : overrideTextColor;
  });
}
