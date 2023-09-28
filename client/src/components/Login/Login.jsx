import { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
// import { GoogleLogin } from '@react-oauth/google';
// import jwt_decode from "jwt-decode";
import { validateLogin } from "../../Validate";
import { useGoogleLogin } from "@react-oauth/google";
import { userLogin } from "../../redux/actions";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";

// EXTRA: Recuperación de contraseña
// pendiente, crear action-type y action para enviar info al back
const Login = () => {
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
  const handleSubmit = () => {
    dispatch(userLogin(data));
  };

  // user que recibe debe quedar almacenado en localStorage

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => console.log(codeResponse),
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
  //         }catch(err) {
  //             console.log(err);
  //         }
  //     }
  //   });

  // Pdte deshabilitar botón submit cuando surja un error
  return (
    <div className="container">
      <div className="col-md-12">
        <form onSubmit={handleSubmit}>
          <h2>Inicio de sesión</h2>

          <div className="mb-3">
            <label htmlFor="emailInput" className="form-label">
              Correo electrónico
            </label>
            <input
              onChange={handleChange}
              type="email"
              name="email"
              className="form-control"
              id="emailInput"
              placeholder="ejemplo@correo.com"
              value={data.email}
            />
            {errors.email ? <p>{errors.email}</p> : null}
          </div>

          <div className="mb-3">
            <label htmlFor="passwordInput" className="form-label">
              Contraseña
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
            {errors.password ? <p>{errors.password}</p> : null}
          </div>

          <div className="row">
            <div className="col-6">
              <NavLink to={"/home"}>
                <button
                  type="submit"
                  disabled={disableByEmptyProps()}
                  className="btn btn-primary"
                >
                  Iniciar sesión
                </button>
              </NavLink>
            </div>
          </div>
        </form>

        <button onClick={() => login()}> Iniciar sesión con Google </button>
      </div>
    </div>
  );
};

export default Login;
