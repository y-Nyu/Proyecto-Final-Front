import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CartContext } from "../../contexts/ShoppingCartContext";
import axios from "axios";
import style from "./Success.module.css";
import corgi from "../../assets/img/corgi.png";
import { useLocation, useParams } from "react-router-dom";

const Success = () => {
  const [cart, setCart] = useContext(CartContext);
  const user = useSelector((state) => state.userLogged);
  const location = useLocation();

  const params = new URLSearchParams(location.search);

  const status = params.get("status");

  useEffect(() => {
    if (status == "approved" && cart.length > 0 && user.id) {
      axios
        .post("https://pf-back-deploy.onrender.com/sale", {
          iduser: user.id,
          products: [...cart],
        })
        .then((res) => setCart([]));
    }
  }, [cart, user]);

  return (
    <div className="success-message">
      <h2
        className="text-info-emphasis"
        style={{ textAlign: "center", color: "blue" }}
      >
        Tu transacción ha tenido un resultado exitoso!!!
      </h2>
      <div className={style.centerImage}>
        <img
          src={corgi}
          alt="corgi feliz"
          style={{ width: "350px", height: "350px" }}
        />
      </div>
      <h4 className="text-info-emphasis" style={{ textAlign: "center" }}>
        ¡Gracias por tu compra! Tú mascota estará muy feliz.
      </h4>
    </div>
  );
};
export default Success;
