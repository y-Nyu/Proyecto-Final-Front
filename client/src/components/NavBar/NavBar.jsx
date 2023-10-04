import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import imagelogo from "../../assets/logo/Logo.png";

const NavBar = ({ userId, userImage }) => {
  const navigate = useNavigate();

  const [login, loginState] = useState(true);

  const handleLogin = () => {
    loginState(!login);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-light ">
        <div className="container">
          <Link to="/" className="navbar-brand">
            <img
              src={imagelogo}
              className="nav_logo"
              width="60"
              alt="Logo de la página"
            />
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" onClick={() => navigate("/")}>
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" onClick={() => navigate("/store")}>
                  Tienda
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" onClick={() => navigate("/about")}>
                  Sobre nosotros
                </a>
              </li>
            </ul>
            <div className={`d-flex ${login ? "" : "always-visible"}`}>
              {login ? (
                <>
                  <button
                    className="btn btn-sm"
                    onClick={() => {
                      handleLogin();
                      navigate("/loginRegister");
                    }}
                  >
                    Ingresar
                  </button>
                  <button
                    className="btn btn-sm"
                    onClick={() => {
                      handleLogin();
                      navigate("/loginRegister");
                    }}
                  >
                    Registrarse
                  </button>
                </>
              ) : (
                <>
                  <button className="btn cart always-visible" type="submit">
                    {login ? (
                      <Link to={`/accountDetail/${userId}`}>
                        (<img src={imagelogo} />)
                      </Link>
                    ) : (
                      <Link to={`/accountDetail/${userId}`}>
                        <i className="bi bi-person-circle custom-icon"></i>
                      </Link>
                    )}
                  </button>
                  <button
                    className="btn btn-sm"
                    onClick={() => {
                      handleLogin();
                      navigate("/loginRegister");
                    }}
                  >
                    Cerrar Sesión
                  </button>
                </>
              )}
              <button className="btn cart" type="submit">
                <i className="bi bi-cart"></i>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;

