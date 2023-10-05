import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { validateLogin } from "../../Validate";


import { createUserRole, userLogin } from "../../redux/Actions/Users/usersActions";
import { useGoogleLogin } from "@react-oauth/google";
import { createUserRole, getUserById } from "../../redux/Actions/Users/usersActions";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import jwtDecode from 'jwt-decode'
import style from './Login.module.css';

const {CLIENT_ID, CLIENT_SECRET, OAUTH_REDIRECT} = import.meta.env;

// EXTRA: Recuperación de contraseña

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


  const handleSubmit = (ev) => {
    ev.preventDefault();

    axios.post("https://pf-back-deploy.onrender.com/login", data)
      .then(usrRes => {

        const {rol, token} = usrRes.data;
        // Setteamos el token
        sessionStorage.setItem("jwt_session", token);
        dispatch(createUserRole(rol));
        navigate("/");
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id
        dispatch(getUserById(userId))
      })
      .catch(error => {
        console.log(error);
        alert(error.response.data.error)
      })
  };

  // user que recibe debe quedar almacenado en localStorage
  const login = async () => {
    // NECESITO SETTEAR LAS VARIABLES DE ENTORNO
    try
    {
      // Abrimos un popup para hacer el login
      const {auth_url} = (await axios.post("http://localhost:3001/login-google")).data
      window.open(auth_url, "Google Login", "height=500,width=400,left=100,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes");
    }
    catch(error)
    {
      alert("Fallo al iniciar la autenticación con Google");
    }
  
  }

  

  return (
    <div className="container">
      <div className="col">
        <h2 className='fw-bold text-center pt-4'>¡Te damos la bienvenida!</h2>
        <h5 className='text-center'>Inicio de sesión</h5>
        <form onSubmit={handleSubmit}>

          <div className="mb-4 pt-4">
            <label htmlFor="emailInput" className="form-label"> Correo electrónico </label>
            <input onChange={handleChange} type="email" name="email" id="emailInput" placeholder="ejemplo@correo.com" value={data.email} className="form-control"/>
            <div className="error-container">
              {errors.email ? <p className={style["error-text"]}>{errors.email}</p> : <p className={style["error-text"]}></p>}
            </div>
          </div>

          <div className="mb-5">
            <label htmlFor="passwordInput" className="form-label"> Contraseña </label>
            <input onChange={handleChange} type="password" name="password" className="form-control" id="passwordInput" placeholder="Ingresa tu contraseña" value={data.password} />
            <div className="error-container">
              {errors.password ? <p className={style["error-text"]}>{errors.password}</p> : <p className={style["error-text"]}></p>}
            </div>
          </div>

          <div className="d-grid">
            <button type="submit" disabled={disableByEmptyProps()} className="btn btn-primary"> Iniciar sesión </button>
          </div>
        </form>

        <div className="container w-100 mt-3 pb-5">
          <div className='row'>
            <div className="col">
              <button onClick={() => login()} className='btn btn-outline-primary w-100 my-1'>
                <div className='row align-items-center'>
                  <div className='col-2 align-items-center'>
                    <img src='https://rotulosmatesanz.com/wp-content/uploads/2017/09/2000px-Google_G_Logo.svg_.png' width='18' alt='logoGoogle'/>
                  </div>
                  <div className='col-10'>
                    Iniciar sesión con Google
                  </div>
                </div>
              </button>
            </div>

            <div className="col">
              <button onClick={toggleComponent} className='btn btn-outline-primary custom-button-height w-100 my-1'> Quiero registrarme </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;