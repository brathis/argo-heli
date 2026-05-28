import { NgClass } from '@angular/common';
import { Component, computed, inject, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonLargeDirective } from './button-large.directive';

@Component({
  selector: 'app-button',
  imports: [RouterLink, NgClass],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  label = input.required();
  link = input<string>();
  queryParams = input<Record<string, string>>();
  enabled = input<boolean>(true);

  clicked = output<void>();

  private _buttonLargeDirective = inject(ButtonLargeDirective, {
    optional: true,
  });

  classes = computed(() => ({
    button: true,
    'button--large': this._buttonLargeDirective !== null,
    'button--enabled': this.enabled(),
  }));

  onClick() {
    if (this.enabled()) {
      this.clicked.emit();
    }
  }
}
