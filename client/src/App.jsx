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
import { getUserById } from "./redux/Actions/Users/usersActions";
import DashBoard from "./views/DashBoard/DashBoard";
import jwtDecode from "jwt-decode";
import Stars from "./components/Stars/Stars";
import Footer from "./components/Footer/Footer";
import SaleDetail from "./views/SaleDetail/SaleDetail";

const App = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const token = sessionStorage.getItem("jwt_session");
  const userRole = useSelector(state => state.userRole);

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
  console.log("location " + location);
  useEffect(() => {
    if (location.pathname == "/") {
      const queries = location.search;
      const params = new URLSearchParams(queries);
      let codeParam = params.entries().next();
      console.log("code params " + codeParam);
      while (!codeParam.done) {
        console.log("ENTRO");
        if (codeParam.value[0] == "code") {
          codeParam = codeParam.value[1];
          codeParam = decodeURI(codeParam);

          axios
            .post("https://pf-back-deploy.onrender.com/login-google", {
              google_code: codeParam,
            })
            .then((resp) => resp.data)
            .then(({ id, token }) => {
              sessionStorage.setItem("jwt_session", token);
              dispatch(getUserById(id));
            })
            .catch((error) => alert(error.message));

          break;
        }
      }
    }
  }, [location]);

  return (
    <div>
      <ShoppingCartProvider>
        <NavBar />
        <Routes>
          <Route path="/success" element={<Success></Success>} />
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/about" element={<About />} />
          <Route path="/loginRegister" element={<LoginRegister />} />
          <Route path="/accountDetail/:id" element={!token ? <Navigate to="/" /> : <AccountDetail />} />
          <Route path="/cart" element={<Cart/>}/>
          {/* <Route path="/star" element={<Stars />} /> */}
          <Route path="/sales" element={!token ? <Navigate to="/" /> : <Sales />} />
          <Route path="/sales/:id" element={<SaleDetail/>} />
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