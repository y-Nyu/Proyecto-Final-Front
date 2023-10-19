import { useEffect, useState } from "react";
import CardsShop from "../../components/CardsShop/CardsShop";
import style from './Sales.module.css';
import { useSelector, useDispatch } from "react-redux";
import { getUserById, getSales, setSalesByUser } from "../../redux/Actions/Users/usersActions";
import { Select } from 'antd';
import jwtDecode from "jwt-decode";

const { Option } = Select;

const Sales = () => {
    const dispatch = useDispatch()
    const { sales } = useSelector(state => state.userLogged)
    const token = sessionStorage.getItem("jwt_session");
    const decodedToken = jwtDecode(token);
    const id = decodedToken.id;
    //Completa info del usuario, especificamente SALES al traer del id esa relación.
    // useEffect(() => {
    //     if (token) {
    //         dispatch(getUserById(id));
    //         dispatch(getSales())
    //         console.log('SALES', sales);
    //         update()
    //       }
    // }, [])

    const allSales = useSelector(state => state.sales);

    // ALMACENAMIENTO COMPRAS
    const [userSales, setUserSales] = useState({
        salesOriginal: [],
        salesCopy: []
    });

    const update = () => {
        try {
        if (allSales.length > 0) {
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
    } catch (error) {
        console.log(error);
    }
}
    useEffect(() => {
        if (token) {
    dispatch(getUserById(id));
    dispatch(getSales())
    update()
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
                {userSales.salesOriginal.map((sale, index) => (
                    <CardsShop key={index} compras={[sale]} />
                ))}
            </div>
        </div>
    );
}

export default Sales;
