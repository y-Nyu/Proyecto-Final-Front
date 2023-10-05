import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  getCategories,
  filterProducts,
  clearFilters,
} from "../../redux/Actions/Products/productsActions";
import style from "./Filters.module.css";


const Filters = () => {
  const dispatch = useDispatch();
  const allCategories = useSelector((state) => state.categories);

  const prices = [100, 500, 5000, 7500, 10000, 25000];

  const [filters, setFilters] = useState({
    category: undefined,
    price: undefined,
    sort: undefined,
  });

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const handleFilter = (event) => {
    const { name, value } = event.target;
    if (name === "filter") {
      dispatch(filterProducts(value));
    } else dispatch(clearFilters());
  };

  // Filter string es la query que se pasa por la action
  const createFilterString = (filters_obj) => {
    const filtersArr = [];

    for (const key of Object.keys(filters_obj)) {
      console.log("Key: " + key);
      if (filters_obj[key] && filters_obj[key].length > 0) {
        filtersArr.push("" + key + "=" + filters_obj[key]);
      }
    }

    let filterString = "?";

    filterString += filtersArr.join("&");

    return filtersArr.length ? filterString : "";
  };

  const changeMaxPrice = (event) => {
    const price = event.target.value;
    setFilters((prev) => {
      return { ...prev, price };
    });

    const filterString = createFilterString({ ...filters, price });
    dispatch(filterProducts(filterString));
  };

  const changeSort = (event) => {
    const sort = event.target.value;
    setFilters((prev) => {
      return { ...prev, sort };
    });

    const filterString = createFilterString({ ...filters, sort });
    dispatch(filterProducts(filterString));
  };

  return (
    <div className="container">
      <div className="row">
        <nav id="sidebar" className="col-md-3 d-md-block bg-light sidebar">
          <div className="position-sticky">
            <select className="form-control" onChange={handleFilter} name="filter">
              <option value={""}> Categoria </option>
              {allCategories.map((category) => (
                <option value={category.name} key={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <select className="form-control mt-2" onChange={changeMaxPrice}>
              <option value={""}> Precio Max. </option>
              {prices?.map((price, index) => (
                <option value={price} key={index}>
                  ${price} ARS
                </option>
              ))}
            </select>
            <select className="form-control mt-2" onChange={changeSort}>
              <option value={""}> Ordenar por Precio </option>
              <option value={"asc"}>Ascendente</option>
              <option value={"desc"}>Descendente</option>
            </select>
            <button className="btn btn-secondary mt-2" name="clean" onClick={handleFilter}>
              Restablecer filtros
            </button>
          </div>
        </nav>
        <div className="col-md-9">
        </div>
      </div>
    </div>
  );
};

export default Filters;
