import { Link } from "react-router-dom";
import style from './CardShop.module.css'
import Rate from "../Rate/Rate";

const CardShop = ({ id, name, total, quantity, image, date }) => {

  
  return (
    <div className={style.list}>
        <ul className={`list-group ${style.card}`}>

            <div className="card mb-3">

            <div className="row g-0">
                <div className="col-md-4">
                <img src={image} alt="" className="img-fluid rounded-start"/>
                </div>
                <div className="col-md-8">
                <div className="card-body">
                    <Rate />
                    <h5 className="card-title">{name}</h5>
                    <p className="card-text">Cantidad: {quantity}</p>
                    <p className="card-text">Total: {total}</p>
                    <p className="card-text">Fecha compra: {date}</p>
                </div>
                </div>
            </div>
            </div>

        </ul>
    </div>
  )
}

export default CardShop;