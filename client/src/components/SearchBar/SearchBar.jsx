import style from "./Searchbar.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getProductByName } from "../../redux/Actions/Products/productsActions";
// import { searchUsers, setSearchType } from '../../redux/Actions/Users/usersActions';

function Searchbar({ onClick }) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleChange = (event) => {
    event.preventDefault();
    setName(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    onClick(name); 
  };

  return (
    <div className={`container mt-3 ${style.searchContainer}`}>
      <div className={`input-group mb-3 ${style.inputGroup}`}>
        <input
          type="search"
          className={`form-control ${style.searchInput}`}
          placeholder="Buscar producto"
          aria-label="Buscar producto"
          aria-describedby="button-addon2"
          onChange={(event) => {
            handleChange(event);
          }}
          value={name}
        />
        <div className={`input-group-append ${style.buttonGroup}`}>
          <button
            className={`btn ${style.btnCustom}`}
            type="button"
            id="button-addon2"
            onClick={(event) => {
              handleSearch(event);
            }}
          >
            <i className="bi bi-search"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Searchbar;






// import style from "./Searchbar.module.css";
// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { getProductByName } from "../../redux/Actions/Products/productsActions";
// import { Modal, Button  } from 'antd'; 


// function Searchbar({ onClick }) {
//   const dispatch = useDispatch();
//   const [name, setName] = useState("");
//   const [isModalVisible, setIsModalVisible] = useState(false); 
//   const [errorMessage, setErrorMessage] = useState("");
//   const [productoEncontrado, setProductoEncontrado] = useState(false);

//   const handleChange = (event) => {
//     event.preventDefault();
//     setName(event.target.value);
//   };

//   const handleSearch = (event) => {
//     event.preventDefault();
//     try {
//       const product = await dispatch(getProductByName(name));

//       if (product) {
//         // Producto encontrado
//         setProductoEncontrado(true);
//         onClick(name);
//       } else {
//         // Producto no encontrado
//         setErrorMessage("Producto no encontrado");
//         setIsModalVisible(true);
//       }
//     } catch (error) {
//       // Manejar errores de búsqueda
//       console.error(error);
//     }
//   };

//   const closeModal = () => {
//     setIsModalVisible(false);
//     setErrorMessage(""); // Limpiar el mensaje de error al cerrar el modal
//   };

//   return (
//     <div>
//       <div>
//         <input
//           type="search"
//           placeholder="Buscar producto"
//           onChange={(event) => handleChange(event)}
//           value={name}
//         />
//         <button onClick={(event) => handleSearch(event)}>Buscar</button>
//       </div>

//       <Modal
//         title="Error"
//         visible={isModalVisible}
//         onOk={closeModal}
//         onCancel={closeModal}
//         footer={[
//           <Button key="ok" onClick={closeModal}>
//             OK
//           </Button>
//         ]}
//       >
//         <p>{errorMessage}</p>
//       </Modal>
//     </div>
//   );
// }

// export default Searchbar;
