import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CartContext } from "../../contexts/ShoppingCartContext";
import axios from "axios";
import style from "./Success.module.css";

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
      setCart([])
    }, (5000))
  }, [user]);

  return (
<div className="success-message">
  <h2 className="text-info-emphasis" style={{ textAlign: "center", color: "blue" }}>Tu transacción ha tenido un resultado exitoso!!!</h2>
  <div className={style.centerImage}>
    <img
      src="\src\components\Success\corgi.png"
      alt="corgi feliz"
      style={{ width: "350px", height: "350px" }}
    />
  </div>
  <h4  className="text-info-emphasis" style={{ textAlign: "center" }}>¡Gracias por tu compra! Tú mascota estará muy feliz.</h4>
</div>
  );
};
export default Success;
