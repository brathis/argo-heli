import { Component, input } from '@angular/core';

@Component({
  selector: 'app-basic-page',
  standalone: true,
  imports: [],
  templateUrl: './basic-page.component.html',
})
export class BasicPageComponent {
  title = input.required();
}
