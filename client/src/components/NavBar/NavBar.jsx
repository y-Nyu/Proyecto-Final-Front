import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createUserRole } from "../../redux/Actions/Users/usersActions";

const NavBar = ({ userId, userImage }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [login, loginState] = useState(true);

  useEffect(() => {
    const token = sessionStorage.getItem("jwt_session");
    
    if(token)
    {
      loginState(false)
    }
  }, [location])
  
  const handleLogout = () => {
    sessionStorage.removeItem("jwt_session");
    dispatch(createUserRole(""));
    // navigate("/loginRegister");
    loginState(true);
  }
  
  const handleCart = () => {
    const token = sessionStorage.getItem("jwt_session")
    if(!token) {
      navigate("/loginRegister")
    }
    navigate("/sales") // Carrito?
  }

  return (
    <div>
      <nav className="navbar navbar-expand-md">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            <img
              src="src/images/Logo.png"
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
            {login
            ? (
              <>
                <button
                  className="btn"
                  onClick={() => {
                    navigate("/loginRegister");
                  }}
                >
                  Ingresar
                </button>
                <button
                  className="btn"
                  onClick={() => {
                    navigate("/loginRegister");
                  }}
                >
                  Registrarse
                </button>
              </>
            ) 
            : (
              <>
                <button className="btn cart always-visible" type="submit">
                  {
                    login 
                    ? 
                    <Link to={`/accountDetail/${userId}`} >
                      (<img src={userImage} />)
                    </Link>
                    : 
                    <Link to={`/accountDetail/${userId}`}>
                      (<i className="bi bi-person-circle"></i>)
                    </Link>
                  }
                </button>
                <button
                  className="btn"
                  onClick={
                    handleLogout()
                  }
                >
                  Cerrar Sesión
                </button>
              </>
              )}

            <button onClick={handleCart}className="btn cart" >
              <i className="bi bi-cart"></i>
            </button>

          </div>
        </div>
      </nav>
    </div>
  );
};


export default NavBar;