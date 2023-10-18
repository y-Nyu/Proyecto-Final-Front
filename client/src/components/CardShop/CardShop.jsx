import style from "./CardShop.module.css";
import Rate from "../Rate/Rate";
import { Modal, Button } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import SaleDetail from "../../views/SaleDetail/SaleDetail";

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
  );
};




export default CardShop;
