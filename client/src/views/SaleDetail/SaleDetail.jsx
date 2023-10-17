import style from './SaleDetail.module.css'
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Modal, Button } from 'antd';
import Rate from '../../components/Rate/Rate';
import axios from 'axios';
import { Link } from "react-router-dom";

const SaleDetail = () => {
  const { id } = useParams()

  const salesData = useSelector(state => state.salesByUser)
  // console.log('COMPRAS DEL USUARIO', salesData);
  let detail

  useEffect(() => {
    if (salesData !== undefined) {
      detail = salesData[0].filter(element => element.id == id)
      setComment({ ...comment, userId: detail[0].idUser })
      setSaleDetail({ ...saleDetail, idSale: detail[0].id, date: detail[0].date, total: detail[0].total, products: detail[0].products })
      setProductsState({ productsOriginal: detail[0].products , productsCopy: detail[0].products })
    }

  }, [])

  const [comment, setComment] = useState({
    userId: '',
    productId: '',
    text: '',
    ratingReset: ''
  })

  const [saleDetail, setSaleDetail] = useState({
    idSale: '',
    date: '',
    total: '',
    products: []
  })

  const[productsState, setProductsState] = useState({
    productsOriginal: [],
    productsCopy: []
  })

  // console.log('ID USUARIO', comment.userId);
  // console.log('DETALLE DE LA COMPRA', saleDetail);
  console.log('PRODUCTS ORIGINAL',productsState.productsOriginal);
  console.log('PRODUCTS COPY',productsState.productsCopy);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = (productId) => {
    setComment({
      ...comment,
      productId: productId,
      ratingReset: false
    });
    setIsModalVisible(true)
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
        alert('Comentario enviado exitosamente')
        setComment({ ...comment, text: '', ratingReset: true })
        setIsModalVisible(false)
      })
      .catch(error => {
        console.log(error.response.data.error);
      })
  };

// MANEJO FILTROS / ORDENAMIENTOS
    const [filters, setFilters] = useState({
        productName: ''
    });

// SEARCH BAR
    const searchHandleChange = (event) => {
      const { value } = event.target
      console.log('VALUE DEL INPUT', value);
          setFilters({ ...filters, productName : value });
          if (filters.productName.length === 1){
              setProductsState({ ...productsState, productsOriginal: productsState.productsCopy })
          }else{
              filterSalesByProductName()
        }   
    };

    console.log('INPUT BUSQUEDA', filters.productName);

    const filterSalesByProductName = () => {
        const filteredProducts = [...productsState.productsCopy].filter((product) => {
            return product.name.toLowerCase().includes(filters.productName.toLowerCase());
            });
        
            setProductsState({ ...productsState, productsOriginal: filteredProducts })
};

    const showAllProducts = () => {
        setFilters({
            productName: '',
        });
        setProductsState({ ...productsState, productsOriginal: productsState.productsCopy });
        setSortOrder('')
    };

  return (
    <div>
      <Link to={'/compras'}><button type="button" className="btn btn-primary" > Regresar </button></Link>

      <input type="text" placeholder='Buscar por nombre de producto' value={filters.productName} onChange={searchHandleChange}/>
      <Button className={style.btn} type="primary" onClick={showAllProducts}>Mostrar todo</Button>


      <p>No. Factura: {saleDetail.idSale}</p>
      <p>Fecha de la compra: {saleDetail.date.slice(0,10)}</p>
      <p>Total: {saleDetail.total}</p>

      {productsState.productsOriginal?.map((product) => {
        return <div key={product.productId} >
          <img src={product.image} />
          <p>Producto: {product.name}</p>
          <p>Precio unitario: {product.unitPrice}</p>
          <p>Cantidad: {product.quantity}</p>

          <div>
            <button type="button" className="btn btn-primary" datatoggle="modal" data-target="#exampleModalScrollable" onClick={() => showModal(product.productId)}> Calificar producto </button>
            <Modal title="Califica el producto" open={isModalVisible} onOk={handleSubmit} onCancel={handleCancel} okText="Enviar comentario" cancelText="Cancelar">
              <form onSubmit={handleSubmit} className="row">
                <Rate productId={comment.productId} userId={comment.userId} reset={comment.ratingReset} />
                <label htmlFor="text">Dejános tu opinión sobre el producto</label>
                <input type="text" name='text' value={comment.text} onChange={handleChange} />
              </form>

            </Modal>
          </div>

        </div>
      })
      }
              <div>
              {(filters.productName && productsState.productsOriginal.length === 0) && (
                    <p>No se encontraron resultados para "{filters.productName}".</p>
                )}
              </div>
    </div>
  )
};

export default SaleDetail;
