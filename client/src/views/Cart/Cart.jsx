import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../contexts/ShoppingCartContext";
import style from "./Cart.module.css";
import axios from "axios";
import { PoweroffOutlined } from "@ant-design/icons";
import { Button } from "antd";
import carritoVacio from "../../assets/Carritovacio3.png";

const Cart = ({ isVisible, onClose }) => {
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

  useEffect(() => {
    if (isVisible) {
      document.body.classList.add("overlay");
    } else {
      document.body.classList.remove("overlay");
    }
  }, [isVisible]);

  const incrementAmount = (productId) => {
    const updatedCart = [...cart];
    updatedCart.forEach((product) => {
      if (product.id === productId && product.quantity < product.stock) {
        product.quantity += 1;
      } else if (
        product.id === productId &&
        product.quantity === product.stock
      ) {
        window.alert("No hay suficiente stock");
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
    setCart(updatedCart);
  };

  const removeItem = (productId) => {
    const updatedCart = cart.filter((product) => product.id !== productId);
    setCart(updatedCart);
  };

  const checkOut = async () => {
    const token = sessionStorage.getItem("jwt_session");
    if (token) {
      const { data } = await axios.post(
        "https://pf-back-deploy.onrender.com/create-order",
        cart
      );
      const initPoint = await data.body.init_point;

      window.location.href = initPoint;
    } else {
      alert("Debe ingresar o registrarse");
      navigate("/loginRegister");
    }
  };

  return (
    <div className={isVisible ? style.overlay : ""}>
      <div className={style.contenedor} style={{ width: "500px" }}>
        <h2 style={{ textAlign: "center", margin: "0" }}>
          <strong>Mi Carrito</strong>
          <Button
            style={{ margin: "20px" }}
            type="primary"
            icon={<PoweroffOutlined />}
            onClick={onClose}
          />
        </h2>
        <div
          className="carrito"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {cart.length === 0 ? (
            <div className={style.carritoVacio}>
              <h2
                className="text-info-emphasis"
                style={{ textAlign: "center", margin: 0 }}
              >
                Oops, tu carrito está vacío...
              </h2>
              <img
                className={style.cart_empty}
                src={carritoVacio}
                alt="carrito vacío"
                style={{ width: "300px", height: "300px", margin: "20px" }}
              />
            </div>
          ) : (
            <div
              className={style.productoGrid}
              style={{ maxHeight: "430px", overflowY: "auto" }}
            >
              {cart.map((item, index) => (
                <div className={style.producto} key={item.id}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className={style.producto_imagen}
                  />
                  <div className={style.producto_detalle}>
                    <h2 className={style.producto_nombre}>{item.name}</h2>
                    <p className={style.producto_precio}>
                    <italic> $ </italic>{item.price} / unidad
                    </p>
                    <p className="producto-cantidad">
                    <italic>Cantidad:</italic> {item.quantity}
                    </p>
                    <Button onClick={() => decrementAmount(item.id)} style={{ margin: "10px" }}>-</Button>
                    <span>{item.quantity}</span>
                    <Button onClick={() => incrementAmount(item.id)} style={{ margin: "10px" }}>+</Button>
                    <Button onClick={() => removeItem(item.id)} danger style={{ margin: "20px" }}>
                      Eliminar
                    </Button>
                    <p className="producto-total">
                      Subtotal: ${item.price * item.quantity}
                    </p>
                    {index < cart.length - 1 && <hr style={{ width: "80%", margin: "10px auto", borderColor: "gray" }} />}
                  </div>
                </div>
              ))}
            </div>
          )}
          {cart.length > 0 && (
            <div style={{ display: "flex", alignItems: "center" }} >
              <h4><strong>Total ${totalPrice}</strong></h4>
              <Button style={{ margin: "20px", backgroundColor: "#33ffcc" }} type="dashed" size="large" className="btnPagar" onClick={checkOut} block>
                <strong>FINALIZAR COMPRA</strong>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
          
  );
};

export default Cart;