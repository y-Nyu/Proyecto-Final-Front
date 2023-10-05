import { useContext } from "react";
import { CartContext } from "../../contexts/ShoppingCartContext";
import "./Cart.css";
import axios from "axios";


const Cart = () => {
  const [cart, setCart] = useContext(CartContext);

  const clearCart = () => {
    setCart([]);
  };

  const incrementAmount = (productId) => {
    const updatedCart = [...cart];
    updatedCart.forEach((product) => {
        if (product.id === productId) {
            product.quantity += 1;
        }
    });
    setCart(updatedCart);
};

  const decrementAmount = (productId) => {
      const updatedCart = [...cart];
      updatedCart.forEach((product) => {
          if (product.id === productId && product.quantity > 1) {
              product.quantity -= 1;
          }
      });
      setCart(updatedCart)
  };

  const removeItem = (productId) => {
      const updatedCart = cart.filter((product) => product.id !== productId);
      setCart(updatedCart);
  };

  const checkOut = async () => {
    const { data } = await axios.post("https://pf-back-deploy.onrender.com/create-order", cart)

    const mercadoPagoUrl = data.body.init_point;

    window.location.href = mercadoPagoUrl;

    localStorage.clear();
    
    //clearCart();
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
          <button onClick={() => incrementAmount(item.id)}>+</button>
          <button onClick={() => decrementAmount(item.id)}>-</button>
          <button onClick={() => removeItem(item.id)}>Eliminar</button>

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