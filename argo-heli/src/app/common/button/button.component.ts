import { NgClass } from '@angular/common';
import { Component, computed, input, Optional, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonLargeDirective } from './button-large.directive';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [RouterLink, NgClass],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  label = input.required();
  link = input<string>();
  enabled = input<boolean>(true);

  click = output<void>();

  classes;

  constructor(@Optional() buttonLargeDirective: ButtonLargeDirective) {
    this.classes = computed(() => ({
      button: true,
      'button--large': buttonLargeDirective !== null,
      'button--enabled': this.enabled(),
    }));
  }

  onClick() {
    if (this.enabled()) {
      this.click.emit();
    }
  }
}
