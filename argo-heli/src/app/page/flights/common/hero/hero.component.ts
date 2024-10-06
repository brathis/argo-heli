import {
  Component,
  ElementRef,
  HostListener,
  input,
  viewChild,
} from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {
  title = input.required();
  backgroundImgSrc = input.required();
  foregroundImgSrc = input.required();

  backgroundRef = viewChild.required('background');
  textRef = viewChild.required('text');
  foregroundRef = viewChild.required('foreground');

  @HostListener('window:scroll')
  onScroll() {
    this.updateScrollPositions();
  }

  ngOnInit(): void {
    this.updateScrollPositions();
  }

  private updateScrollPositions() {
    const scrollPosition = window.document.scrollingElement?.scrollTop ?? 0;
    const backgroundEl: HTMLImageElement = (
      this.backgroundRef() as ElementRef<HTMLImageElement>
    ).nativeElement;
    const textEl: HTMLDivElement = (
      this.textRef() as ElementRef<HTMLDivElement>
    ).nativeElement;
    const foregroundEl: HTMLImageElement = (
      this.foregroundRef() as ElementRef<HTMLImageElement>
    ).nativeElement;

    const intensity = 0.1;

    const backgroundTop = -10 + scrollPosition * 0.05 * intensity;
    const textTop = 10 + scrollPosition * 0.1 * intensity;
    const foregroundTop = 20 + scrollPosition * 0.2 * intensity;

    backgroundEl.style.top = `${backgroundTop}%`;
    textEl.style.top = `${textTop}%`;
    foregroundEl.style.top = `${foregroundTop}%`;
  }
}
