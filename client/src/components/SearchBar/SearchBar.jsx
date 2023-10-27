import { useState } from "react";
import { getProductByName } from "../../redux/Actions/Products/productsActions";

import style from "./Searchbar.module.css";

function Searchbar({ onClick }) {

  const [ name, setName ] = useState("");
  const [ productFound, setProductFound ] = useState(true);

  const handleChange = (event) => {
    event.preventDefault()
    setName(event.target.value)
    setProductFound(true)
  };

  const handleSearch = async (event) => {
    event.preventDefault()
    const product = await getProductByName(name)

    if (product) {
      onClick(name);
      setProductFound(true)
    } else {
      setProductFound(false) // Product not found
    }
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
      {productFound === false && (
        <p className={style.errorMessage}>Producto no encontrado.</p>
      )}
    </div>
  )
};

export default Searchbar;