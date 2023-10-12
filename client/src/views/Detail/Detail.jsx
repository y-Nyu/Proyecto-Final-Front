import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import style from "./Detail.module.css";
import { CartContext } from "../../contexts/ShoppingCartContext";
import { Modal } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';



const Detail = () => {
  const { id } = useParams();
  const [productId, SetproductId] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useContext(CartContext);
  const [visible, setVisible] = useState(false);


  // Estados para mostrar los toasts
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showOutOfStockToast, setShowOutOfStockToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastClass, setToastClass] = useState("");
  // Estados para mostrar los modal
  const [productToDelete, setProductToDelete] = useState(null);
  // const [confirmDelete, setConfirmDelete] = useState(false);

  const showSuccessMessage = () => {
    setToastMessage(
      <span>
        <i className="bi bi-check-circle"></i> Producto añadido correctamente
      </span>
    );
    setToastClass("toast-success");
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 3000);
  };

  const showOutOfStockMessage = () => {
    setToastMessage(
      <span>
        <i className="bi bi-exclamation-triangle-fill"></i> Producto sin stock
      </span>
    );
    setToastClass("toast-error");
    setShowOutOfStockToast(true);
    setTimeout(() => setShowOutOfStockToast(false), 3000);
  };

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

  const addToCart = () => {
    setCart((currItems) => {
      const isItemFound = currItems.find((item) => item.id === productId.id);

      // Validar el stock antes de agregar
      if (isItemFound && isItemFound.quantity + 1 > productId.stock) {
        showOutOfStockMessage();
        return currItems;
      }

      if (isItemFound) {
        return currItems.map((item) => {
          if (item.id === productId.id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      } else {
        showSuccessMessage();
        return [
          ...currItems,
          {
            id: productId.id,
            quantity: 1,
            price: productId.price,
            name: productId.name,
            image: productId.image,
            brand: productId.brand,
            category: productId.category,
            active: productId.active,
            description: productId.description,
            stock: productId.stock,
          },
        ];
      }
    });
  };

  const removeItem = (product) => {
    setProductToDelete(product);
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false); 
    confirmDeleteItem();
  };
  
  const handleCancel = () => {
    setVisible(false); 
  };
  
  

  const confirmDeleteItem = () => {
    if (productToDelete) {
      setCart((currItems) => {
        return currItems
          .map((item) => {
            if (item.id === productToDelete.id) {
              if (item.quantity > 0) {
                return {
                  ...item,
                  quantity: item.quantity - 1,
                };
              }
            }
            return item;
          })
          .filter((item) => item.quantity > 0);
      });
    }
  }
  

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
          <div className={`cardDetail ${style.detailC}`}>
            <h1 className={`product-name ${style.nameD}`}>
              <strong>{productId.name}</strong>
            </h1>
            <h3 className={`product-brand ${style.brand}`}>
              {productId.brand}
            </h3>
            <h3 className={`product-category ${style.category}`}>
              {productId.category}
            </h3>
            <h3 className={`product-description ${style.description}`}>
              {productId.description}
            </h3>
            <h3 className={`product-price ${style.price}`}>
              <strong>Precio: $ {productId.price}</strong>
            </h3>

            <div className="product-cart">
              <button
                onClick={() => {
                  addToCart();
                }}
                className={`btn ${style.btn}`}
              >
                Agregar al carrito
              </button>
              <button
                id="btn1" 
                className={`btn ${style.btn}`}
                onClick={() => removeItem(productId)}
              >
                Remover del Carrito
              </button>
              <div className="toast-container">
              {showSuccessToast && (
                <div
                  className={`toast show toast-success-detail bg-success bg-opacity-75 text-white `}
                  role="alert"
                >
                  <div className="toast-body">{toastMessage}</div>
                </div>
              )}

              {showOutOfStockToast && (
                <div
                  className={`toast show toast-error-detail bg-danger bg-opacity-75 text-white`}
                  role="alert"
                >
                  <div className="toast-body">{toastMessage}</div>
                </div>
              )}
               </div>
                  <Modal
      title="¿Estás seguro?"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <p>
        Se eliminará el producto{" "}
        <strong>{productToDelete ? productToDelete.name : 'Producto'}</strong> de tu carro de compras
      </p>
    </Modal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;