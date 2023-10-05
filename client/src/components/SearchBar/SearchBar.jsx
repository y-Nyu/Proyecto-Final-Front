import { useState } from "react";
import { useDispatch } from "react-redux";
import { getProductByName } from '../../redux/Actions/Products/productsActions';
// import { searchUsers, setSearchType } from '../../redux/Actions/Users/usersActions';

function Searchbar() {
  const dispatch = useDispatch()
  const [name, setName] = useState()
  
  
  const handleChange = (event) => {
      event.preventDefault()
      setName(event.target.value)
  };
  
  const handleSearch = (event) => {
      event.preventDefault()
      dispatch(getProductByName(name))
      setName("")
  };
  
  return (
      <div>
          <h4>Buscar Producto</h4>
          <input onChange={(event) => {handleChange(event)}} type="search" value={name}/>
          <button onClick={(event) => {handleSearch(event)}}>Buscar{""}</button>
      </div>
  )
};

export default Searchbar;



