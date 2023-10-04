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
      <div className={style["thumb-wrapper"]}>
        <span className={style["wish-icon"]}><i className={style["fa-heart"]}>♡</i></span>
        <div className={style["img-box"]}>
          <img src={image} className={style["img-fluid"]} alt={name}/>
        </div>
        <div className={style["thumb-content"]}>
          <Link to={`/detail/${id}`} className={style["col"]}>
          <h4>{name}</h4>
          </Link>
          <p className={style["item-price"]}>${price}</p>
        </div>
        <button className={style["btn"]} onClick={() => addToCart({id, name, price})}>Agregar al Carrito</button>
      </div>
  )
};

export default Card;