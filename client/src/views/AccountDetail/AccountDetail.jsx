import { useState,useEffect } from "react";

const AccountDetail = () => {

    const [userDetail, setUserDetail] = useState({
        name: '',
        email: '',
        celular: '',
        password: '',
      });
    
      const [isEditing, setIsEditing] = useState(false);
    
      useEffect(() => {
        // Cuando se renderice la vista traer la info del usuario y cargar el state userDetail
      }, []);
    
      const handleChange = (event) => {
        const { name, value } = event.target;
        setUserDetail({
          ...userDetail,
          [name]: value,
        });
      };
    
      const saveChanges = () => {
        // despachar action para guardar información en el back
        setIsEditing(false);
      };

    return (
        <div>
          <h2>Detalles de mi cuenta</h2>
          <form>
            <div>
              <label for='name'>Nombre</label>
              <input type="text" name="name" value={userDetail.name} onChange={handleChange} disabled={!isEditing}>{userDetail.name}</input>
            </div>

            <div>
              <label>Correo electrónico</label>
              <input type="email" name="email" value={userDetail.email} onChange={handleChange} disabled={!isEditing}>{userDetail.email}</input>
            </div>

            <div>
              <label for='name'>Celular</label>
              <input type="text" name="name" value={userDetail.celular} onChange={handleChange} disabled={!isEditing}>{userDetail.celular}</input>
            </div>

            <div>
              <label>Confirmar contraseña actual</label>
              <input type="password" name="password" onChange={handleChange} disabled={!isEditing}/>
            </div>

            <div>
              <label>Nueva contraseña</label>
              <input type="password" name="password" onChange={handleChange} disabled={!isEditing}/>
            </div>

            <div>
              <label>Confirmar nueva contraseña</label>
              <input type="password" name="password" onChange={handleChange} disabled={!isEditing}/>
            </div>

            {/* No se ha incorporado el dato dirección en el back, pdte para mostrar
            <div>
              <label for='name'>Dirección</label>
              <input type="text" name="address" value={userDetail.address} onChange={handleChange} disabled={!isEditing}>{userDetail.address}</input>
            </div> */}

          </form>

          {isEditing 
          ? ( <button onClick={saveChanges}>Guardar Cambios</button> ) 
          : ( <button onClick={() => setIsEditing(true)}>Editar</button> )
          }
        </div>
      );
}

export default AccountDetail;