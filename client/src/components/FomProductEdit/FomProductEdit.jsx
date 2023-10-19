import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ValidateProduct } from "../../Validate/Validate";
import {
  getAllProductsAdmin,
  getCategories,
} from "../../redux/Actions/Products/productsActions";
import axios from "axios";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import style from "./FormProductEdit.module.css";

const FormProductEdit = ({ productEdit, closeModal }) => {
  const dispatch = useDispatch();
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const categories = useSelector((state) => state.categories);

  useEffect(() => {
    if (productEdit) {
      setData(productEdit);
    }
  }, [productEdit]);

  const [data, setData] = useState({
    name: "",
    image: "",
    brand: "",
    category: "",
    description: "",
    price: "",
    stock: "",
    id: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    image: "",
    brand: "",
    category: "",
    description: "",
    price: "",
    stock: "",
  });

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "pf-image");

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/ddygbuhvi/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    if (response.ok) {
      const imageUrl = await response.json();

      setData({ ...data, image: imageUrl.url });
    } else {
      console.error("Error al cargar la imagen a Cloudinary");
    }
    isFormValid();
  };

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(data);
    axios
      .put(`https://pf-back-deploy.onrender.com/product/${data.id}`, data)
      .then((res) => {
        alert("Producto actualizado exitosamente!");
        dispatch(getAllProductsAdmin());
        closeModal();
      })

      .catch((error) => alert(error));
  };

  const handleChange = (event) => {
    let { name, value } = event.target;
    if (
      name === "name" ||
      name === "image" ||
      name === "brand" ||
      name === "category" ||
      name === "description"
    ) {
      setData({
        ...data,
        [name]: value,
      });
    } else if (name === "price" || name === "stock") {
      if (!isNaN(value) && value != "") {
        value = parseFloat(value);
      }
      setData({
        ...data,
        [name]: value,
      });
    }
  };

  // La función isFormValid verifica si no hay mensajes de error en el estado `errors`.
  const isFormValid = () => {
    setIsValid(Object.values(errors).every((error) => error === ""));
  };

  return (
    <div className="container">
      <div className="col">
        <h2 className="fw-bold text-center pt-4">Editar producto</h2>
        <form onSubmit={submitHandler}>
          <div className="mb-4 pt-4">
            <label htmlFor="name" className="form-label">
              <strong>Nombre producto</strong>
            </label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              className="form-control"
              value={data.name}
            />
            <div className="error-container">
              {errors.name ? (
                <p className={style["error-text"]}>{errors.name}</p>
              ) : (
                <p className={style["error-text"]}></p>
              )}
            </div>
          </div>

          <div className="mb-4 pt-4">
            <label htmlFor="brand" className="form-label">
              <strong>Marca</strong>
            </label>
            <input
              type="text"
              name="brand"
              onChange={handleChange}
              className="form-control"
              value={data.brand}
            />
            <div className="error-container">
              {errors.brand ? (
                <p className={style["error-text"]}>{errors.brand}</p>
              ) : (
                <p className={style["error-text"]}></p>
              )}
            </div>
          </div>

          <div className="mb-4 pt-4">
            <label htmlFor="category" className="form-label">
              <strong>Categoría</strong>
            </label>

            <select
              name="category"
              onChange={handleChange}
              className="form-control"
            >
              <option value="">Seleccione</option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {" "}
                  {category.name}{" "}
                </option>
              ))}
            </select>
            <div className="error-container">
              {errors.category ? (
                <p className={style["error-text"]}>{errors.category}</p>
              ) : (
                <p className={style["error-text"]}></p>
              )}
            </div>
          </div>

          <div className="mb-4 pt-4">
            <label htmlFor="description" className="form-label">
              <strong>Descripción</strong>
            </label>
            <input
              type="text"
              name="description"
              onChange={handleChange}
              className="form-control"
              value={data.description}
            />
            <div className="error-container">
              {errors.description ? (
                <p className={style["error-text"]}>{errors.description}</p>
              ) : (
                <p className={style["error-text"]}></p>
              )}
            </div>
          </div>

          <div className="mb-4 pt-4">
            <label htmlFor="price" className="form-label">
              <strong>Precio</strong>
            </label>
            <input
              type="text"
              name="price"
              onChange={handleChange}
              className="form-control"
              value={data.price}
            />
            <div className="error-container">
              {errors.price ? (
                <p className={style["error-text"]}>{errors.price}</p>
              ) : (
                <p className={style["error-text"]}></p>
              )}
            </div>
          </div>

          <div className="mb-4 pt-4">
            <label htmlFor="stock" className="form-label">
              <strong>Stock / Inventario</strong>
            </label>
            <input
              type="text"
              name="stock"
              onChange={handleChange}
              className="form-control"
              value={data.stock}
            />
            <div className="error-container">
              {errors.stock ? (
                <p className={style["error-text"]}>{errors.stock}</p>
              ) : (
                <p className={style["error-text"]}></p>
              )}
            </div>
          </div>

          <div className="mb-4 pt-4">
            {/* PENDIENTE APLICAR ESTILOS DE BOOTSTRAP*/}
            <label htmlFor="image" className="form-label">
              <strong>Imagen</strong>
            </label>
            <input
              type="file"
              name="image"
              onChange={handleImageUpload}
              className="form-control"
            />
            {data.image && (
              <img
                src={data.image}
                alt={data.name}
                className={style.imagePreview}
              />
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={!isValid}
              className="btn btn-outline-primary w-100 my-1"
            >
              Guardar cambios
            </button>
            <h2></h2>
          </div>
        </form>
      </div>
    </div>
  );
};
export default FormProductEdit;
