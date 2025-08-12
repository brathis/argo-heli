import { Component, inject } from '@angular/core';
import { ConfigService } from '../../common/config.service';
import { HeroStaticComponent } from '../flights/_presentational/hero-static/hero-static.component';
import { OfferingsComponent } from './_presentational/offerings/offerings.component';
import { PortraitComponent } from './_presentational/portrait/portrait.component';
import { ReviewComponent } from './_presentational/reviews/review/review.component';
import { ReviewsComponent } from './_presentational/reviews/reviews.component';

@Component({
  selector: 'app-start',
  standalone: true,
  imports: [
    OfferingsComponent,
    ReviewsComponent,
    ReviewComponent,
    PortraitComponent,
    HeroStaticComponent,
  ],
  templateUrl: './start.component.html',
})
export class StartComponent {
  config = inject(ConfigService).getConfig();
}
