import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CartContext } from "../../contexts/ShoppingCartContext";
import axios from "axios";

const Success = () => {
  const [cart, setCart] = useContext(CartContext);
  const user = useSelector((state) => state.userLogged[0]);

  useEffect(() => {
    cart.map(async (item) => {
      let itemSale = {
        iduser: user.id,
        idproduct: item.id,
        quantity: item.quantity,
      };
      await axios.post("https://pf-back-deploy.onrender.com/sale", itemSale);
    });

    setTimeout(() => {
      setCart([]);
    }, (5000));
    
  }, [user]);

  return (
    <div className="success-message">
      <h1>Tu compra para tu mascota ha sido generada con éxito</h1>
      <p>¡Gracias por tu compra! Tu mascota estará muy feliz.</p>
    </div>
  );
};
export default Success;
