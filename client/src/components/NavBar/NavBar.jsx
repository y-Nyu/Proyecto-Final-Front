import Cart from "../../views/Cart/Cart";
import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createUserRole,
  userLogOut,
} from "../../redux/Actions/Users/usersActions";
import { CartContext } from "../../contexts/ShoppingCartContext";
import imagelogo from "../../assets/logo/Logo.png";
import style from "./Navbar.module.css";
import { Modal } from "antd";
import jwt_decode from "jwt-decode"

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [login, loginState] = useState(true);
  const [cart, setCart] = useContext(CartContext);
  const token = sessionStorage.getItem("jwt_session");
  
  const userRole = useSelector((state) => state.userRole);
  const [isCartVisible, setIsCartVisible] = useState(false);

  const quantity = cart.reduce((acc, curr) => {
    return acc + curr.quantity;
  }, 0);

  const idUser = () => {
    if(token) {
      const { id } = jwt_decode(token);
      return id
    }
  };
  // const token = sessionStorage.getItem("jwt_session");
  useEffect(() => {
    if (token) {
      loginState(false);
    }
  }, [location, token]);

  const [modalVisible, setModalVisible] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const showConfirmModal = () => {
    setModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const handleLogout = () => {
    showConfirmModal();
  };

  const confirmLogout = () => {
    setModalVisible(false);
    sessionStorage.removeItem("jwt_session");
    sessionStorage.removeItem("userRole");
    dispatch(createUserRole(""));
    dispatch(userLogOut());
    loginState(true);

    // Agrega un retraso breve antes de redirigir al usuario a la página de inicio
    setTimeout(() => {
      navigate('/');
    }, 100); // Puedes ajustar el tiempo de espera según tus necesidades
  };

  return (
    <div className={style.stickyNavbar}>
      <nav className={`navbar navbar-expand-md navbar-light ${style.navbar}`}>
        <div className="container">
          <Link to="/" className={style.navbar_brand}>
            <img
              src={imagelogo}
              className={style.nav_logo}
              width="60"
              alt="Logo de la página"
            />
          </Link>

          <button
            className={`navbar-toggler ${style.navbar_toggler}`}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className={`${style.navbar_collapse} collapse navbar-collapse justify-content-between`}
            id="navbarNav"
          >
            <ul className={`navbar-nav ${style.navbar_nav}`}>
              <li className={style.nav_item}>
                <a className={style.nav_link} onClick={() => navigate("/")}>
                  Home
                </a>
              </li>
              <li className={style.nav_item}>
                <a
                  className={style.nav_link}
                  onClick={() => navigate("/tienda")}
                >
                  Tienda
                </a>
              </li>
              <li className={style.nav_item}>
                <a
                  className={style.nav_link}
                  onClick={() => navigate("/sobreNosotros")}
                >
                  Sobre nosotros
                </a>
              </li>
            </ul>

            {userRole === "ADMIN" && (
              <Link to={"/admin"} className={`btn btn-sm ${style.btn}`}>
                ADMIN
              </Link>
            )}

            <div className={`d-flex ${login ? "" : "always-visible"}`}>
              {login ? (
                <>
                  <button
                    className={`btn btn-sm ${style.btn}`}
                    onClick={() => navigate("/inicioSesionRegistro")}
                  >
                    Ingresar
                  </button>
                  {/* <button
                    className={`btn btn-sm ${style.btn}`}
                    onClick={() => navigate("/loginRegister")}
                  >
                    Registrarse
                  </button> */}
                </>
              ) : (
                <>
                  <button
                    className={`btn cart always-visible ${style.btn}`}
                    type="submit"
                  >
                    {login ? (
                      <Link to={`/detallesCuenta/${idUser()}`}>
                        (<img src={userImage} />)
                      </Link>
                    ) : (
                      <Link to={`/detallesCuenta/${idUser()}`}>
                        <i
                          className={`bi bi-person-circle ${style.custom_icon}`}
                        ></i>
                      </Link>
                    )}
                  </button>

                  <button
                    className={`btn btn-sm ${style.btn}`}
                    onClick={() => {
                      handleLogout();
                    }}
                  >
                    Cerrar Sesión
                  </button>
                </>
              )}
              <button
                onClick={() => setIsCartVisible(!isCartVisible)}
                className={`btn cart ${style.btn} btn-primary position-relative`}
                type="submit"
              >
                <i className="bi bi-cart"></i>
                <span
                  className={`position-absolute top-0 start-100 translate-middle badge border border-light rounded-circle bg-danger p-2 ${
                    quantity > 0 ? "visible" : "invisible"
                  }`}
                >
                  <span className="visually-hidden">mensajes no leídos</span>
                  {quantity > 0 && <span>{quantity}</span>}
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>
      {isCartVisible && (
        <Cart
          isVisible={isCartVisible}
          onClose={() => setIsCartVisible(false)}
        />
      )}
      <Modal
        title="Cierre de sesión"
        open={modalVisible}
        onOk={confirmLogout}
        onCancel={handleCancel}
      >
        <p>Se cerrará la sesión. ¿Estás seguro?</p>
      </Modal>
    </div>
  );
};

export default NavBar;