import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Detail.css";
import { CartContext } from "../../context/context-provider";


const Detail = () => {
  const { id } = useParams();
  const [productId, SetproductId] = useState({});
  const [cantidad, setCantidad] = useState(1); // Inicializar la cantidad en 1 por defecto
  const [cart, setCart] = useContext(CartContext); // Obtener el contexto del carrito


  const addToCart = () => {

    // if(){}

    setCart((currItems) => {
      const isItemsFound = currItems.find((item) => item.id === productId.id);
      if (isItemsFound) {
        return currItems.map((item) => {
          if (item.id === productId.id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      } else {
        return [...currItems, { id: productId.id, quantity: 1, price: productId.price, name: productId.name, image: productId.image, brand: productId.brand, category: productId.category, active: productId.active, description: productId.description, stock: productId.stock }];
      }
    });
  };

  const removeItem = (value) => {
    setCart((currItems) => {
      return currItems
        .map((item) => {
          if (item.id === value) {
            if (item.quantity > 0) {
              return { ...item, quantity: item.quantity - 1, name: productId.name, image: productId.image, brand: productId.brand, category: productId.category, active: productId.active, description: productId.description, stock: productId.stock };
            }
          }
          return item;
        })
        .filter((item) => item.quantity > 0);
    });
  };
  
  console.log(`Este es el carrito desde detail${cart}`);




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


    const productoSeleccionado = {
      id: productId.id,
      imagen: productId.image,
      name: productId.name,
      price: productId.price,
      description: productId.description,
      quantity: cantidad, // Agregar la cantidad seleccionada al producto
    };


    // Redirigir al usuario a la página del carrito o a donde desees
    // history.push("/carrito"); // Importar useHistory si es necesario


  return (
    <div className="container">
      <div className="card">
        <h1 className="product-name">{productId.name}</h1>
        <img
          className="product-image"
          src={productId.image}
          alt={productId.id}
        />
        <h3 className="product-brand">{productId.brand}</h3>
        <h3 className="product-category">{productId.category}</h3>
        <h3 className="product-description">{productId.description}</h3>
        <h3 className="product-price">${productId.price}</h3>

          <p>Cantidad</p>

          <button onClick={() => addToCart()}>

            Agregar al Carrito
          </button>
          
          <button onClick={() => removeItem(productId.id)}>
            Remover del Carrito
          </button>

      </div>
    </div>
  );
};

export default Detail;
