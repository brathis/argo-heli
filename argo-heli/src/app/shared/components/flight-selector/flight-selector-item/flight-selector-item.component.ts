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
import { Flight } from '../../../../page/flights/flight.interface';
import { LangService } from '../../../../core/i18n/lang.service';

@Component({
  selector: 'app-flight-selector-item',
  imports: [NgClass, RouterLink, TranslateModule],
  templateUrl: './flight-selector-item.component.html',
  styleUrl: './flight-selector-item.component.scss',
  host: {
    class:
      'first:ml-[149px] last:mr-[149px] sm:first:ml-[249px] sm:last:mr-[249px]',
    '[attr.data-flight-id]': 'flight()?.id',
  },
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
