import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cards from "../../components/Cards/Cards";
import { getAllProducts } from "../../redux/Actions/Products/productsActions";

const Store = () => {
    const dispatch = useDispatch();
    const allProducts = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch]);


    return(
        <div>
            <div className="container">
                Hola
            </div>
            <p>Esta es la tienda</p>
            <h4>Filtros y Ordenamientos</h4>
            <div>
                <Cards products={allProducts}/>
            </div>
        </div>
    )
}

export default Store;