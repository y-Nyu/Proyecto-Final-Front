import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cards from "../../components/Cards/Cards";
import { getAllProducts } from "../../redux/Actions/Products/productsActions";
import Filters from '../../components/Filters/Filters'
import OrderByName from "../../components/OrderBYName/OrderByName";
import Searchbar from "../../components/SearchBar/SearchBar";

const Store = () => {
    const dispatch = useDispatch();
    const allProducts = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch]);


    return(
        <div>
            <Searchbar />
            <Filters/>
            <OrderByName/>
            <div>
                <Cards products={allProducts}/>
            </div>
        </div>
    )
}

export default Store;