import style from './CardShop.module.css'
import Rate from "../Rate/Rate";
import { Modal, Button } from 'antd';
import { useState } from "react";
import { useSelector } from 'react-redux'
import axios from 'axios';
import { Link } from "react-router-dom";
import SaleDetail from '../../views/SaleDetail/SaleDetail';

const CardShop = ({ id, total, date }) => {
  
  return (
    <div className={style.list}>
      <ul className={`list-group ${style.card}`}>
        <div className="card mb-3">
          <div className="row g-0">
              <div className="card-body col-md-12">
                <p className="card-text">No. Factura: {id}</p>
                <p className="card-text">Fecha: {date}</p>
                <p className="card-text">Total: {total} ARS</p>
              </div>

              <Link to={`/compra/${id}`}><button type="button" className="btn btn-primary" > Ver detalles </button></Link>
            
          </div>
        </div>
      </ul >
    </div>
  )
};

export default CardShop;
