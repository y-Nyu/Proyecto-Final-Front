import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../contexts/ShoppingCartContext";
import style from "./Cart.module.css";
import axios from "axios";


const Cart = () => {
  const [cart, setCart] = useContext(CartContext);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // Calcular el precio total de todos los productos en el carrito
    const newTotalPrice = cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    setTotalPrice(newTotalPrice); // Actualizar el estado
  }, [cart]);
  
  const checkOut = async () => {
    const response = await axios.post(
      "https://pf-back-deploy.onrender.com/create-order",
      cart
    );
    const initPoint = await response.data.body.init_point;
    window.location.href = initPoint;
  };


  return (
    <main className={style.contenedor}>
  <div className="carrito">
    {cart.map((item) => (
      <div className={style.contenedor} key={item.id}>
        <img src={item.image} alt={item.name} className={style.producto_imagen} />
        <div className={style.producto_detalle}>
          <h2 className={style.producto_nombre}>{item.name}</h2>
          <p className={style.producto_precio}>Precio c/u: ${item.price}</p>
          <p className="producto-cantidad">Cantidad: {item.quantity}</p>
          <p className="producto-total">Total: ${item.price * item.quantity}</p>
        </div>
      </div>
    ))}
  </div>

        <button className="btn-pagar" onClick={checkOut}>Pagar Total</button>


</main>

  );
};

export default Cart;