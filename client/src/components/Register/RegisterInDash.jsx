import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { validateRegister } from "../../Validate";

import {
  getAllUsers,
  createUserRole,
  setUser,
} from "../../redux/Actions/Users/usersActions";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import style from "./Register.module.css";

const RegisterInDash = ({ closeModal }) => {
  const navigate = useNavigate();
  const roles = ["Select...", "USER", "ADMIN"];
  const [data, setData] = useState({
    rol: "",
    name: "",
    email: "",
    celular: "",
    password: "",
    passwordConfirmation: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    celular: "",
    password: "",
    passwordConfirmation: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    setData({ ...data, [name]: value });
    console.log(data);
    const newErrors = validateRegister({
      ...data,
      [name]: value,
    });
    setErrors(newErrors);
  };

  const dispatch = useDispatch();

  //
  // USO, LO MISMO QUE EN EL LOGIN, UN DISPATCH CON LA ACTION setUser
  // PARA EVITAR DECODIFICAR EL TOKEN Y TENER QUE HACER OTRA REQUEST AL BACK
  //

  const register = (ev) => {
    ev.preventDefault();

    axios
      .post("https://pf-back-deploy.onrender.com/users", data)
      .then((res) => {
        console.log("axios", data);
        const { id, email, name, rol, celular, token } = res.data;
        dispatch(setUser({ id, email, name, rol, celular }));
        alert("Usuario creado");
        dispatch(getAllUsers());
        closeModal();
      })
      .catch((error) => alert(error.response.data.error));
  };

  return (
    <div className="container">
      <h3 className="fw-bold text-center pt-3">Crear nueva cuenta</h3>
      <form onSubmit={register} className="col">
        <div className="mb-4 pt-1">
          <label className="form-label">
            <strong>Nombre</strong>
          </label>
          <input
            onChange={handleChange}
            type="text"
            name="name"
            value={data.name}
            placeholder="Ingresa tu nombre"
            className="form-control"
          />
          {errors.name ? (
            <p className={style["error-text"]}>{errors.name}</p>
          ) : (
            <p className={style["error-text"]}></p>
          )}
        </div>

        <div className="mb-4 pt-1">
          <label className="form-label">
            <strong>Rol</strong>
          </label>
          {/* PENDIENTE APLICAR ESTILOS DE BOOTSTRAP A LA LISTA DESPLEGABLE*/}
          <select name="rol" onChange={handleChange} className="form-control">
            {roles.map((rol) => (
              <option key={rol} value={rol}>
                {rol}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4 pt-1">
          <label className="form-label">
            <strong>Correo electrónico</strong>
          </label>
          <input
            onChange={handleChange}
            type="email"
            name="email"
            value={data.email}
            placeholder="ejemplo@correo.com"
            className="form-control"
          />
          {errors.email ? (
            <p className={style["error-text"]}>{errors.email}</p>
          ) : (
            <p className={style["error-text"]}></p>
          )}
        </div>

        <div className="mb-4 pt-1">
          <label className="form-label">
            <strong>Celular</strong>
          </label>
          <input
            onChange={handleChange}
            type="text"
            name="celular"
            value={data.celular}
            placeholder="Ingresa un número de 11 dígitos"
            className="form-control"
          />
          {errors.celular ? (
            <p className={style["error-text"]}>{errors.celular}</p>
          ) : (
            <p className={style["error-text"]}></p>
          )}
        </div>

        <div className="mb-4 pt-1">
          <label className="form-label">
            <strong>Contraseña</strong>
          </label>
          <input
            onChange={handleChange}
            type="password"
            name="password"
            value={data.password}
            placeholder="Contraseña"
            className="form-control"
          />
          {errors.password ? (
            <p className={style["error-text"]}>{errors.password}</p>
          ) : (
            <p className={style["error-text"]}></p>
          )}
        </div>

        <div className="mb-4 pt-1">
          <label className="form-label">
            <strong>Confirmar contraseña</strong>
          </label>
          <input
            onChange={handleChange}
            type="password"
            name="passwordConfirmation"
            placeholder="Ingresa nuevamente tu contraseña"
            className="form-control"
            value={data.passwordConfirmation}
          />
          {errors.passwordConfirmation ? (
            <p className={style["error-text"]}>{errors.passwordConfirmation}</p>
          ) : (
            <p className={style["error-text"]}></p>
          )}
        </div>

        <div className="container w-100 py-2">
          <div className="row">
            <div className="col">
              <button
                type="submit"
                className="btn btn-primary w-100 my-1"
                cancelButtonProps={{ style: { display: "none" } }}
              >
                Registrar Usuario
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterInDash;
