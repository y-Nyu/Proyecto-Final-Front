import { useState } from "react";
import { useDispatch } from "react-redux";
import { createUserRole, setUser } from "../../redux/Actions/Users/usersActions";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";

import { validateLogin } from "../../Validate/Validate";
import imgGoogle from "../../assets/iconos/google.png";
import style from './Login.module.css';

const Login = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [ showPassword, setShowPassword ] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  };

  const handleChange = (event) => {
    const { name, value } = event.target
    setData({
      ...data,
      [name]: value,
    })
    const newErrors = validateLogin({
      ...data,
      [name]: value,
    })
    setErrors(newErrors)
  };

  const disableByEmptyProps = () => {
    let disabledAux = true
    if (data.email === "" || data.password === "") {
      disabledAux = true
    } else {
      disabledAux = false
    }
    return disabledAux
  };

  const handleSubmit = (ev) => {
    ev.preventDefault()

    axios.post("https://pf-back-deploy.onrender.com/login", data)
      .then(usrRes => {
        const { id, email, name, rol, celular, address, token, sales } = usrRes.data;

        // Setteamos el token
        sessionStorage.setItem("jwt_session", token)
        sessionStorage.setItem("userRole", rol)
        dispatch(createUserRole(rol))
        dispatch(setUser({id, email, name, rol, celular, address, sales}))
        navigate("/")
      })
      .catch(error => {
        console.log(error);
        alert(error.response.data.error)
      })
  };

  const login = async () => {
    try
    {
      // 
      // PEDIMOS AL BACK UNA URL DE GOOGLE
      //
      // ESTA URL ES EL FAMOSO POPUP QUE APARECE SIEMPRE QUE HACEMOS LOGIN CON GOOGLE
      //
      const { auth_url } = (
        await axios.post(
          "https://pf-back-deploy.onrender.com/login-google-init"
        )
      ).data;
      //
      // USANDO LA URL PROVISTA ABRIMOS UNA VENTANA QUE PIDE ESCOGER LA CUENTA DE MAIL
      // CON LA QUE VAMOS A HACER LOGIN
      //
      window.open(auth_url, "_self");
    }
    catch(error)
    {
      alert("Fallo al iniciar la autenticación con Google");
    }
  };

  return (
    <div className="container">
      <div className='row'>
        <div className={`col-md-6 ${style.backgroundLogin}`}></div>
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
                type={showPassword ? 'text' : 'password'}
                name="password"
                className="form-control"
                id="passwordInput"
                placeholder="Ingresa tu contraseña"
                value={data.password}
              />
              <a onClick={togglePasswordVisibility} className={style.eye}> 
                {!showPassword ? <i className="bi bi-eye"></i> : <i className="bi bi-eye-fill"></i>} 
              </a>
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
                className='btn btn-primary w-100 my-1'
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
                <p>¿Aún no tienes una cuenta?
                  <a
                  className="btn-outline-primary custom-button-height w-100 my-1 btn-lg"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/register")}
                  >
                  {" "}Regístrate aquí{" "}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Login;