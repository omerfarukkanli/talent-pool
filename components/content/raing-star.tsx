import { Star, StarHalf } from 'lucide-react';

interface StarRatingProps {
  rating: number;
}

const StarRating = ({ rating }: StarRatingProps) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(
        <Star key={i} className='w-4 h-4 fill-amber-400 text-amber-400' />
      );
    } else if (i === fullStars && hasHalfStar) {
      stars.push(
        <StarHalf key={i} className='w-4 h-4 fill-amber-400 text-amber-400' />
      );
    } else {
      stars.push(<Star key={i} className='w-4 h-4 text-muted-foreground/30' />);
    }
  }

  return <div className='flex'>{stars}</div>;
};

export default StarRating;
