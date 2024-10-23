import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    const targetDate = new Date('2024-11-01T00:00:00+01:00');
    const elDays = document.querySelector('#days-dynamic');
    const elMessage = document.querySelector('.message') as HTMLElement;
    if (!elDays || !elMessage) {
      return;
    }
    const remainingMilliseconds = targetDate.valueOf() - new Date().valueOf();
    const remainingDays = Math.floor(remainingMilliseconds / 1000 / 3600 / 24);
    elDays.innerHTML = remainingDays.toString();
    elMessage.style.display = 'block';
  }
}
