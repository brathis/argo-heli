import { NgClass } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  input,
  output,
  Signal,
  viewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Flight } from '@common/services/flights/flight.interface';
import { LangService } from '@common/i18n/lang.service';

@Component({
  selector: 'app-flight-selector-item',
  imports: [NgClass, RouterLink, TranslateModule],
  templateUrl: './flight-selector-item.component.html',
  styleUrl: './flight-selector-item.component.scss',
})
export class FlightSelectorItemComponent implements AfterViewInit {
  currentLang = inject(LangService).currentLang;
  flight = input<Flight>();

  // this is set by the parent FlightSelectorComponent
  selected: Signal<boolean> | null = null;

  clicked = output<void>();

  boxRef = viewChild.required<ElementRef>('box');

  ngAfterViewInit(): void {
    this.boxRef().nativeElement.style.setProperty(
      '--background-url',
      `url("flights/${this.flight()?.id}/thumbnail.webp")`,
    );
  }
}
