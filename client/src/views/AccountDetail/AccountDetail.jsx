import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { validateAccountDetail } from "../../Validate";
import { setUser } from "../../redux/Actions/Users/usersActions";
import axios from "axios";

const AccountDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.userLogged);
  const { id, name, email, celular, address } = userData;

  const [userDetail, setUserDetail] = useState({
    name: name,
    email: email,
    celular: celular,
    address: address || "",
  });

  const [userDetailCopy, setUserDetailCopy] = useState({
    name: name,
    email: email,
    celular: celular,
    address: address || "",
    newPassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    celular: "",
    email: "",
    address: "",
    newPassword: "",
    passwordConfirmation: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserDetailCopy({
      ...userDetailCopy,
      [name]: value,
    });

    const newErrors = validateAccountDetail({
      ...userDetailCopy,
      [name]: value,
    });


    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: newErrors[name] || "",
    }));
  };


  const hasErrors = Object.values(errors).some((error) => error !== "");


  const handleSubmit = (event) => {
    event.preventDefault();
    if (userDetailCopy.newPassword.length > 0) {
      axios.post(`https://pf-back-deploy.onrender.com/change-password`, {
        newPassword: userDetailCopy.newPassword,
      });
    } else {
      // Envía al backend solo las propiedades modificadas
      const modifiedData = Object.keys(userDetailCopy).reduce((element, key) => {
        if (userDetailCopy[key] !== userDetail[key]) {
          element[key] = userDetailCopy[key];
        }
        return element;
      }, {});
      console.log(modifiedData);

      axios
        .put(`https://pf-back-deploy.onrender.com/users/${id}`, modifiedData)
        .then((response) => {
          console.log(response.data);
          // Actualiza en el estado global la info modificada.
          dispatch(setUser({ ...userData, ...modifiedData }));
          setIsEditing(false);
        })
        .catch((error) => {
          alert(error.response.data);
        });
    }
  };

  const handleClose = () => {
    // Restaura los valores originales de los campos
    setUserDetailCopy({
      name: name,
      email: email,
      celular: celular,
      address: address,
    });
    // Limpia los errores
    setErrors({
      name: "",
      celular: "",
      email: "",
      address: "",
      newPassword: "",
      passwordConfirmation: "",
    });
    setIsEditing(false);
  };

  return (
    <div className={`container d-flex justify-content-center align-items-center ${style.container}`}>
      <form className="w-75 mb-4" onSubmit={handleSubmit}>
        <fieldset disabled={!isEditing}>
          <legend className="text-center mt-3">
            <strong>
              <ins>Detalles de mi cuenta</ins>
            </strong>
          </legend>

          <div className="row">
            <div className="col-md-6 mb-3">
              <h5>Información personal</h5>
              <div className={`mb-3 ${style.formElementLeft}`}>
                <label htmlFor="name" className="form-label">
                  <em>Nombre</em>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={userDetailCopy.name}
                  onChange={handleChange}
                />
                {errors.name ? <p>{errors.name}</p> : <p></p>}
              </div>

              <div className={`mb-3 ${style.formElementLeft}`}>
                <label htmlFor="email" className="form-label">
                  <em>Correo electrónico</em>
                </label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={userDetailCopy.email}
                  onChange={handleChange}
                />
                {errors.email ? <p>{errors.email}</p> : <p></p>}
              </div>

              <div className={`mb-3 ${style.formElementLeft}`}>
                <label htmlFor="celular" className="form-label">
                  <em>Celular</em>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="celular"
                  value={userDetailCopy.celular}
                  onChange={handleChange}
                />
                {errors.celular ? <p>{errors.celular}</p> : <p></p>}
              </div>

              <div className={`mb-3 ${style.formElementLeft}`}>
                <label htmlFor="address" className="form-label">
                  <em>Dirección</em>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  value={userDetailCopy.address}
                  onChange={handleChange}
                />
                {errors.address ? <p>{errors.address}</p> : <p></p>}
              </div>
            </div>

            <div className="col-md-6 mb-3">
              <h5>Cambiar contraseña</h5>
              <div className={`mb-3 ${style.formElementright}`}>
                <label htmlFor="newPassword" className="form-label">
                  <em>Nueva contraseña</em>
                </label>
                <input
                  type="password"
                  className="form-control"
                  name="newPassword"
                  onChange={handleChange}
                />
                {errors.newPassword ? <p>{errors.newPassword}</p> : <p></p>}
              </div>

              <div className={`mb-3 ${style.formElementright}`}>
                <label htmlFor="passwordConfirmation" className="form-label">
                  <em>Confirmar nueva contraseña</em>
                </label>
                <input
                  type="password"
                  className="form-control"
                  name="passwordConfirmation"
                  onChange={handleChange}
                />
                {errors.passwordConfirmation ? <p>{errors.passwordConfirmation}</p> : <p></p>}
              </div>
            </div>
          </div>
        </fieldset>

        <div className="buttons">
          {isEditing && (
            <>
              <button
                type="submit"
                className="btn btn-outline-primary"
                disabled={hasErrors || JSON.stringify(userDetailCopy) === JSON.stringify(userDetail)}
              >
                Guardar Cambios
              </button>
              <button
                type="button"
                className="btn btn-outline-danger ms-2"
                onClick={handleClose}
              >
                Salir
              </button>
            </>
          )}

          {!isEditing && (
              <div className="d-flex">
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={() => setIsEditing(true)}
            >
             <i className="bi bi-pencil-square"></i> Modificar información
            </button>

  
        <button
          type="button"
          className="btn btn-outline-success ms-2"
          onClick={() => {
            navigate("/sales");
          }}
          >
          <i className="bi bi-cart-check-fill"></i> Mis compras
        </button>
      </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default AccountDetail;