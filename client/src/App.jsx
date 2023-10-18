import NavBar from "./components/NavBar/NavBar";
import FormProduct from "./components/FomProducto/FormProduct";
import FormUser from "./components/FormUser/FormUser";
import Home from "./views/Home/Home";
import About from "./views/About/About";
import LoginRegister from "./views/LoginRegister/LoginRegister";
import AccountDetail from "./views/AccountDetail/AccountDetail";
import Store from "./views/Store/Store";
import Detail from "./views/Detail/Detail";
import Faq from "./views/Faq/Faq";
import Privacy from "./views/PrivacyP/Privacy";
import Users from "./views/Users/Users";
import Sales from "./views/Sales/Sales";
import Cart from "./views/Cart/Cart";
import Success from "./components/Success/Success";
import axios from "axios";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import "./App.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ShoppingCartProvider } from "./contexts/ShoppingCartContext";
import { createUserRole, getUserById, setUser } from "./redux/Actions/Users/usersActions";
import DashBoard from "./views/DashBoard/DashBoard";
import jwtDecode from "jwt-decode";
import Stars from "./components/Stars/Stars";
import Footer from "./components/Footer/Footer";
import SaleDetail from "./views/SaleDetail/SaleDetail";
import { FloatButton } from "antd";
import Icon, { WhatsAppOutlined } from '@ant-design/icons';

const App = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const token = sessionStorage.getItem("jwt_session");
  const userRole = useSelector(state => state.userRole);

  const whatsappURL = 'https://api.whatsapp.com/send?phone=TUNUMEROTELEFONO';
  const iconStyle = {
  fontSize: '28px',
  color: 'white', 
  display: 'flex',
  };
  
  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;
      dispatch(getUserById(userId));
    }
  }, []);
  
  // ESTE CODIGO DE ACÁ ES PARA EL LOGIN DE GOOGLE
  //
  // DEBIDO A QUE EL POPUP DE GOOGLE NOS REDIRIGE ACÁ
  // CON PARAMETROS EN LA URL, LO QUE HAGO ES
  // CHEQUEAR SI EN ESTOS MISMOS PARAMETROS EXISTE EL CODIGO QUE
  // GOOGLE NOS PROVEE.
  //
  // EN CASO DE QUE EL CODIGO ESTÉ, LO PARSEO Y LO ENVÍO AL BACK.
  // EL BACK LO UNICO QUE HACE ES USAR EL CODIGO PARA OBTENER EL EMAIL
  // DEL USUARIO QUE SE LOGEA.
  // SI EL MAIL ESTÁ EN LA BASE DE DATOS (ES DECIR, SI EL USUARIO ESTA REGISTRADO)
  // LO DEJA HACER LOGIN Y RETORNA EL TOKEN JWT EN LA RESPONSE.
  //
  // EN CASO CONTRARIO ARROJA UN ERROR
  console.log('TOKen NYU', token);
  useEffect(() => {
    if (location.pathname === "/") {
      const index = window.location.href.indexOf("?");
      if (index >= 0) {
        const queries = window.location.href.slice(index);
        const params = new URLSearchParams(queries);
        let codeParam = params.entries().next();
  
        console.log("Queries: " + queries);
  
        while (!codeParam.done) {
          if (codeParam.value[0] === "code") {
            codeParam = codeParam.value[1];
            codeParam = decodeURI(codeParam);
  
            (async () => {
              try {
                const resp = await axios.post("https://pf-back-deploy.onrender.com/login-google", { google_code: codeParam });
                const { id, name, email, rol, celular, token } = resp.data;
  
                sessionStorage.setItem("jwt_session", token);
                console.log('TOKEN GOOGLE', token);
                dispatch(createUserRole(rol));
                dispatch(setUser({ id, email, name, rol, celular }));
                window.location = "/"
              } catch (error) {
                alert("ESTO ES UNA ALERTA DE ERROR: " + error);
              }
            })();
  
            break;
          }
        }
      }
    }
  }, [location]);

  const redirigirAWhatsapp = () => {
    window.open(whatsappURL, '_blank');
  };

  return (
    <div>
      <ShoppingCartProvider>
        <NavBar />
        <FloatButton
     icon={<WhatsAppOutlined style={iconStyle} />}
      style={{ bottom: 100, right: 100 }}
      tooltip="WhatsApp"
      className="miBotonPersonalizado"
      onClick={redirigirAWhatsapp}
      type="green"
    />
        <Routes>
          <Route path="/success" element={<Success></Success>} />
          <Route path="/" element={<Home />} />
          <Route path="/tienda" element={<Store />} />
          <Route path="/detalleProducto/:id" element={<Detail />} />
          <Route path="/sobreNosotros" element={<About />} />
          <Route path="/inicioSesionRegistro" element={<LoginRegister />} />
          <Route path="/detallesCuenta/:id" element={!token ? <Navigate to="/" /> : <AccountDetail />} />
          <Route path="/carritoCompras" element={<Cart/>}/>
          {/* <Route path="/star" element={<Stars />} /> */}
          <Route path="/compras" element={!token ? <Navigate to="/" /> : <Sales />} />
          <Route path="/compra/:id" element={<SaleDetail/>} />
          <Route path="/preguntas-frecuentes" element={<Faq />} />
          <Route path="/politica-de-privacidad" element={<Privacy />} />
          <Route path="/formUser" element={<FormUser />} />
          <Route path="/formProduct" element={<FormProduct />} />

          {userRole === "ADMIN" 
          ? (
            <>
            <Route path="/admin" element={<DashBoard />} />
            <Route path="/adminLogin" element={<LoginRegister />} />
            <Route path="/adminStore" element={<Store />} />
            <Route path="/adminUsers" element={<Users />} />
            <Route path="/adminSales" element={<Sales />} />
            </>
          ) 
          : (
            <Route path="*" element={<Navigate to="/" />} />
          )}
        </Routes>
      <Footer />
      </ShoppingCartProvider>
    </div>
  );
};

export default App;