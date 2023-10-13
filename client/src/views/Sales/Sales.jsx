import { useEffect, useState } from "react";
import CardsShop from "../../components/CardsShop/CardsShop";
import style from './Sales.module.css'
import { useSelector, useDispatch } from "react-redux";
import { getUserById } from "../../redux/Actions/Users/usersActions";

const Sales = () => {
    const dispatch = useDispatch()
    const userData = useSelector(state => state.userLogged)
    console.log(userData);

    //Completa info del usuario, especificamente SALES al traer del id esa relación.
    useEffect(() => {
        userData && dispatch(getUserById(userData.id))
    }, [])
    
    // ALMACENAMIENTO COMPRAS

    const [sales, setSales] = useState({
        salesOriginal : [],
        salesCopy: []
    })

    // Setteo historico de sales
    useEffect(() => {
        if (userData && userData.sales) {
            const updatedSales = userData.sales
                .map(sale => ({
                    createdAt: sale.createdAt,
                    detail: sale.details[0]
                }))
                .filter(item => item.detail !== undefined); // Filtra los objetos que esten undefined

            setSales({
                salesOriginal: updatedSales,
                salesCopy: updatedSales
            });
        }
    }, [userData]);

    // MANEJO FILTROS / ORDENAMIENTOS
    const [filters, setFilters] = useState({
        productName: ''
    });

    // SEARCH BAR
    const handleChange = (event) => {
        setFilters({
            productName: event.target.value,
        });
        console.log('INPUT');
        console.log(filters.productName);
        if (filters.productName.length === 1){
            setSales({ ...sales, salesOriginal: sales.salesCopy })
        }else{
            filterSalesByProductName()
        }   
    };

    const filterSalesByProductName = () => {

        console.log('SALES ORIGINAL');
        console.log(sales.salesOriginal);
        console.log('SALES COPY');
        console.log(sales.salesCopy);

        // const filteredSales = [...sales.salesCopy].filter((sale) => {
        //     return sale.detail.name.toLowerCase().includes(filters.productName.toLowerCase());
        // });

        // if(filteredSales.length === 0){
        //     setSales({...sales, salesOriginal: sales.salesCopy})
        // }else{
        //     setSales({...sales, salesOriginal: filteredSales})
        // }
         

        // if (filters.productName.length === 0) {
        //     return setSales({ ...sales, salesOriginal: sales.salesCopy })
        // }else{
            const filteredSales = [...sales.salesCopy].filter((sale) => {
                return sale.detail.name.toLowerCase().includes(filters.productName.toLowerCase());
            });
        
            // setSales((prevSales) => ({
            //     ...prevSales,
            //     salesOriginal: filteredSales,
            // }));

            setSales({ ...sales, salesOriginal: filteredSales })

};



    // ORDENAMIENTO

    const [sortOrder, setSortOrder] = useState(""); // Estado para almacenar la selección del usuario

    const sortSalesByAsc = () => {
        const sortedSales = [...sales.salesOriginal].sort((a, b) => {
            return new Date(a.createdAt) - new Date(b.createdAt);
        });

        setSales({ ...sales, salesOriginal: sortedSales });
    };
    
    const sortSalesByDesc = () => {
        const sortedSales = [...sales.salesOriginal].sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
        });
    
        setSales({ ...sales, salesOriginal: sortedSales });
    };

    const handleSortChange = (event) => {
        setSortOrder(event.target.value);
        if (event.target.value === "asc") {
            sortSalesByAsc();
        } else if (event.target.value === "desc") {
            sortSalesByDesc();
        }
    };

    const showAllProducts = () => {
        setFilters({
            productName: '',
        });
        setSales({ ...sales, salesOriginal: sales.salesCopy });
        setSortOrder('')
    };

    return(
        <div className={style.container}>
            <h1 className={style.title}>Mis compras</h1>
            <input type="text" placeholder="Buscar por nombre de producto" value={filters.productName} onChange={handleChange}/>

            <select value={sortOrder} onChange={handleSortChange}>
                <option value="">Seleccionar orden</option>
                <option value="asc">Ascendente</option>
                <option value="desc">Descendente</option>
            </select>

            <button onClick={showAllProducts}>Mostrar todo</button>


    <>
    <CardsShop compras = { sales.salesOriginal } />
    {sales.salesOriginal.length === 0 && (
            <p>No se encontraron resultados para "{filters.productName}".</p>
        )}
    </>
        </div>
    )
}

export default Sales;

// import { useEffect, useState } from "react";
// import CardsShop from "../../components/CardsShop/CardsShop";
// import style from './Sales.module.css'
// import { useSelector, useDispatch } from "react-redux";
// // import jwtDecode from 'jwt-decode'
// import { getUserById, setUserSales } from "../../redux/Actions/Users/usersActions";
// import { searchSalesProducts } from "../../redux/Actions/Products/productsActions";
// import Searchbar from '../../components/SearchBar/SearchBar';


// const Sales = () => {
//     const dispatch = useDispatch()
//     const userData = useSelector(state => state.userLogged)


//     useEffect(() => {
//                 dispatch(getUserById(userData.id))
//                 dispatch(setUserSales(userData.sales))
//             }, [])

//    // SEARCHBAR
//    const userSales = useSelector(state => state.salesByUser)

//    console.log('INFO SALES');
//    console.log(userData);
//      console.log(userSales);
//    const [filters, setFilters] = useState({
//     name: ''
//     });

//     const createFilterString = (filters_obj) => {
//         const filtersArr = [];
    
//         for (const key of Object.keys(filters_obj)) {
//           if (filters_obj[key] !== undefined) {
//             filtersArr.push("" + key + "=" + filters_obj[key]);
//           }
//         }
//         let filterString = "?";
//         filterString += filtersArr.join("&");
//         return filtersArr.length ? filterString : "";
//       };

//    const searchByName = (name) => {
//     setFilters((prev) => ({
//       ...prev,
//       name,
//     }));
//     const filterString = createFilterString({ ...filters, name });
//     dispatch(searchSalesProducts(filterString));
//   };

//   useEffect(() => {
//     const filterString = createFilterString({ ...filters });
//     dispatch(searchSalesProducts(filterString));
//   }, [filters]);

//     return(
//         <div className={style.container}>
//             <h1 className={style.title}>Mis compras</h1>
//             <Searchbar onClick={searchByName} />
//             <CardsShop compras = {filters.name.length > 0 ? userSales : userData.sales}/>
//         </div>
//     )
// }

// export default Sales;