import { useEffect, useState } from "react";
import CardsShop from "../../components/CardsShop/CardsShop";
import style from './Sales.module.css';
import { useSelector, useDispatch } from "react-redux";
import { getUserById, getSales, setSalesByUser } from "../../redux/Actions/Users/usersActions";
import { Select } from 'antd';

const { Option } = Select;

const Sales = () => {
    const dispatch = useDispatch();
    const { id, sales } = useSelector(state => state.userLogged);

    // Completa info del usuario, específicamente SALES al traer del id esa relación.
    useEffect(() => {
        dispatch(getSales());
        id && dispatch(getUserById(id));
    }, []);

    const allSales = useSelector(state => state.sales);

    // ALMACENAMIENTO COMPRAS
    const [userSales, setUserSales] = useState({
        salesOriginal: [],
        salesCopy: []
    });

    useEffect(() => {
        if (allSales) {
            const salesData = allSales.filter(element => element.iduser === id);

            if (salesData) {
                const organizedData = salesData.map(data => ({
                    date: data.createdAt,
                    id: data.id,
                    idUser: data.iduser,
                    total: data.details[0].total,
                    products: data.details[0].products.map(product => ({
                        productId: product.id,
                        name: product.name,
                        image: product.image,
                        unitPrice: product.price,
                        quantity: product.quantity
                    }))
                }));
                setUserSales({ salesOriginal: organizedData, salesCopy: organizedData });
                dispatch(setSalesByUser(organizedData));
            }
        }
    }, [sales]);

    // ORDENAMIENTO
    const [sortOrder, setSortOrder] = useState(""); // Estado para almacenar la selección del usuario

    const sortSalesByAsc = () => {
        const sortedSales = [...userSales.salesOriginal].sort((a, b) => {
            return new Date(a.date) - new Date(b.date);
        });
        setUserSales({ ...userSales, salesOriginal: sortedSales });
    };

    const sortSalesByDesc = () => {
        const sortedSales = [...userSales.salesOriginal].sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
        });
        setUserSales({ ...userSales, salesOriginal: sortedSales });
    };

    const handleSortChange = (value) => {
        setSortOrder(value);
        if (value === "asc") {
            sortSalesByAsc();
        } else if (value === "desc") {
            sortSalesByDesc();
        }
    };

    return (
        <div className={style.container}>
            <h2 className={style.title}><strong><ins>Mis compras</ins></strong></h2>
            <div className={style.inputContainer}>
                <Select
                    style={{ width: 200, marginRight: '16px' }}
                    placeholder="Ordenar por fecha"
                    onChange={handleSortChange}
                >
                    <Option value="asc">Ascendente</Option>
                    <Option value="desc">Descendente</Option>
                </Select>
            </div>
            <div className={style.cardsContainer}>
                {userSales.salesOriginal && userSales.salesOriginal.map((sale, index) => (
                    <CardsShop key={index} compras={[sale]} />
                ))}
            </div>
        </div>
    );
}

export default Sales;





// import { useEffect, useState } from "react";
// import CardsShop from "../../components/CardsShop/CardsShop";
// import style from './Sales.module.css'
// import { useSelector, useDispatch } from "react-redux";
// import { getUserById, getSales, setSalesByUser } from "../../redux/Actions/Users/usersActions";
// import { Input, Select, Button, Row, Col } from 'antd';

// const Sales = () => {
//     const dispatch = useDispatch()
//     const { id, sales } = useSelector(state => state.userLogged)

//     //Completa info del usuario, especificamente SALES al traer del id esa relación.
//     useEffect(() => {
//         dispatch(getSales())
//         id && dispatch(getUserById(id))
//     }, [])

//     const allSales = useSelector(state => state.sales)
//     console.log('TODAS COMPRAS', allSales);
    
//     // ALMACENAMIENTO COMPRAS

//     const [userSales, setUserSales] = useState({
//         salesOriginal : [],
//         salesCopy: []
//     })

//     let salesData
//     useEffect(() => {
//         if(allSales){
//             salesData = allSales.filter(element => element.iduser === id)
//             console.log('COMPRAS USUARIO', salesData);

//             if(salesData){
//                 const organizedData = salesData.map(data => ({
//                     date: data.createdAt,
//                     id: data.id,
//                     idUser: data.iduser,
//                     total: data.details[0].total,
//                     products : data.details[0].products.map(product => ({
//                         productId: product.id,
//                         name: product.name,
//                         image: product.image,
//                         unitPrice: product.price,
//                         quantity: product.quantity
//                     }))                
//                 }))
//                 setUserSales({ salesOriginal: organizedData, salesCopy: organizedData });   
//                 dispatch(setSalesByUser(organizedData))       
//             }
//             console.log('ORIGINAL STATE', userSales.salesOriginal);
//             console.log('COPY STATE', userSales.salesCopy);
//         } 
//     }, [sales])
    


//     // ORDENAMIENTO

//     const [sortOrder, setSortOrder] = useState(""); // Estado para almacenar la selección del usuario

//     const sortSalesByAsc = () => {
//         const sortedSales = [...userSales.salesOriginal].sort((a, b) => {
//             return new Date(a.date) - new Date(b.date);
//         });

//         setUserSales({ ...userSales, salesOriginal: sortedSales });
//     };
    
//     const sortSalesByDesc = () => {
//         const sortedSales = [...userSales.salesOriginal].sort((a, b) => {
//             return new Date(b.date) - new Date(a.date);
//         });
    
//         setUserSales({ ...userSales, salesOriginal: sortedSales });
//     };

//     const handleSortChange = (event) => {
//         const { value } = event.target
//             setSortOrder(value);
//             if (value === "asc") {
//                 sortSalesByAsc();
//             } else if (value === "desc") {
//                 sortSalesByDesc();
//             }        
//     };

//     return (
//         <div className={style.container}>
//             <h2 className={style.title}><strong><ins>Mis compras</ins></strong></h2>
//             <div className={style.inputContainer}>

//                 <select onChange={handleSortChange} style={{ width: 200, marginRight: '16px' }}>
//                     <option value="">Orden por fecha</option>
//                     <option value="asc">Ascendente</option>
//                     <option value="desc">Descendente</option>
//                 </select>

//             </div>
//             <>
//                 <CardsShop compras={userSales.salesOriginal && userSales.salesOriginal} />
//             </>
//         </div>
//     )
// }

// export default Sales;






















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
