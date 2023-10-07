import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  getCategories,
  filterProducts,
  clearFilters,
} from "../../redux/Actions/Products/productsActions";
import style from "./Filters.module.css";

const alphaSortTypes = {
  alfa_asc: "alfa_asc",
  alfa_desc: "alfa_desc",
};

const Filters = () => {
  const dispatch = useDispatch();
  const allCategories = useSelector((state) => state.categories);

  const prices = [100, 500, 5000, 7500, 10000, 25000];

  const [filters, setFilters] = useState({
    category: undefined,
    price: undefined,
    sort: undefined,
  });

//   const [sidebarVisible, setSidebarVisible] = useState(false);

  useEffect(() => {
    dispatch(getCategories());
  }, []);

//   const toggleSidebar = () => {
//     setSidebarVisible(!sidebarVisible);
//   };

  const handleFilter = (event) => {
    const { name, value } = event.target;
    if (name === "filter") {
      setFilters((prev) => {
        return {
          ...prev,
          category: value,
        };
      });
      const filterString = createFilterString({ ...filters, category: value });
      dispatch(filterProducts(filterString));
    } else dispatch(clearFilters());
  };

  // Filter string es la consulta que se pasa a través de la acción
  const createFilterString = (filters_obj) => {
    const filtersArr = [];

    for (const key of Object.keys(filters_obj)) {
      console.log("Clave: " + key);
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

    if (alphaSortTypes[sort]) {
      console.log("EL SORT ES: " + sort);
      const order = sort === alphaSortTypes.alfa_asc;
      console.log("ORDEN ES: " + order);
      dispatch(ordered(order));
      return;
    }

    setFilters((prev) => {
      return { ...prev, sort };
    });

    const filterString = createFilterString({ ...filters, sort });
    dispatch(filterProducts(filterString));
  };

  return (
    <div className="container">
      <div className="row">
        <div className={`col-md-3 d-md-block ${style.sideB} `}>
          {/* Contenido de la barra lateral */}
          <div
            id="sidebar"
            className="sidebar"
          >
            <ul className="navbar-nav d-flex flex-column mt-5 w-100">
              {/* Filtro */}
              <li className="nav-item dropdown w-100">
                <select
                  className="form-control mt-2"
                  onChange={handleFilter}
                  name="filter"
                  style={{ color: "black" }}
                >
                  <option value="" disabled>
                    Categorías
                  </option>
                  {allCategories.map((category) => (
                    <option value={category.name} key={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </li>
              {/* Filtro */}
              <li className="nav-item w-100">
                <select className="form-control mt-2" onChange={changeMaxPrice}>
                  <option
                    value={""}
                    className={`nav-link text-light pl-4 ${style.navLink}`}
                  >
                    Precio Máximo
                  </option>
                  {prices?.map((price, index) => (
                    <option value={price} key={index}>
                      ${price} ARS
                    </option>
                  ))}
                </select>
              </li>
              {/* Ordenamiento */}
              <li>
                <select className="form-control mt-2" onChange={changeSort}>
                  <option
                    value={""}
                    className={`nav-link text-light pl-4 ${style.navLink}`}
                  >
                    Ordenar por
                  </option>
                  <option value={"asc"}>Precio Ascendente</option>
                  <option value={"desc"}>Precio Descendente</option>
                  <option value={alphaSortTypes.alfa_asc}>
                    Alfabético Ascendente
                  </option>
                  <option value={alphaSortTypes.alfa_desc}>
                    Alfabético Descendente
                  </option>
                </select>
              </li>
            </ul>
            <div className="d-flex justify-content-center mt-2"> {/* Agrega estas clases */}
            <button
              className="btn btn-secondary"
              name="clean"
              onClick={handleFilter}
            >
              Restablecer filtros
            </button>
          </div>
          </div>
        </div>
        {/* <div className="col-md-9">
          <button
            className="btn btn-secondary mt-2"
            name="toggleSidebar"
            onClick={toggleSidebar}
          >
            Filtros y Ordenamientos
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default Filters;



// import { useDispatch, useSelector } from 'react-redux'
// import { useEffect, useState } from 'react';
// import { getCategories,
//     filterProducts,
//     clearFilters,
//     ordered
// } from '../../redux/Actions/Products/productsActions'
// import style from "./Filters.module.css"

// const alphaSortTypes = {
//     alfa_asc: "alfa_asc",
//     alfa_desc: "alfa_desc"
// };

// const Filters = () => {
//     const dispatch = useDispatch();

//     const allCategories = useSelector(state=>state.categories);

//     const prices = [100, 500, 5000, 7500, 10000, 25000];

//     const [filters, setFilters] = useState({
//         category: undefined,
//         price: undefined,
//         sort: undefined,
//     })

//     useEffect(()=>{
//         dispatch(getCategories())
//     },[]);

//     const handleFilter = (event) => {
//         const {name, value} = event.target
//         if(name === 'filter') {
//             setFilters(prev => {
//                 return {
//                     ...prev,
//                     category: value
//                 }
//             })
//             const filterString = createFilterString({...filters, category: value});
//             dispatch(filterProducts(filterString))
//         }
//         else dispatch(clearFilters())
//     };

//   // Filter string es la query que se pasa por la action
//   const createFilterString = (filters_obj) => {
//     const filtersArr = [];

//         for(const key of Object.keys(filters_obj))
//         {
//             console.log("Key: " + key);
//             if(filters_obj[key] && filters_obj[key].length > 0)
//             {
//                 filtersArr.push("" + key + "=" + filters_obj[key]);
//             }
//         }
//         let filterString = "?";
//         filterString += filtersArr.join("&");
//         return filtersArr.length ? filterString : "";
//     }

//   const changeMaxPrice = (event) => {
//     const price = event.target.value;
//     setFilters((prev) => {
//       return { ...prev, price };
//     });

//     const filterString = createFilterString({ ...filters, price });
//     dispatch(filterProducts(filterString));
//   };

//     const changeSort = (event) => {
//         const sort = event.target.value;

//         if(alphaSortTypes[sort])
//         {
//             console.log("EL SORT ES: " + sort);
//             const order = (sort === alphaSortTypes.alfa_asc);
//             console.log("ORDER ES: " + order);
//             dispatch(ordered(order))
//             return;
//         }

//         setFilters(prev => {return {...prev, sort}});

//         const filterString = createFilterString({...filters, sort});
//         dispatch(filterProducts(filterString))
//     }

//     return(
//         <div className={`sidebar `}>

//             <select onChange={handleFilter} name='filter'>
//                 <option value={''}> Categoria </option>
//                 {
//                     allCategories.map(category=>
//                         <option
//                             value={category.name} key={category.id}>{category.name}
//                         </option>
//                 )}
//             </select>
//             <select className="form-control mt-2" onChange={changeMaxPrice}>
//               <option value={""}> Precio Max. </option>
//               {prices?.map((price, index) => (
//                 <option value={price} key={index}>
//                   ${price} ARS
//                 </option>
//               ))}
//             </select>
//             <select className="form-control mt-2" onChange={changeSort}>
//                 <option value={''}> Ordenar por... </option>
//                 <option value={"asc"}>Precio Asc.</option>
//                 <option value={"desc"}>Precio Desc.</option>
//                 <option value={alphaSortTypes.alfa_asc}>Alfabetico Asc. </option>
//                 <option value={alphaSortTypes.alfa_desc}>Alfabetico Desc.</option>
//             </select>
//             <button className="btn btn-secondary mt-2" name="clean" onClick={handleFilter}>
//               Restablecer filtros
//             </button>

//         <div className="col-md-9"></div>
//     </div>
//   );
// };

// export default Filters;
