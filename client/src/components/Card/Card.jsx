import React from "react";
import { Link } from "react-router-dom";
import style from "./card.module.css";

const Card = ({ id, image, name, price }) => {
  return (
    <div className={`card ${style.customCard} mx-auto`} style={{ width: "18rem" }}>
      <i className={`bi bi-balloon-heart ${style.heart}`}></i>
      <img src={image} className={`card-img-top ${style.cardImage}`} alt={name} />
      <div className={`card-body ${style.customCardBody}`}>
        <div className={`text-center mb-3 ${style.nameAndPrice}`}>
          <h5 className={`card-title ${style.customCardTitle}`}>{name}</h5>
          <p className={`card-text ${style.customCardText}`}> <strong> Precio: $ {price}</strong></p>
        </div>
        <div className={`text-center ${style.centeredButton}`}>
          <Link to={`/detail/${id}`}>
            <button className={`btn ${style.cardButton}`}>
              <ins>Más info</ins>
              
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;


