import React from 'react';

const StarRating = ({ rating }) => {
  const maxStars = 5; 

  return (
    <div>
      {[...Array(maxStars)].map((_, index) => {
        const starValue = index + 1;
        return (
          <span key={index}
            style={{ color: starValue <= rating ? 'gold' : 'gray' }}
          >
            &#9733;
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;
