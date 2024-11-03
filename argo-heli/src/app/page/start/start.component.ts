import { Component } from '@angular/core';
import { HeroLayerDirective } from '../flights/_presentational/hero/hero-layer.directive';
import { HeroComponent } from '../flights/_presentational/hero/hero.component';
import { OfferingsComponent } from './_presentational/offerings/offerings.component';
import { ReviewsComponent } from './_presentational/reviews/reviews.component';
import { ReviewComponent } from "./_presentational/reviews/review/review.component";

@Component({
  selector: 'app-start',
  standalone: true,
  imports: [
    HeroComponent,
    HeroLayerDirective,
    OfferingsComponent,
    ReviewsComponent,
    ReviewComponent
],
  templateUrl: './start.component.html',
})
export class StartComponent {}
