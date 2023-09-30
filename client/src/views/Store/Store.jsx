import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cards from "../../components/Cards/Cards";
import { getAllProducts } from "../../redux/Actions/Products/productsActions";
import Filters from '../../components/Filters/Filters'

const Store = () => {
    const dispatch = useDispatch();
    const allProducts = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch]);


    return(
        <div>
            <h4>Filtros y Ordenamientos</h4>
            <Filters/>
            <div>
                <Cards products={allProducts}/>
            </div>
        </div>
    )
}

export default Store;