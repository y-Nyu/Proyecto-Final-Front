import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cards from "../../components/Cards/Cards";

const Store = () => {
    const exampleProducts = [
        {
            id: 1,
            name: 'Comida para perros',
            price: 20,
            img: 'https://carrefourar.vtexassets.com/arquivos/ids/256066/7797453000369_02.jpg?v=637986095784470000'
        },
        {
            id: 2,
            name: 'Comida para gatos',
            price: 15,
            img: 'https://jumboargentina.vtexassets.com/arquivos/ids/760156/Alimento-Whiskas-Para-Gatos-Carne-3kg-1-814242.jpg?v=638048145838300000'
        },
        {
            id: 3,
            name: 'Juguete para perros',
            price: 5,
            img: 'https://www.canrock.com.ar/7248-large_default/juguete-hueso-duro-10-cm.jpg'
        },
        {
            id: 4,
            name: 'Juguete para gatos',
            price: 3,
            img: 'https://m.media-amazon.com/images/I/814hdI6xmWL.jpg'
        },
        {
            id: 5,
            name: 'Correa',
            price: 20,
            img: 'https://d22fxaf9t8d39k.cloudfront.net/a7581c515140e1d1105a90aab48c01bed15c9dc5accfbcc4ac828665d532096d6121.jpeg'
        },
        {
            id: 6,
            name: 'Antiparasitario',
            price: 20,
            img: 'https://puppis.vteximg.com.br/arquivos/ids/158473-1000-1000/361043.jpg?v=636014231200300000'
        },
    ]

    return(
        <div>
            <div className="container">
                Hola
            </div>
            <p>Esta es la tienda</p>
            <h4>Filtros y Ordenamientos</h4>
            <div>
                <Cards products={exampleProducts}/>
            </div>
        </div>
    )
}

export default Store;