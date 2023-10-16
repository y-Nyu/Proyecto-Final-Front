import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CartContext } from "../../contexts/ShoppingCartContext";
import axios from "axios";

const Success = () => {
  const [cart, setCart] = useContext(CartContext);
  const user = useSelector((state) => state.userLogged);
  console.log("carritooo", cart);
  console.log("userrrr", user.id);
  useEffect(() => {
    if (cart.length > 0 && user.id) {
      axios
        .post("https://pf-back-deploy.onrender.com/sale", {
          iduser: user.id,
          products: [...cart],
        })
        .then((res) => setCart([]));
    }
  }, [cart]);
  return (
    <div className="success-message">
      <h1>Tu compra para tu mascota ha sido generada con éxito</h1>
      <p>¡Gracias por tu compra! Tu mascota estará muy feliz.</p>
    </div>
  );
};
export default Success;
