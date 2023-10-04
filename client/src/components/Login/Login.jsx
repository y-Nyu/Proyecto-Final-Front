import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { GoogleLogin } from '@react-oauth/google';
// import jwt_decode from "jwt-decode";
import { validateLogin } from "../../Validate";
import { useGoogleLogin } from "@react-oauth/google";
import {
  createUserRole,
  userLogin,
} from "../../redux/Actions/Users/usersActions";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import style from "./Login.module.css";
import imgGoogle from "../../assets/iconos/google.png";

// EXTRA: Recuperación de contraseña
// pendiente, crear action-type y action para enviar info al back
const Login = ({ toggleComponent }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({
      ...data,
      [name]: value,
    });
    const newErrors = validateLogin({
      ...data,
      [name]: value,
    });
    setErrors(newErrors);
  };

  const disableByEmptyProps = () => {
    let disabledAux = true;
    if (data.email === "" || data.password === "") {
      disabledAux = true;
    } else {
      disabledAux = false;
    }
    return disabledAux;
  };

  // const handleSubmit = () => {
  //   dispatch(userLogin(data));
  // };

  const handleSubmit = (ev) => {
    ev.preventDefault();

    // Envio la request de Login
    // Si sale bien, guardo el token en sessionStorage y navego a home.
    // En caso contrario se muestra una alerta con el mensaje de error
    // deploy https://pf-back-deploy.onrender.com local http://localhost:3001
    axios
      .post("https://pf-back-deploy.onrender.com/login", data)
      .then((usrRes) => {
        // Rol debería ser guardado en estado global
        // para chequear luego si el usuario tiene acceso a las paginas de admin o no
        const { rol, token } = usrRes.data;

        // Setteamos el token
        sessionStorage.setItem("jwt_session", token);
        dispatch(createUserRole(rol));
        navigate("/home");
      })
      .catch((error) => alert(error.response.data.error));
  };

  // user que recibe debe quedar almacenado en localStorage
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      axios.post("http://localhost:3001/login-google", {
        google_token: codeResponse.access_token,
      });
    },
  });

  // const login = useGoogleLogin({
  //     onSuccess: async (response) => {
  //         try {
  //             const res = await axios.get(
  //                 'https://www.googleapis.com/auth/userinfo',
  //                 {
  //                     headers: {
  //                         Authorization: `Bearer ${response.access_token}`
  //                     }
  //                 }
  //             )
  //             console.log(res);
  //         }
  //         catch(err) {
  //             console.log(err);
  //         }
  //     }
  //   });

  // Pdte deshabilitar botón submit cuando surja un error
  return (
    <div className="container">
      <div className="col">
        <h2 className="fw-bold text-center pt-4">¡Te damos la bienvenida!</h2>
        <h5 className="text-center">Inicio de sesión</h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 pt-4">
            <label htmlFor="emailInput" className="form-label">
              <strong>Correo electrónico</strong>{" "}
            </label>
            <input
              onChange={handleChange}
              type="email"
              name="email"
              id="emailInput"
              placeholder="ejemplo@correo.com"
              value={data.email}
              className="form-control"
            />
            <div className="error-container">
              {errors.email ? (
                <p className={style["error-text"]}>{errors.email}</p>
              ) : (
                <p className={style["error-text"]}></p>
              )}
            </div>
          </div>

          <div className="mb-5">
            <label htmlFor="passwordInput" className="form-label">
              {" "}
              <strong>Contraseña</strong>{" "}
            </label>
            <input
              onChange={handleChange}
              type="password"
              name="password"
              className="form-control"
              id="passwordInput"
              placeholder="Ingresa tu contraseña"
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

          <div className="d-grid">
            <button
              type="submit"
              disabled={disableByEmptyProps()}
              className="btn btn-primary"
            >
              {" "}
              Iniciar sesión{" "}
            </button>
          </div>
        </form>

        <div className="container w-100 mt-3 pb-5 text-center">
          <div className="row">
            <div className="col d-flex justify-content-center align-items-center">
              <a
                href="#"
                onClick={() => login()}
                className="btn-outline-primary w-100 my-1 btn-lg align-items-center text-center"  style={{ marginBottom: "20px" }}
              >
                <div className="row align-items-center">
                  <div className="col-10">
                    {" "}
                    <img
                      src={imgGoogle}
                      width="18"
                      alt="Google"
                      className="no-margin align-items-center"
                    />{" "}
                    Iniciar sesión con Google{" "}
                  </div>
                 
                </div>
                
              </a>
            </div>
            <div className="row">
              <p>¿Aún no tienes una cuenta?               <a
                onClick={toggleComponent}
                className="btn-outline-primary custom-button-height w-100 my-1 btn-lg"
                style={{ cursor: "pointer" }}
              >
                {" "}
                Regístrate aquí{" "}
              </a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
