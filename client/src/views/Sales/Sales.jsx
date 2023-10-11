import { useEffect } from "react";
import CardsShop from "../../components/CardsShop/CardsShop";
import style from './Sales.module.css'
import { useSelector, useDispatch } from "react-redux";
// import jwtDecode from 'jwt-decode'
import { getUserById } from "../../redux/Actions/Users/usersActions";
import Rate from '../../components/Rate/Rate'

const Sales = () => {
    const dispatch = useDispatch()
    const userId = useSelector(state => state.userLogged.id)
  
    useEffect(() => {
                // dispatch(getSales())
                dispatch(getUserById(userId))
            }, [])

    const sales = useSelector(state => state.userLogged.sales)

    // const sales = useSelector(state => state.userLogged.sales)

    
   const fecha = sales[0].createdAt.slice(0,16)
   console.log(fecha);


    return(
        <div>
            <h1 className={style.title}>Mis compras</h1>

            <CardsShop compras = {sales}/>
            <Rate/>
            {/* <CardsShop compras={user.sales}/> */}
        </div>
    )
}

export default Sales;



// const Sales = () => {

//     const token = sessionStorage.getItem("jwt_session")
//     const { id } = jwtDecode(token)
//     const user = useSelector(state => state.userLogged)
//     const dispatch = useDispatch()
//     const sales = useSelector(state => state.sales)
//     useEffect(() => {
//         dispatch(getSales())
//         dispatch(getUserById(id))
//     }, [])
    
//     const compras = [
//         {
//             date: '05/10/2023',
//             id: 'vslfnj23498ad',
//             total: 23.342,
//             name: 'Pelota',
//             units: 3,
//             image: "image"
//         },
//         {
//             date: '24/11/2024',
//             id: 'lñajasfdasd234',
//             total: 10.424,
//             name: 'Comida',
//             units: 1,
//             image: "image"
//         }
//     ]

//     return(
//         <div>
//             <h1 className={style.title}>Mis compras</h1>
//             <CardsShop compras={compras}/>
//             <Rate/>
//             {/* <CardsShop compras={user.sales}/> */}
//         </div>
//     )
// }