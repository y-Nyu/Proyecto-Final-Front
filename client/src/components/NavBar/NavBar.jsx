import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useState } from "react";

const NavBar = ({ userId, userImage }) => {
  const navigate = useNavigate();

  const [login, loginState] = useState(true);

  const handleLogin = () => {
    loginState(!login);
  };
  return (
    <div>
      {console.log(login)}
      <nav className="navbar navbar-expand-md">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            <img
              src="src/images/Logo1.png"
              className="nav_logo"
              width="60"
              alt="Logo de la página"
            />
          </Link>

          <ul className="navbar-nav d-flex justify-content-center align-items-center">
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
                  className="btn"
                  onClick={() => {
                    handleLogin();
                    navigate("/loginRegister");
                  }}
                >
                  Ingresar
                </button>
                <button
                  className="btn"
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
                    <img src="src\images\Logo1.png" />
                  ) : (
                    <i className="bi bi-person-circle"></i>
                  )}
                </button>
                <button
                  className="btn"
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
      </nav>
    </div>
  );
};

export default NavBar;