import { useEffect, useState } from "react";
import PuffLoader from "react-spinners/PuffLoader";

import Card from "../Card/Card";
import style from "./cards.module.css";

const Cards = ({ products }) => {
    const [ dataLoaded, setDataLoaded ] = useState(false);

    useEffect(() => {
        if (products.length !== 0) {          
            setDataLoaded(true)
        } else {
            setDataLoaded(false)
        }
      }, [products]);

    return(
        <div className={style["container"]}>
            <div className="row row-cols-4 g-4">             
                { dataLoaded 
                ? (
                    Array.isArray(products) &&  products.map((product) => {
                        return (
                            <Card
                                key={product.id}
                                id={product.id}
                                name={product.name}
                                image={product.image}
                                price={product.price}
                                brand={product.brand}
                                description={product.description}
                                active={product.active}
                                stock={product.stock}
                            />
                        )
                    })
                    )
                : 
                <div className={style.loading}>
                    <PuffLoader size={150} data-testid="loader" />
                </div>
                }
            </div>
        </div>
    )
};

export default Cards;