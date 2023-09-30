import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ValidateProduct } from "../../Validate/Validate";
import { getCategories } from "../../redux/Actions/Products/productsActions";
import axios from "axios";

const FormProduct = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const categories = useSelector((state) => state.categories);
  const [data, setData] = useState({
    name: "",
    image: "",
    brand: "",
    category: "",
    description: "",
    price: "",
  });
  console.log(data);
  const [errors, setErrors] = useState({
    name: "Ingese nombre menor a 20 caracteres",
    brand: "Ingese marca menor a 20 caracteres",
    category: "Seleccione una categoria",
    description: "Ingese detalle de producto mayor a 10 caracteres",
    price: "Ingrese precio",
    stock: "Stock debe ser un número",
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
  };

  const submitHandler = (event) => {
    event.preventDefault();

    axios
      .post("https://pf-back-deploy.onrender.com/product", data)
      .then((res) => alert("Prudcto cargado exitosamente!"))
      .catch((error) => alert(error));

    setData({
      name: "",
      image: "",
      brand: "",
      category: "",
      description: "",
      price: "",
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({
      ...data,
      [name]: value,
    });
    const newErrors = ValidateProduct({
      ...data,
      [name]: value,
    });
    setErrors(newErrors);
  };

  // La función isFormValid verifica si no hay mensajes de error en el estado `errors`.
  const isFormValid = () => {
    return Object.values(errors).every((error) => error === "");
  };

  return (
    <div>
      <h1>Formulario ingreso Producto</h1>
      <form onSubmit={submitHandler}>
        <label htmlFor="name">Name:</label>
        <input type="text" name="name" onChange={handleChange} />
        {errors.name ? <p>{errors.name}</p> : null}

        <label htmlFor="brand">Brand</label>
        <input type="text" name="brand" onChange={handleChange} />
        {errors.brand ? <p>{errors.brand}</p> : null}
        <label htmlFor="category">Category</label>
        <select name="category" onChange={handleChange}>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
        {errors.category ? <p>{errors.category}</p> : null}
        <label htmlFor="description">description</label>
        <input type="text" name="description" onChange={handleChange} />
        {errors.description ? <p>{errors.description}</p> : null}
        <label htmlFor="price">Price</label>
        <input type="text" name="price" onChange={handleChange} />
        {errors.price ? <p>{errors.price}</p> : null}
        <label htmlFor="stock">Stock</label>
        {/* <input type="text" name="stock" onChange={handleChange} />
        {errors.stock ? <p>{errors.stock}</p> : null} */}
        <label htmlFor="image">Image</label>
        <input type="file" name="image" onChange={handleImageUpload} />
        {data.image && (
          <img src={data.image} alt={data.name} className="imagePreview" />
        )}

        <div>
          <button type="submit" disabled={!isFormValid()}>
            Add Product
          </button>
          <h2></h2>
        </div>
      </form>
    </div>
  );
};
export default FormProduct;
