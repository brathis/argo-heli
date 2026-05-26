import { Injectable } from '@angular/core';
import { Review } from '@common/services/reviews/review.interface';
import { allReviews } from '@content/reviews';

@Injectable({ providedIn: 'root' })
export class ReviewsService {
  allReviews: Review[] = allReviews;
}
