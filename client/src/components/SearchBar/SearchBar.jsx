import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  searchProducts,
  searchUsers,
  setSearchType,
} from "../../redux/actions";

function Searchbar(component) {
  
  const dispatch = useDispatch();
  const searchType = useSelector((state) => state.searchType);
  const [info, setInfo] = useState("");
  dispatch(setSearchType(component));

  const HandleChange = (event) => {
    setInfo(() => {
      const searched = event.target.value;
      console.log(searchType);
      if (searchType === "products") {
        dispatch(searchProducts(searched));
        return searched;
      } else if (searchType === "users") {
        dispatch(searchUsers(searched));
        return searched;
      }
    });
  };
  return (
    <div>
      <input type="search" value={info} onChange={HandleChange} />
    </div>
  );
}

export default Searchbar;