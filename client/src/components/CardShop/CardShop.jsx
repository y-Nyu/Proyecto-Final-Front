import { Link } from "react-router-dom";

import { Button } from "antd";

import style from "./CardShop.module.css";

const CardShop = ({ id, total, date }) => {
  return (
    <div className={style.cardContainer}>
      <div className={style.productInfoContainer}>
        <div className={style.productInfo}>
          <strong>N° Factura:</strong> {id}
        </div>
        <div className={style.productInfo}>
          <strong>Fecha:</strong> {date}
        </div>
        <div className={style.productInfo}>
          <strong>Total:</strong> ${total}
        </div>
        <div className={style.productInfo}>
          <Link to={`/compra/${id}`}>
            <Button type="dashed" className={`${style.button}`}>
              <strong>Ver detalles</strong>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
};

export default CardShop;