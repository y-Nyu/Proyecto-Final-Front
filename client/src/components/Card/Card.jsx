import React from "react";
import { Link } from "react-router-dom";
import style from "./card.module.css";

const Card = (props) => {
  return (
    <Link to={`/detail/${props.id}`} className={style["col"]}>
      <div className={style["thumb-wrapper"]}>
        <span className={style["wish-icon"]}><i className={style["fa-heart"]}>♡</i></span>
        <div className={style["img-box"]}>
          <img src={props.image} className={style["img-fluid"]} alt={props.name}/>
        </div>
        <div className={style["thumb-content"]}>
          <h4>{props.name}</h4>
          <p className={style["item-price"]}>${props.price}</p>
        </div>
        <button className={style["btn"]}>Agregar al Carrito</button>
      </div>
    </Link>
  );
};

export default Card;