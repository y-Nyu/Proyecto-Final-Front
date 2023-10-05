import { Link } from "react-router-dom";
import style from "./Card.module.css";
import { CartContext } from "../../context/context-provider";
import { useContext } from "react";

const Card = ({ id, image, name, price, brand, category, description, active, stock }) => {
  const [cart, setCart] = useContext(CartContext);

   const addToCart = () => {
    setCart((currItems) => {
      const isItemsFound = currItems.find((item) => item.id === id);
      if (isItemsFound) {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      } else {
        return [...currItems, { id, quantity: 1, price, name, image, brand, category, description, active, stock }];
      }
    });
  };

  const removeItem = (id) => {
    setCart((currItems) => {
      if (currItems.find((item) => item.id === id)?.quantity === 1) {
        return currItems.filter((item) => item.id !== id);
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1, name, price, image, brand, category, description, active, stock };
          } else {
            return item;
          }
        });
      }
    });
  };

  console.log(cart);

  return (
    <div className={style["thumb-wrapper"]}>
      <span className={style["wish-icon"]}>
        <i className={style["fa-heart"]}>♡</i>
      </span>
        <Link to={`/detail/${id}`} className={style["col"]}>
      <div className={style["img-box"]}>
        <img src={image} className={style["img-fluid"]} alt={name} />
      </div>
      <div className={style["thumb-content"]}>
          <h4>{name}</h4>
        <p className={style["item-price"]}>${price}</p>
      </div>
        </Link>
      <button onClick={addToCart} className={style["btn"]}>
        Agregar al Carrito
      </button>
      <button onClick={() => removeItem(id)} className={style["btn"]}>
        Remover del Carrito
      </button>
    </div>
  );
};

export default Card;
