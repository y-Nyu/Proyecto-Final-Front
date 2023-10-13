import style from './CardShop.module.css'
import Rate from "../Rate/Rate";
import { Modal, Button } from 'antd';
import { useState } from "react";
import { useSelector } from 'react-redux'
import axios from 'axios';

const CardShop = ({ id, name, total, quantity, image, date }) => {

  const idUser = useSelector(state => state.userLogged.id)
  


  const [comment, setComment] = useState({
    userId: idUser,
    productId: id,
    text: ''
  })

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    setIsModalVisible(false);
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
    handleOk()
    axios.post("https://pf-back-deploy.onrender.com/comments", comment)
      .then(usrRes => {
        console.log(usrRes);
      })
      .catch(error => {
        console.log(error.response.data.error);
      })
  };

  return (
    <div className={style.list}>
      <ul className={`list-group ${style.card}`}>
        <div className="card mb-3">
          <div className="row g-0">
            <div className="col-md-4">
              <img src={image} alt="" className="img-fluid rounded-start" />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <p className="card-text">Cantidad: {quantity}</p>
                <p className="card-text">Precio total: {total}</p>
                <p className="card-text">Fecha compra: {date}</p>
              </div>
              <div>
                <button type="button" className="btn btn-primary" datatoggle="modal" data-target="#exampleModalScrollable" onClick={showModal}> Calificar producto </button>
                <Modal title="Califica el producto" open={isModalVisible} onOk={handleSubmit} onCancel={handleCancel} okText="Enviar comentario" cancelText="Cancelar">
                  <form onSubmit={handleSubmit} className="row">
                    <Rate productId = {comment.productId} userId={idUser} />
                    <label htmlFor="text">Dejános tu opinión sobre el producto</label>
                    <input type="text" name='text' value={comment.text} onChange={handleChange} />
                  </form>

                </Modal>
              </div>
            </div>
          </div>
        </div>
      </ul >
    </div>
  )
}

export default CardShop;