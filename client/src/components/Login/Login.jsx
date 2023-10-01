import { useState } from "react";
import { useDispatch } from "react-redux";
// import { GoogleLogin } from '@react-oauth/google';
// import jwt_decode from "jwt-decode";
import { validateLogin } from "../../Validate";
import { useGoogleLogin } from "@react-oauth/google";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import style from './Login.module.css';

// EXTRA: Recuperación de contraseña
// pendiente, crear action-type y action para enviar info al back
const Login = ({ toggleComponent }) => {
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

  const dispatch = useDispatch();
  // const handleSubmit = () => {
  //   dispatch(userLogin(data));
  // };

  const handleSubmit = (ev) => {
    ev.preventDefault();

    // Envio la request de Login
    // Si sale bien, guardo el token en sessionStorage y navego a home.
    // En caso contrario se muestra una alerta con el mensaje de error
    // deploy https://pf-back-deploy.onrender.com local http://localhost:3001
    axios.post("https://pf-back-deploy.onrender.com/login", data)
      .then(usrRes => {

        // Rol debería ser guardado en estado global
        // para chequear luego si el usuario tiene acceso a las paginas de admin o no
        const {rol, token} = usrRes.data;
        
        // Setteamos el token
        sessionStorage.setItem("jwt_session", token);
        dispatch(createUserRole(rol));
        navigate("/home");
      })
      .catch(error => alert(error.response.data.error))
  };

  // user que recibe debe quedar almacenado en localStorage

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => console.log(codeResponse),
  });

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


// return (
//   <div className="container">
//     <div className="col-md-12">
//       <form onSubmit={handleSubmit}>
//         <h2>Inicio de sesión</h2>

//         <div className="mb-3">
//           <label htmlFor="emailInput" className="form-label">
//             Correo electrónico
//           </label>
//           <input
//             onChange={handleChange}
//             type="email"
//             name="email"
//             className="form-control"
//             id="emailInput"
//             placeholder="ejemplo@correo.com"
//             value={data.email}
//           />
//           {errors.email ? <p>{errors.email}</p> : null}
//         </div>

//         <div className="mb-3">
//           <label htmlFor="passwordInput" className="form-label">
//             Contraseña
//           </label>
//           <input
//             onChange={handleChange}
//             type="password"
//             name="password"
//             className="form-control"
//             id="passwordInput"
//             placeholder="Ingresa tu contraseña"
//             value={data.password}
//           />
//           {errors.password ? <p>{errors.password}</p> : null}
//         </div>

//         <div className="row">
//           <div className="col-6">
//             <NavLink to={"/home"}>
//               <button
//                 type="submit"
//                 disabled={disableByEmptyProps()}
//                 className="btn btn-primary"
//               >
//                 Iniciar sesión
//               </button>
//             </NavLink>
//           </div>
//         </div>
//       </form>

//       <button onClick={() => login()}> Iniciar sesión con Google </button>
//     </div>
//   </div>
// );






