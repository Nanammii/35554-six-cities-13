import {Reviews} from '../../types/reviews';
import ReviewsItem from '../reviews-item/reviews-item';

type ReviewsListProps = {
  reviews: Reviews;
};

function ReviewsList({reviews}: ReviewsListProps): JSX.Element {
  return (
    <ul className="reviews__list">
      {reviews.map((review) => (
        <ReviewsItem key={review.id} reviewItem={review} />
      ))}
    </ul>
  );
}

export default ReviewsList;
