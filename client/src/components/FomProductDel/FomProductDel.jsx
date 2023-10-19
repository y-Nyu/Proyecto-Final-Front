import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import style from "./FomProductDel.module.css";
import { getAllProductsAdmin } from "../../redux/Actions/Products/productsActions";

const FormProductDel = ({ productEdit, closeModal }) => {
  const dispatch = useDispatch();
  const [isValid, setIsValid] = useState(true);
  const activo = ["Seleccione...", "Activar", "Desactivar"];

  const [data, setData] = useState(
    productEdit || {
      name: "",
      image: "",
      brand: "",
      category: "",
      description: "",
      price: "",
      stock: "",
      id: "",
      active: true,
    }
  );

  useEffect(() => {
    if (productEdit) {
      setData((prevData) => ({
        ...prevData,
        ...productEdit,
        active: "",
      }));
    }
  }, [productEdit]);

  const submitHandler = (event) => {
    event.preventDefault();
    if (data.active !== "") {
      axios
        .put(`https://pf-back-deploy.onrender.com/product/${data.id}`, data)
        .then((res) => {
          alert("Producto actualizado exitosamente!");
          dispatch(getAllProductsAdmin());
          closeModal();
        })
        .catch((error) => alert(error));
    } else {
      alert("Seleccione una opción");
    }
  };

  const handleChange = (event) => {
    if (event.target.name === "active") {
      if (event.target.value === "Activar") {
        setData({ ...data, active: true });
      } else {
        setData({ ...data, active: false });
      }
    }
  };

  return (
    <div className="container">
      <div className="col">
        <h2 className="fw-bold text-center pt-4">
          Activar/Desactivar producto
        </h2>
        <form onSubmit={submitHandler}>
          <div className="mb-4 pt-4">
            <strong>{` ${data.name}`}</strong>
          </div>

          <div className="mb-4 pt-4">
            <label htmlFor="active" className="form-label">
              Borrar
            </label>
            <select name="active" onChange={handleChange} className="form-control">
              {activo.map((sel, index) => (
                <option key={index} value={sel}>
                  {sel}
                </option>
              ))}
            </select>
          </div>

          <div>
            <button
              type="submit"
              disabled={!isValid}
              className="btn btn-outline-primary w-100 my-1"
            >
              Guardar cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormProductDel;
