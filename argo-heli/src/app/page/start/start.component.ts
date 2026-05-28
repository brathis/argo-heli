import { Component, inject } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ConfigService } from '../../core/config.service';
import { HeroStaticComponent } from '../flights/components/hero-static/hero-static.component';
import { OfferingsComponent } from './components/offerings/offerings.component';
import { PortraitComponent } from './components/portrait/portrait.component';
import { ReviewComponent } from './components/review/review.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { ReviewsService } from './reviews.service';

@Component({
  selector: 'app-start',
  imports: [
    OfferingsComponent,
    ReviewsComponent,
    ReviewComponent,
    PortraitComponent,
    HeroStaticComponent,
    TranslateModule,
  ],
  templateUrl: './start.component.html',
})
export class StartComponent {
  config = inject(ConfigService).getConfig();
  translate = inject(TranslateService);
  reviews = inject(ReviewsService).allReviews;
}
