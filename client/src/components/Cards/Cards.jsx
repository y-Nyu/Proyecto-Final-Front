import Card from "../Card/Card";
import { useEffect, useState } from "react";
import style from "./Cards.module.css";
import PuffLoader from "react-spinners/PuffLoader";

const Cards = ({ products }) => {
    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {
        if (products.length !== 0) {          
            setDataLoaded(true); 
        } else {
            setDataLoaded(false);
        }
      }, [products]);
    
      // ESTA CLASS "row row-cols-4 g-4" PERMITE QUE SE LIMITEN 4 CARDS(COLUMNAS) POR FILA
    return(
        <div className={style["container"]}>
            <div className="row row-cols-4 g-4">             
                { dataLoaded 
                ? (
                    products?.map((product) => {
                        return (
                            <Card
                                key={product.id}
                                id={product.id}
                                name={product.name}
                                image={product.image}
                                price={product.price}
                            />
                        )
                    })
                    )
                : 
                <PuffLoader size={150} data-testid="loader" />
                }
            </div>
        </div>
    )
};

export default Cards;