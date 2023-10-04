import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import style from "./Detail.css";

const Detail = () => {
  const { id } = useParams();
  const [productId, SetproductId] = useState({});
  const [quantity, setQuantity] = useState(1); // Estado para la cantidad

  useEffect(() => {
    axios
      .get(`https://pf-back-deploy.onrender.com/product/${id}`)
      .then(({ data }) => {
        SetproductId(data);
      })
      .catch((error) => {
        alert("Error al obtener los detalles del producto:", error);
      });
  }, [id]);

  // Función para aumentar la cantidad
  const addToCart = () => {
    // Aquí puedes realizar las acciones necesarias para agregar el producto al carrito
    alert(`Se agregaron ${quantity} ${productId.name} al carrito`);
  };

  return (
    <div className="container">
        <div className="row align-items-center">
        <div className="col-md-4">
      <img
        className="product-image img-fluid d-none d-md-block"
        src={productId.image}
        alt={productId.id}
      />
    </div>
    <div className="col-md-8">
      <div className="card">
            <h1 className="product-name">{productId.name}</h1>
            <h3 className="product-brand">{productId.brand}</h3>
            <h3 className="product-category">{productId.category}</h3>
            <h3 className="product-description">{productId.description}</h3>
            <h3 className="product-price">
              <strong>Precio: $ {productId.price}</strong>
            </h3>

            <div className="product-cart">
              <button
                onClick={addToCart}
                className={`btn ${style.btn}`} 
              >
                Agregar al carrito
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                min="1"
                className="ml-2"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;