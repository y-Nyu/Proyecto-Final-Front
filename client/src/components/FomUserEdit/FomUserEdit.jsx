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
  console.log("holi", data);
  console.log(data);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const submitHandler = (event) => {
    event.preventDefault();
    
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
    setData({
      ...data,
      [name]: value,
    });
    // const newErrors = ValidateProduct({
    //   ...data,
    //   [name]: value,
    // });
    // setErrors(newErrors);
    // isFormValid();
  };

  // La función isFormValid verifica si no hay mensajes de error en el estado `errors`.
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
              Nombre Usuario
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
              Email
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
              Celular
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

          <div className="mb-4 pt-4">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="text"
              name="password"
              onChange={handleChange}
              className="form-control"
              value={data.password}
            />
            <div className="error-container">
              {errors.password ? (
                <p className={style["error-text"]}>{errors.password}</p>
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
              Editar
            </button>
            <h2></h2>
          </div>
        </form>
      </div>
    </div>
  );
};
export default FormUserEdit;
