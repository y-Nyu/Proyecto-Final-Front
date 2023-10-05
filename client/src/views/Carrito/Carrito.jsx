import { useContext } from "react";
import { CartContext } from "../../context/context-provider";
import "./Carrito.css";
import axios from "axios";


const Carrito = () => {
  const [cart, setCart] = useContext(CartContext);

  const checkOut = async () => {
    const response = await axios.post("https://pf-back-deploy.onrender.com/create-order", cart)
    const initPoint = await response.data.body.init_point;
    window.location.href = initPoint;
  }


  return (
    <main className="contenedor">
  <div className="carrito">
    {cart.map((item) => (
      <div className="item" key={item.id}>
        <img src={item.image} alt={item.name} className="producto-imagen" />
        <div className="producto-detalle">
          <h2 className="producto-nombre">{item.name}</h2>
          <p className="producto-precio">Precio c/u: ${item.price}</p>
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

export default Carrito;
