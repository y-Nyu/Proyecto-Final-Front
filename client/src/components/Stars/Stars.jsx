import { useState } from "react";
import style from "./Stars.module.css"
import { FaStar } from 'react-icons/fa'

const Stars = () => {
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);
  return (
    <div>
        {[...Array(5)].map((star, index) => {
            const currentRating = index + 1
            return (
                <label key={index}>
                    <input
                    type="radio" 
                    name="rating" 
                    value={currentRating}
                    onClick={() => setRating(currentRating)}
                    />
                    <FaStar
                    className={style.star}
                    color={currentRating <= (hover ||  rating) ? "#ffc107" : "#e4e5e9"}
                    onMouseEnter={() => setHover(currentRating)}
                    onMouseLeave={() => setHover(null)}
                    ></FaStar>
                </label>
            )
        })}
    </div>
  )
}

export default Stars;