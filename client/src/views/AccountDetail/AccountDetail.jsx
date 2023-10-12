import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { validateAccountDetail } from "../../Validate";
import { setUser } from '../../redux/Actions/Users/usersActions'
import axios from "axios";

const AccountDetail = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const userData = useSelector(state => state.userLogged)
  const { id, name, email, celular, address } = userData
  console.log(userData);
  
  const [userDetail, setUserDetail] = useState({
    name: name,
    email: email,
    celular: celular,
    address: address || ''
  });

  const [userDetailCopy, setUserDetailCopy] = useState({
    name: name,
    email: email,
    celular: celular,
    address: address || '',
    newPassword: ''
  });

  // console.log(userDetailCopy);

  const [errors, setErrors] = useState({
    name: '',
    celular: '',
    email: '',
    address: '',
    newPassword: '',
    passwordConfirmation: ''
  });

  console.log(errors);
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

    // Actualiza el estado de errores con el nuevo mensaje de error (o cadena vacía si no hay error)
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: newErrors[name] || "",
    }));
  };

  // Determina si hay errores activos
  const hasErrors = Object.values(errors).some((error) => error !== '');

  // Me había olvidado. Hay que hacer la request con método post a la ruta change-password. 
  // Manda en el body el password nuevo como 'password' de nombre. 
  // Si te da error es que no se subió al back todavía

  const handleSubmit = (event) => {
    event.preventDefault();
    if (userDetailCopy.newPassword.length > 0){
      axios.post(`https://pf-back-deploy.onrender.com/change-password`, {newPassword: userDetailCopy.newPassword})
    } else {
          // Envía al backend solo las propiedades modificadas
      const modifiedData = Object.keys(userDetailCopy).reduce((element, key) => {
        if (userDetailCopy[key] !== userDetail[key]) {
          element[key] = userDetailCopy[key];
        }
        return element;
      }, {});
    }
    console.log(modifiedData);

    axios.put(`https://pf-back-deploy.onrender.com/users/${id}`, modifiedData)
      .then((response) => {
        console.log(response.data);
        // Actualiza en el estado global la info modificada.
        dispatch(setUser({ ...userData, ...modifiedData }))
        setIsEditing(false);
      })
      .catch((error) => {
        alert(error.response.data);
      });
  }

  const handleClose = () => {
    // Restaura los valores originales de los campos
    setUserDetailCopy({
      name: name,
      email: email,
      celular: celular,
      address: address
    });
    // Limpia los errores
    setErrors({
      name: '',
      celular: '',
      email: '',
      address: '',
      newPassword: '',
      passwordConfirmation: ''
    });
    setIsEditing(false);
  };

  return (

    <div className="container d-flex justify-content-center align-items-center vh-100">
      <form className="w-75 mb-4" onSubmit={handleSubmit}>
        <fieldset disabled={!isEditing}>
          <legend className="text-center mt-3">
            <strong>
              <ins>Detalles de mi cuenta</ins>
            </strong>
          </legend>

          <h6> Información personal </h6>

          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              <em> Nombre</em>
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

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              <em> Correo electrónico</em>
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

          <div className="mb-3">
            <label htmlFor="celular" className="form-label">
              <em> Celular</em>
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


          <div className="mb-3">
            <label htmlFor="address" className="form-label">
              <em> Dirección </em>
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

          <hr />

          <h6> Cambiar contraseña </h6>

          <div className="mb-3">
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

          <div className="mb-3">
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

        </fieldset>
        {isEditing && <button type="submit" className="btn btn-primary" disabled={hasErrors || JSON.stringify(userDetailCopy) === JSON.stringify(userDetail)}>Guardar Cambios</button>}
      </form>

      <div className="mt-1">
        {isEditing && <button type="button" className="btn btn-primary" onClick={handleClose}>Salir</button>}
      </div>

      {!isEditing && <button type="button" className="btn btn-outline-primary" onClick={() => setIsEditing(true)}>Modificar información</button>}

      <div className="mt-1"> {/* Agrega un margen superior aquí */}
        <button
          type="button"
          className="btn btn-outline-success"
          onClick={() => {
            navigate("/sales");
          }}
        >
          Mis compras
        </button>
      </div>
    </div>
  )
};

export default AccountDetail;