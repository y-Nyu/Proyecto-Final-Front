import { useEffect, useState } from "react";
import CardsShop from "../../components/CardsShop/CardsShop";
import style from "./Sales.module.css";
import { useSelector, useDispatch } from "react-redux";
import {
  getUserById,
  getSales,
  setSalesByUser,
} from "../../redux/Actions/Users/usersActions";
import { Input, Select, Button } from "antd";
import jwtDecode from "jwt-decode";

const Sales = () => {
  const dispatch = useDispatch();
  const { sales } = useSelector((state) => state.userLogged);
  const token = sessionStorage.getItem("jwt_session");
  const decodedToken = jwtDecode(token);
  const id = decodedToken.id;
  //Completa info del usuario, especificamente SALES al traer del id esa relación.
  useEffect(() => {
    dispatch(getSales());
    if (token) {
      dispatch(getUserById(id));
    }
  }, [dispatch]);

  const allSales = useSelector((state) => state.sales);
  console.log("TODAS COMPRAS", allSales);

  // ALMACENAMIENTO COMPRAS

  const [userSales, setUserSales] = useState({
    salesOriginal: [],
    salesCopy: [],
  });

  let salesData;
  useEffect(() => {
    if (allSales) {
      salesData = allSales.filter((element) => element.iduser === id);
      console.log("COMPRAS USUARIO", salesData);

      if (salesData) {
        const organizedData = salesData.map((data) => ({
          date: data.createdAt,
          id: data.id,
          idUser: data.iduser,
          total: data.details[0].total,
          products: data.details[0].products.map((product) => ({
            productId: product.id,
            name: product.name,
            image: product.image,
            unitPrice: product.price,
            quantity: product.quantity,
          })),
        }));
        setUserSales({
          salesOriginal: organizedData,
          salesCopy: organizedData,
        });
        dispatch(setSalesByUser(organizedData));
      }
      console.log("ORIGINAL STATE", userSales.salesOriginal);
      console.log("COPY STATE", userSales.salesCopy);
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

  const handleSortChange = (event) => {
    const { value } = event.target;
    setSortOrder(value);
    if (value === "asc") {
      sortSalesByAsc();
    } else if (value === "desc") {
      sortSalesByDesc();
    }
  };

  return (
    <div className={style.container}>
      <h2 className={style.title}>
        <strong>
          <ins>Mis compras</ins>
        </strong>
      </h2>
      <div className={style.inputContainer}>
        <select
          onChange={handleSortChange}
          style={{ width: 200, marginRight: "16px" }}
        >
          <option value="">Orden por fecha</option>
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>
      </div>
      <>
        <CardsShop
          compras={userSales.salesOriginal && userSales.salesOriginal}
        />
      </>
    </div>
  );
};

export default Sales;
