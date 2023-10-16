import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { CartContext } from "../../contexts/ShoppingCartContext";
import style from "./card.module.css";

const successBackgroundClass = "bg-success bg-opacity-75";
const successTextClass = "text-white";
const errorBackgroundClass = "bg-danger bg-opacity-75";
const errorTextClass = "text-white";

const Card = ({
  id,
  image,
  name,
  price,
  brand,
  category,
  description,
  active,
  stock,
}) => {
  const [cart, setCart] = useContext(CartContext);
  const [showToast, setShowToast] = useState(false);
  const [toastPosition, setToastPosition] = useState("");
  const [toastMessage, setToastMessage] = useState(
    "Producto añadido correctamente"
  );
  const [toastClass, setToastClass] = useState("");

  const toggleToast = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const addToCart = (product) => {
    setCart((currItems) => {
      const isItemFound = currItems.find((item) => item.id === id);

      // Validar el stock antes de agregar
      if (isItemFound && isItemFound.quantity + 1 > stock) {
        setToastMessage(
          <span>
            <i className="bi bi-exclamation-triangle-fill"></i> Producto sin
            stock
          </span>
        );
        setToastClass(`${errorBackgroundClass} ${errorTextClass}`);
        return currItems;
      }

      if (isItemFound) {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      } else {
        setToastMessage(
          <span>
            <i className="bi bi-check-circle"></i> Producto añadido
            correctamente
          </span>
        );
        setToastClass(`${successBackgroundClass} ${successTextClass}`); 

        return [
          ...currItems,
          {
            id,
            quantity: 1,
            price,
            name,
            image,
            brand,
            category,
            description,
            active,
            stock,
          },
        ];
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
            return {
              ...item,
              quantity: item.quantity - 1,
              name,
              price,
              image,
              brand,
              category,
              description,
              active,
              stock,
            };
          } else {
            return item;
          }
        });
      }
    });
  };

  return (
    <div className={`col-lg-4 col-md-6 col-12 justify-content-center ${style.customCardContainer}`}>
      <div className={`card ${style.customCard}`}>
        <img
          src={image}
          className={`card-img-top ${style.cardImage}`}
          alt={name}
        />
        <div className={`card-body ${style.customCardBody}`}>
          <div className={`text-center mb-3 ${style.nameAndPrice}`}>
            <h5 className={`card-title ${style.customCardTitle}`}>{name}</h5>
            <p className={`card-text ${style.customCardText}`}>
              <strong> Precio: $ {price}</strong>
            </p>
          </div>
          <div className={`text-center ${style.centeredButton}`}>
            <Link to={`/detalleProducto/${id}`}>
              <button className={`btn ${style.cardButton}`}>
                <ins>Más info</ins>
              </button>
            </Link>
          </div>

          <button
            className="btn btn-outline-primary"
            onClick={() => {
              addToCart();
              toggleToast();
            }}
          >
            <i className="bi bi-cart3"></i> COMPRAR
          </button>

          {showToast && (
            <div
              className={`toast show ${toastPosition} ${toastClass} border border-primary-subtle rounded-3`}
              role="alert"
              aria-live="assertive"
              aria-atomic="true"
            >
              <div className="toast-body">{toastMessage}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
