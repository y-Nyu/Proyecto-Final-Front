import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";


const Rate = () => {
    const [ratingProps,setRatingProps] = useState({
        count: 5,
        rating: 0,
        color: {
          filled: "#f5eb3b",
          unfilled: "#DCDCDC",
        }
    })

  const [hoverRating, setHoverRating] = useState(0);
  
  const { count, rating, color } = ratingProps

  const getColor = (index) => {
    if (hoverRating >= index) {
      return color.filled;
    } else if (!hoverRating && rating >= index) {
      return color.filled;
    }
    return color.unfilled;
  };

  const starRating = [];
  for (let i = 1; i <= count; i++) {
    starRating.push(
      <i
        key={i}
        className="bi bi-star cursor-pointer"
        onClick={() => {
          setRatingProps({ ...ratingProps, rating: i });
        }}
        style={{ color: getColor(i) }}
        onMouseEnter={() => setHoverRating(i)}
        onMouseLeave={() => setHoverRating(0)}
      />
    );
  }

  return (
  <div>
    <div> Rating: {rating}</div>
    <div>{starRating}</div>
    
  </div>)
  ;
};


export default Rate;