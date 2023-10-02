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





// function Searchbar(component) {
//  const dispatch = useDispatch();
//   const searchType = useSelector((state) => state.searchType);
//   const [info, setInfo] = useState("");
//   dispatch(setSearchType(component));

//   const HandleChange = (event) => {
//     setInfo(() => {
//       const searched = event.target.value;
//       console.log(searchType);
//       if (searchType === "products") {
//         dispatch(searchProducts(searched));
//         return searched;
//       } else if (searchType === "users") {
//         dispatch(searchUsers(searched));
//         return searched;
//       }
//     });
//   };
//   return (
//     <div>
//       <input type="search" value={info} onChange={HandleChange} />
//     </div>
//   );