import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories, filterProducts, clearFilters, ordered } from '../../redux/Actions/Products/productsActions';
import { Select, Button, Menu } from 'antd';
import { FilterOutlined , AppstoreOutlined, UnorderedListOutlined } from '@ant-design/icons';
import style from "./Filters.module.css";
import Searchbar from '../SearchBar/SearchBar';

const { Option } = Select;
const { SubMenu } = Menu;

const alphaSortTypes = {
  alfa_asc: "alfa_asc",
  alfa_desc: "alfa_desc",
};

const Filters = () => {
  const dispatch = useDispatch();
  const allCategories = useSelector((state) => state.categories);

  const prices = [5000, 7500, 10000, 25000];

  const [filters, setFilters] = useState({
    category: undefined,
    price: undefined,
    sort: undefined,
    name: undefined,
  });

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const handleFilter = (value, name) => {
    if (name === 'filter') {
      setFilters((prev) => ({
        ...prev,
        category: value,
      }));
      const filterString = createFilterString({ ...filters, category: value });
      dispatch(filterProducts(filterString));
    } else if (name === 'clean') {
      setFilters({
        category: undefined,
        price: undefined,
        sort: undefined,
        name: undefined,
      });
      dispatch(clearFilters());
    }
  };

  const createFilterString = (filters_obj) => {
    const filtersArr = [];

    for (const key of Object.keys(filters_obj)) {
      if (filters_obj[key] !== undefined) {
        filtersArr.push("" + key + "=" + filters_obj[key]);
      }
    }
    let filterString = "?";
    filterString += filtersArr.join("&");
    return filtersArr.length ? filterString : "";
  };

  const changeMaxPrice = (value) => {
    setFilters((prev) => ({
      ...prev,
      price: value,
    }));
    const filterString = createFilterString({ ...filters, price: value });
    dispatch(filterProducts(filterString));
  };

  const changeSort = (value) => {
    if (alphaSortTypes[value]) {
      const order = value === alphaSortTypes.alfa_asc;
      dispatch(ordered(order));
    }

    setFilters((prev) => ({
      ...prev,
      sort: value,
    }));

    const filterString = createFilterString({ ...filters, sort: value });
    dispatch(filterProducts(filterString));
  };

  const searchByName = (name) => {
    setFilters((prev) => ({
      ...prev,
      name,
    }));
    const filterString = createFilterString({ ...filters, name });
    dispatch(filterProducts(filterString));
  };

  return (
    <div className={style.container}>
      <Searchbar onClick={searchByName} />
      <div className={`container ${style.container}`}>
        <div className="row">
          <div className={`col-md-3 d-md-block ${style.sideB}`}>
            <div id="sidebar" className={`sidebar`}>
              <Menu mode="vertical" style={{ width: 256 }} className={`${style.sidebar}`}>
                <SubMenu key="sub1" title={<span><AppstoreOutlined /> Categorías</span>}>
                  <Menu.Item key="all" onClick={() => handleFilter(undefined, 'filter')}>Todos</Menu.Item>
                  {allCategories.length > 0 ? (
                    allCategories.map((category) => (
                      <Menu.Item key={category.name} onClick={() => handleFilter(category.name, 'filter')}>
                        {category.name}
                      </Menu.Item>
                    ))
                  ) : (
                    <Menu.Item>Cargando categorías...</Menu.Item>
                  )}
                </SubMenu>
                <SubMenu key="sub2" title={<span><FilterOutlined /> Precio Máximo</span>}>
                  <Menu.Item key="all" onClick={() => handleFilter(undefined, 'filter')}>Todos</Menu.Item>
                  {prices.map((price, index) => (
                    <Menu.Item key={price} onClick={() => changeMaxPrice(price)}>
                      ${price} ARS
                    </Menu.Item>
                  ))}
                </SubMenu>
                <SubMenu key="sub3" title={<span><UnorderedListOutlined /> Ordenar por</span>}>
                  <Menu.Item key="asc" onClick={() => changeSort('asc')}>Precio Ascendente</Menu.Item>
                  <Menu.Item key="desc" onClick={() => changeSort('desc')}>Precio Descendente</Menu.Item>
                  <Menu.Item key={alphaSortTypes.alfa_asc} onClick={() => changeSort(alphaSortTypes.alfa_asc)}>Alfabético Ascendente</Menu.Item>
                  <Menu.Item key={alphaSortTypes.alfa_desc} onClick={() => changeSort(alphaSortTypes.alfa_desc)}>Alfabético Descendente</Menu.Item>
                </SubMenu>
              </Menu>
              <div className="d-flex justify-content-center mt-2">
                <Button
                  className={`${style.btnSecondary}`}
                  name="clean"
                  onClick={() => handleFilter(undefined, 'clean')}
                >
                  Restablecer filtros
                </Button>
              </div>
            </div>
          </div>
        </div>
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
// import Searchbar from '../SearchBar/SearchBar';
// import style from "./Filters.module.css";

// const alphaSortTypes = {
//   alfa_asc: "alfa_asc",
//   alfa_desc: "alfa_desc",
// };

// const Filters = () => {
//   const dispatch = useDispatch();
//   const allCategories = useSelector((state) => state.categories);
    
//     const prices = [5000, 7500, 10000, 25000];
    
//     const [filters, setFilters] = useState({
//         category: undefined,
//         price: undefined,
//         sort: undefined,
//         name: undefined,
//     })

//      // Agregar estado para controlar la visibilidad de los filtros y el botón "Restablecer filtros"
//   const [filtersVisible, setFiltersVisible] = useState(false);

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

//       for(const key of Object.keys(filters_obj))
//       {
//           console.log("Key: " + key);
//           if(filters_obj[key] && filters_obj[key].length > 0)
//           {
//               filtersArr.push("" + key + "=" + filters_obj[key]);
//           }
//       }
//       let filterString = "?";
//       filterString += filtersArr.join("&");
//       return filtersArr.length ? filterString : "";
//     }

//   const toggleFiltersVisibility = () => {
//     setFiltersVisible(!filtersVisible);
//   };

//    // Definir las funciones changeMaxPrice y changeSort
//    const changeMaxPrice = (event) => {
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
//             const order = (sort === alphaSortTypes.alfa_asc);
//             dispatch(ordered(order))
//             return;
//         }

//         setFilters(prev => {return {...prev, sort}});
        
//         const filterString = createFilterString({...filters, sort});
//         dispatch(filterProducts(filterString))
//     }

//     const searchByName = (name) => {
//         setFilters(prev => {return {...prev, name}});
//         const filterString = createFilterString({...filters, name});
        
//         dispatch(filterProducts(filterString));
//     }

//     return(
//       <div className="container ">
//         <Searchbar  onClick={searchByName} />
//         <div className="row">
//         <div className={`col-md-3 d-md-block ${style.sideB}`}>
//         <div id="sidebar" className={`sidebar ${filtersVisible ? style.visible : ''}`}>
//         <div className="d-flex justify-content-center mt-2">
//               <button
//                 className="btn btn-outline-primary"
//                 name="toggleFilters"
//                 onClick={toggleFiltersVisibility}
//               >
//                 Filtros y Ordenamientos
//               </button>
//             </div>
//             {filtersVisible && (
//               <div>
//                 <ul className="navbar-nav d-flex flex-column mt-5 w-100">
//               {/* Filtro */}
//               <li className="nav-item dropdown w-100">
//                 {allCategories.length > 0 ? (
//                   <select
//                     className="form-control mt-2"
//                     onChange={handleFilter}
//                     name="filter"
//                     style={{ color: "black" }}
//                   >
//                     <option value="" disabled selected hidden>
//                       Categorías
//                     </option>
//                     {allCategories.map((category) => (
//                       <option value={category.name} key={category.id}>
//                         {category.name}
//                       </option>
//                     ))}
//                   </select>
//                 ) : (
//                   <p>Cargando categorías...</p>
//                 )}
//               </li>
//               {/* Filtro */}
//               <li className="nav-item w-100">
//                 <select className="form-control mt-2" onChange={changeMaxPrice}>
//                   <option
//                     value={""}
//                     className={`nav-link text-light pl-4 ${style.navLink}`}
//                   >
//                     Precio Máximo
//                   </option>
//                   {prices?.map((price, index) => (
//                     <option value={price} key={index}>
//                       ${price} ARS
//                     </option>
//                   ))}
//                 </select>
//               </li>
//               {/* Ordenamiento */}
//               <li>
//                 <select className="form-control mt-2" onChange={changeSort}>
//                   <option
//                     value={""}
//                     className={`nav-link text-light pl-4 ${style.navLink}`}
//                   >
//                     Ordenar por
//                   </option>
//                   <option value={"asc"}>Precio Ascendente</option>
//                   <option value={"desc"}>Precio Descendente</option>
//                   <option value={alphaSortTypes.alfa_asc}>
//                     Alfabético Ascendente
//                   </option>
//                   <option value={alphaSortTypes.alfa_desc}>
//                     Alfabético Descendente
//                   </option>
//                 </select>
//               </li>
//               </ul>
//                 <div className="d-flex justify-content-center mt-2">
//                   <button
//                     className="btn btn-secondary"
//                     name="clean"
//                     onClick={handleFilter}
//                   >
//                     Restablecer filtros
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Filters;