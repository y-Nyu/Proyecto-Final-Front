import style from './SaleDetail.module.css';
import { Link } from "react-router-dom";
import { Button, Modal } from 'antd';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Rate from '../../components/Rate/Rate';

const SaleDetail = () => {
  const { id } = useParams();
  const salesData = useSelector(state => state.salesByUser);
  let detail;

  useEffect(() => {
    if (salesData !== undefined) {
      detail = salesData[0].filter(element => element.id == id);
      setComment({ ...comment, userId: detail[0].idUser });
      setSaleDetail({ ...saleDetail, idSale: detail[0].id, date: detail[0].date, total: detail[0].total, products: detail[0].products });
      setProductsState({ productsOriginal: detail[0].products, productsCopy: detail[0].products });
    }
  }, []);

  const [comment, setComment] = useState({
    userId: '',
    productId: '',
    text: '',
    ratingReset: ''
  });

  const [saleDetail, setSaleDetail] = useState({
    idSale: '',
    date: '',
    total: '',
    products: []
  });

  const [productsState, setProductsState] = useState({
    productsOriginal: [],
    productsCopy: []
  });

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = (productId) => {
    setComment({
      ...comment,
      productId: productId,
      ratingReset: false
    });
    setIsModalVisible(true);
  }

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setComment({
      ...comment,
      [name]: value,
    });
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    axios.post("https://pf-back-deploy.onrender.com/comments", comment)
      .then(usrRes => {
        alert('Comentario enviado exitosamente');
        setComment({ ...comment, text: '', ratingReset: true });
        setIsModalVisible(false);
      })
      .catch(error => {
        console.log(error.response.data.error);
      });
  };

  const [filters, setFilters] = useState({
    productName: ''
  });

  const searchHandleChange = (event) => {
    const { value } = event.target;
    setFilters({ ...filters, productName: value });
    if (filters.productName.length === 1) {
      setProductsState({ ...productsState, productsOriginal: productsState.productsCopy });
    } else {
      filterSalesByProductName();
    }
  };

  const filterSalesByProductName = () => {
    const filteredProducts = [...productsState.productsCopy].filter((product) => {
      return product.name.toLowerCase().includes(filters.productName.toLowerCase());
    });
    setProductsState({ ...productsState, productsOriginal: filteredProducts });
  };

  const showAllProducts = () => {
    setFilters({
      productName: '',
    });
    setProductsState({ ...productsState, productsOriginal: productsState.productsCopy });
    setSortOrder('');
  };

  return (
    <div className={style.saleDetailContainer}>
      <div className={style.topContainer}>
        <Link to={'/compras'}>
        <Button type="dashed"  className={` ${style.button}`}>
           <strong>Regresar</strong>  
          </Button>
        </Link>
        <div className={style.buttonContainer}>
          <input
            type="text"
            placeholder="Buscar por nombre de producto"
            value={filters.productName}
            onChange={searchHandleChange}
            className={`form-control ${style.input}`} 
          />
        </div>
        <Button type="dashed" className={` ${style.button}`} onClick={showAllProducts}>
            <strong>Mostrar todo</strong>
          </Button>
      </div>

      <div className={style.productInfoContainer}>
  <div className={`${style.productInfo} ${style.productInfoGrayBackground}`}>
    <strong>N° Factura:</strong> {saleDetail.idSale}
  </div>
  <div className={`${style.productInfo} ${style.productInfoGrayBackground}`}>
    <strong>Fecha de la compra:</strong> {saleDetail.date.slice(0, 10)}
  </div>
  <div className={`${style.productInfo} ${style.productInfoGrayBackground}`}>
    <strong>Total:</strong> ${saleDetail.total}
  </div>
</div>



      {productsState.productsOriginal?.map((product) => {
        return (
          <div key={product.productId} className={style.productInfoContainer}>
            <div className={style.productInfo}>
            <div className={style.productImage}>
              <img src={product.image} alt={product.name} />
            </div>
            </div>
            <div className={style.productInfo}>
              <strong>Producto:</strong> {product.name}
            </div>
            <div className={style.productInfo}>
              <strong>Precio unitario:</strong> ${product.unitPrice}
            </div>
            <div className={style.productInfo}>
              <strong>Cantidad:</strong> {product.quantity}
              <div>
            <button type="button" className="btn btn-primary" datatoggle="modal" data-target="#exampleModalScrollable" onClick={() => showModal(product.productId)}> Calificar producto </button>
            <Modal title="Califica el producto" open={isModalVisible} onOk={handleSubmit} onCancel={handleCancel} okText="Enviar comentario" cancelText="Cancelar" destroyOnClose={true}>
              <form onSubmit={handleSubmit} className="row">
                <Rate productId={comment.productId} userId={comment.userId} reset={comment.ratingReset} />
                <label htmlFor="text">Dejános tu opinión sobre el producto</label>
                <input type="text" name='text' value={comment.text} onChange={handleChange} />
              </form>

            </Modal>
              </div>
            </div>
          </div>
        );
      })}
      <div>
        {(filters.productName && productsState.productsOriginal.length === 0) && (
          <p>No se encontraron resultados para "{filters.productName}".</p>
        )}
      </div>
    </div>
  );
};

export default SaleDetail;