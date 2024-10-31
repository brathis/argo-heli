import {
  Component,
  contentChildren,
  effect,
  ElementRef,
  HostListener,
  input,
  viewChild,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HeroLayerDirective } from './hero-layer.directive';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './hero.component.html',
})
export class HeroComponent {
  container = viewChild.required<ElementRef>('container');
  id = input.required();
  layers = contentChildren(HeroLayerDirective);

  constructor() {
    // TODO: This is a disgusting hack to get Angular to update the animation when a new flight is loaded.
    //       Unfortunately, "layers" itself does not change when new children are projected into the component,
    //       which is why we have to rely on a different signal.
    effect(() => {
      const _ = this.id();
      this.updateAnimation();
    });
  }

  @HostListener('window:scroll')
  onScroll() {
    this.updateAnimation();
  }

  private getAnimationProgress(): number {
    const rect = this.container().nativeElement.getBoundingClientRect();
    const scrollDistance = window.visualViewport?.height + rect.height;
    return Math.max(
      0,
      Math.min(1, 1 - (rect.top + rect.height) / scrollDistance),
    );
  }

  private updateAnimation() {
    for (const layer of this.layers()) {
      const el = layer.el.nativeElement as HTMLElement;
      const value =
        layer.startValue() +
        this.getAnimationProgress() * (layer.endValue() - layer.startValue());
      el.style.setProperty(layer.property(), `${value}%`);
    }
  }
}
