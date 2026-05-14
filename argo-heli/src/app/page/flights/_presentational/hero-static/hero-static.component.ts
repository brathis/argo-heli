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
  imgSrc = input.required<string>();
  overrideTextColor = input<string>();

  private readonly defaultTextColor = (tailwindConfig.theme?.extend as any)
    .colors['primary'][400];

  textColor = computed(() => {
    const overrideTextColor = this.overrideTextColor();
    return overrideTextColor === null || overrideTextColor === undefined
      ? this.defaultTextColor
      : overrideTextColor;
  });
}
