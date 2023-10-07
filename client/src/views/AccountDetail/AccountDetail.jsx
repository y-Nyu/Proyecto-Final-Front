import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AccountDetail = () => {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.userLogged);
  console.log(userData);

  const [userDetail, setUserDetail] = useState({
    name: "",
    email: "",
    celular: "",
    password: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserDetail({
      ...userDetail,
      [name]: value,
    });
  };

  const saveChanges = () => {
    // Despachar una acción para guardar información en el backend
    setIsEditing(false);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <form className="w-75">
        <fieldset disabled={!isEditing}>
          <legend><strong><ins>Detalles de mi cuenta</ins></strong></legend>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
            <em> Nombre</em>
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={userDetail.name}
              onChange={handleChange}
            />
          </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
          <em> Correo electrónico</em>
          </label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={userDetail.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="celular" className="form-label">
          <em> Celular</em>
          </label>
          <input
            type="text"
            className="form-control"
            name="celular"
            value={userDetail.celular}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
          <em> Confirmar contraseña actual</em> 
          </label>
          <input
            type="password"
            className="form-control"
            name="password"
            onChange={handleChange}
          />
        </div>
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
        </div>
        </fieldset>

{isEditing ? (
  <button
    type="button"
    className="btn btn-primary mt-3"
    onClick={saveChanges}
  >
    Guardar Cambios
  </button>
) : (
  <button
    type="button"
    className="btn btn-secondary mt-3"
    onClick={() => setIsEditing(true)}
  >
    Editar
  </button>
)}
<button
  type="button"
  className="btn btn-primary mt-3"
  onClick={() => {
    navigate("/sales");
  }}
>
  Mis compras
</button>
</form>
</div>
);
};

export default AccountDetail;


// import { useState } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

// const AccountDetail = () => {
//   const navigate = useNavigate();
//   const userData = useSelector(state=>state.userLogged)
//   console.log(userData);

//     const [userDetail, setUserDetail] = useState({
//         name: '',
//         email: '',
//         celular: '',
//         password: '',
//       });
    
//       const [isEditing, setIsEditing] = useState(false);
  
    
//       const handleChange = (event) => {
//         const { name, value } = event.target;
//         setUserDetail({
//           ...userDetail,
//           [name]: value,
//         });
//       };
    
//       const saveChanges = () => {
//         // despachar action para guardar información en el back
//         setIsEditing(false);
//       };

//     return (
//         <div>
//           <h2>Detalles de mi cuenta</h2>
//           <form>
//             <div>
//               <label htmlFor='name'>Nombre</label>
//               <input type="text" name="name" value={userDetail.name} onChange={handleChange} disabled={!isEditing}></input>
//             </div>

//             <div>
//               <label htmlFor='email'>Correo electrónico</label>
//               <input type="email" name="email" value={userDetail.email} onChange={handleChange} disabled={!isEditing}></input>
//             </div>

//             <div>
//               <label htmlFor='celular'>Celular</label>
//               <input type="text" name="celular" value={userDetail.celular} onChange={handleChange} disabled={!isEditing}></input>
//             </div>

//             <div>
//               <label htmlFor='password'>Confirmar contraseña actual</label>
//               <input type="password" name="password" onChange={handleChange} disabled={!isEditing}/>
//             </div>

//             <div>
//               <label htmlFor='newPassword'>Nueva contraseña</label>
//               <input type="password" name="newPassword" onChange={handleChange} disabled={!isEditing}/>
//             </div>

//             <div>
//               <label htmlFor='passwordConfirmation'>Confirmar nueva contraseña</label>
//               <input type="password" name="passwordConfirmation" onChange={handleChange} disabled={!isEditing}/>
//             </div>


//           </form>

//           {isEditing 
//           ? ( <button onClick={saveChanges}>Guardar Cambios</button> ) 
//           : ( <button onClick={() => setIsEditing(true)}>Editar</button> )
//           }
//           <button onClick={() => {navigate('/sales')}}>
//             Mis compras
//           </button>
//         </div>
//       );
// }

// export default AccountDetail;


            /* No se ha incorporado el dato dirección en el back, pdte para mostrar
            <div>
              <label for='name'>Dirección</label>
              <input type="text" name="address" value={userDetail.address} onChange={handleChange} disabled={!isEditing}>{userDetail.address}</input>
            </div> */