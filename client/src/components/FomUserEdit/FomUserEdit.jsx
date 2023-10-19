import { useState, useEffect } from "react";
import axios from "axios";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import style from "./FomProductEdit.module.css";
import { useDispatch } from "react-redux";
import { getAllUsers } from "../../redux/Actions/Users/usersActions";

const FormUserEdit = ({ userEdit, closeModal }) => {
  const [isValid, setIsValid] = useState(true);

  const [data, setData] = useState({
    name: "",
    email: "",
    celular: "",
    password: "",
    passwordConfirmation: "",
  });

  useEffect(() => {
    if (userEdit) {
      setData(userEdit);
    }
  }, [userEdit]);
  console.log("user", userEdit);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const submitHandler = (event) => {
    event.preventDefault();
    console.log(data);
    axios
      .put(`https://pf-back-deploy.onrender.com/users/${data.id}`, data)
      .then((res) => {
        alert("Usuario actualizado exitosamente!");
        dispatch(getAllUsers());
        closeModal();
      })

      .catch((error) => alert(error));
  };

  const handleChange = (event) => {
    let { name, value } = event.target;
    console.log("Data:...", data);
    if (name === "name" || name === "email" || name === "celular") {
      setData({
        ...data,
        [name]: value,
      });
    }
  };

  const isFormValid = () => {
    setIsValid(Object.values(errors).every((error) => error === ""));
  };

  return (
    <div className="container">
      <div className="col">
        <h2 className="fw-bold text-center pt-4">Editar Usuario</h2>
        <form onSubmit={submitHandler}>
          <div className="mb-4 pt-4">
            <label htmlFor="name" className="form-label">
              <strong>Nombre Usuario</strong>
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
            <label htmlFor="email" className="form-label">
              <strong>Email</strong>
            </label>
            <input
              type="text"
              name="email"
              onChange={handleChange}
              className="form-control"
              value={data.email}
            />
            <div className="error-container">
              {errors.email ? (
                <p className={style["error-text"]}>{errors.email}</p>
              ) : (
                <p className={style["error-text"]}></p>
              )}
            </div>
          </div>

          <div className="mb-4 pt-4">
            <label htmlFor="celular" className="form-label">
              <strong>Celular</strong>
            </label>
            <input
              type="text"
              name="celular"
              onChange={handleChange}
              className="form-control"
              value={data.celular}
            />
            <div className="error-container">
              {errors.celular ? (
                <p className={style["error-text"]}>{errors.celular}</p>
              ) : (
                <p className={style["error-text"]}></p>
              )}
            </div>
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
export default FormUserEdit;
