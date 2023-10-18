import { useState, useEffect } from "react";
import axios from "axios";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import style from "./FomProductDel.module.css";
import { useDispatch } from "react-redux";
import { getAllUsers } from "../../redux/Actions/Users/usersActions";

const FormUserDel = ({ userEdit, closeModal }) => {
  const [isValid, setIsValid] = useState(true);
  const activo = ["Seleccione...", "Activar", "Desactivar"];
  const dispatch = useDispatch();
  const [data, setData] = useState({
    name: "",
    email: "",
    celular: "",
    password: "",
    passwordConfirmation: "",
  });

  useEffect(() => {
    if (userEdit) {
      setData((prevData) => ({
        ...prevData,
        ...userEdit,
        active: "",
      }));
      console.log("sec ", data);
    }
  }, [userEdit]);

  const [errors, setErrors] = useState({});

  const submitHandler = (event) => {
    event.preventDefault();
    if (data.active !== "") {
      axios
        .put(`https://pf-back-deploy.onrender.com/users/${data.id}`, data)
        .then((res) => {
          alert("Usuario actualizado exitosamente!");
          dispatch(getAllUsers());
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
        <h2 className="fw-bold text-center pt-4">Editar Usuario</h2>
        <form onSubmit={submitHandler}>
          <div className="mb-4 pt-4">
            <strong>{` ${data.name}`}</strong>
            <div className="error-container">
              {errors.name ? (
                <p className={style["error-text"]}>{errors.name}</p>
              ) : (
                <p className={style["error-text"]}></p>
              )}
            </div>
          </div>

          <div className="mb-4 pt-4">
            <label htmlFor="active" className="form-label">
              Borrar
            </label>
            <select
              name="active"
              onChange={handleChange}
              className="form-control"
            >
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
            <h2></h2>
          </div>
        </form>
      </div>
    </div>
  );
};
export default FormUserDel;
