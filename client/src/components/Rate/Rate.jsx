import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";

const Rate = ({productId, userId}) => {


  const [ratingProps,setRatingProps] = useState({
        count: 5,
        Rating: 0,
        color: {
          filled: "#f5eb3b",
          unfilled: "#DCDCDC",
        },
    })

  const [hoverRating, setHoverRating] = useState(0);
  
  const { count, Rating, color } = ratingProps

  const getColor = (index) => {
    if (hoverRating >= index) {
      return color.filled;
    } else if (!hoverRating && Rating >= index) {
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
          setRatingProps({ ...ratingProps, Rating: i });
          const { Rating } = ratingProps
          axios.post(`https://pf-back-deploy.onrender.com/rate/${productId}`, {userId,Rating})
          .then(usrRes => {
          console.log(usrRes);

        })
      .catch(error => {
        console.log(error.response.data.error);
      })
        }}
        style={{ color: getColor(i) }}
        onMouseEnter={() => setHoverRating(i)}
        onMouseLeave={() => setHoverRating(0)}
      />
    );
  }
  return (
  <div>
    <div>{starRating}</div>
  </div>)
  ;
};


export default Rate;