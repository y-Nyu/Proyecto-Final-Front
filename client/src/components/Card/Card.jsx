import { Link } from "react-router-dom";
import style from "./Card.module.css";
import { useContext, useEffect } from "react";
import { CartContext } from "../../contexts/ShoppingCartContext";


const Card = ({ id, image, name, price}) => {

  const [cart, setCart] = useContext(CartContext);

  
  
  const addToCart = (product) => {
    const existingProduct = cart.find((element) => element.id === product.id);
    
    if (existingProduct) {
      setCart(cart.map((element) => 
      element.id === product.id
      ? { ...element, quantity: element.quantity + 1}
      : element
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    };

    
    console.log(cart, 'el cart');
  };

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
        <button className={style["btn"]} onClick={() => addToCart({id, name, price})}>Agregar al Carrito</button>
      </div>
    </div>
  );
};

export default Card;


