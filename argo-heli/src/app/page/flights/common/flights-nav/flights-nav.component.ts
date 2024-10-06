import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-flights-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './flights-nav.component.html',
  styleUrl: './flights-nav.component.scss',
})
export class FlightsNavComponent {}
