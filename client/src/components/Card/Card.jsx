import { Link } from "react-router-dom";
import style from "./Card.module.css";


const Card = ({ id, image, name, price}) => {
  return (
    <Link to={`/detail/${id}`} className={style["col"]}>
      <div className={style["thumb-wrapper"]}>
        <span className={style["wish-icon"]}><i className={style["fa-heart"]}>♡</i></span>
        <div className={style["img-box"]}>
          <img src={image} className={style["img-fluid"]} alt={name}/>
        </div>
        <div className={style["thumb-content"]}>
          <h4>{name}</h4>
          <p className={style["item-price"]}>${price}</p>
        </div>
        <button className={style["btn"]}>Agregar al Carrito</button>
      </div>
    </Link>
  )
};

export default Card;