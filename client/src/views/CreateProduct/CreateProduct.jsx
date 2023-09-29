import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { validateProduct } from '../../Validate'
import { getCategories, createProduct } from '../../redux/Actions/Products/productsActions'

const createProduct = () => {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getCategories())
  },[])

  const allCategories = useSelector(state=>state.categories)

  const [data, setData] = useState({
    name: "",
    image: "",
    brand: "",
    category: "",
    detail: "",
    price: "",
    stock: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    image: "",
    brand: "",
    category: "",
    detail: "",
    price: "",
    stock: "",
  });

  const handleSubmit = () => {
    return (
        dispatch(createProduct(data))
    );
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({
      ...data,
      [name]: value,
    });
    const newErrors = validateProduct({
      ...data,
      [name]: value,
    });
    setErrors(newErrors);
  };

  return (
    <div>
      <h1>Crear nuevo roducto</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" name="name" onChange={handleChange} />
        {errors.name ? <p>{errors.name}</p> : null}
        <label htmlFor="image">Image</label>
        <input type="text" name="image" onChange={handleChange} />
        {errors.image ? <p>{errors.image}</p> : null}
        <label htmlFor="brand">Brand</label>
        <input type="text" name="brand" onChange={handleChange} />
        {errors.brand ? <p>{errors.brand}</p> : null}
        <label htmlFor="category">Category</label>
        <select name="category" onChange={handleChange}>
          {allCategories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
        {errors.category ? <p>{errors.category}</p> : null}
        <label htmlFor="detail">Detail</label>
        <input type="text" name="detail" onChange={handleChange} />
        {errors.detail ? <p>{errors.detail}</p> : null}
        <label htmlFor="price">Price</label>
        <input type="text" name="price" onChange={handleChange} />
        {errors.price ? <p>{errors.price}</p> : null}
        <label htmlFor="stock">Stock</label>
        <input type="text" name="stock" onChange={handleChange} />
        {errors.stock ? <p>{errors.stock}</p> : null}
        <div>
          <button type="submit" disabled={Object.values(errors).some((error) => error != "")}> Add Product </button>
          <h2></h2>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;