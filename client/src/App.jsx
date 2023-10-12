import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import FormProduct from "./components/FomProducto/FormProduct";
import FormUser from './components/FormUser/FormUser';
import Home from './views/Home/Home';
import About from './views/About/About';
import LoginRegister from './views/LoginRegister/LoginRegister';
import AccountDetail from './views/AccountDetail/AccountDetail';
import Store from './views/Store/Store';
import Detail from './views/Detail/Detail';
import Faq from "./views/Faq/Faq";
import Privacy from "./views/PrivacyP/Privacy";
import Users from './views/Users/Users';
import Sales from './views/Sales/Sales';
import Cart from './views/Cart/Cart';
import axios from 'axios';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import './App.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ShoppingCartProvider } from './contexts/ShoppingCartContext';
import { getUserById, createUserRole, setUser, userLogin } from './redux/Actions/Users/usersActions'
import DashBoard from "./views/DashBoard/DashBoard";
import jwtDecode from 'jwt-decode'
import Stars from './components/Stars/Stars';

const App = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const token = sessionStorage.getItem("jwt_session");
  const userRole = useSelector(state => state.userRole);



  useEffect(() => {

    if(token)
    {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;
      dispatch(getUserById(userId));
    }
  }, [token, dispatch]);

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

  useEffect(() => {
    if (location.pathname === "/") {
      
      const index = window.location.href.indexOf("?");
      if(index >= 0)
      {
        const queries = window.location.href.slice(index);

      const params = new URLSearchParams(queries);
      let codeParam = params.entries().next();
      
      while (!codeParam.done) {
        
        if (codeParam.value[0] === "code") {
          
          codeParam = codeParam.value[1];
          codeParam = decodeURI(codeParam);
          axios.post("http://localhost:3001/login-google", { google_code: codeParam })
            .then(resp => resp.data)
            .then(({id,name, email, rol, celular, token}) => {
          
              sessionStorage.setItem("jwt_session", token);
              dispatch(createUserRole(rol));
              
              dispatch(setUser({id, email, name, rol, celular}));
             
            })
            .catch(error => {
              alert("ESTO ES UNA ALERTA DE ERROR: " + error);
            });

          break;
        }
      }
      }
      
    }
  }, [location, dispatch]);

  // NO FUNCIONA
  // const userRole = useSelector(state => state.userRole);
  // const navigate = useNavigate();
  // const location = useLocation();

  // const handleAuth = (token) => {
  //   if(!token && location.pathname != "/loginRegister")
  //   {
  //     navigate("/loginRegister");
  //     return false;
  //   }

  //   return true;
  // }

  // // Esto es autenticación y autorización
  // useEffect(() => {
   
  //   const token = sessionStorage.getItem("jwt_session");
  //   const isLogged = handleAuth(token);
    
  //   // Chequea si el usuario está loggeado
  //   if(isLogged)
  //   {
  //     // Si está loggeado e intenta acceder a una página del admin:
  //     if(location.pathname.includes("admin") && userRole != "ADMIN")
  //     {
  //       // Si no es admin es rechazado
  //       navigate("/");
  //     }
  //   }
  // }, [location, userRole]); 
  // NO FUNCIONA

  return (
    <div>
      <ShoppingCartProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/about" element={<About />} />
          <Route path="/loginRegister" element={token ? <Navigate to="/" /> : <LoginRegister />} />
          <Route path="/accountDetail/:id" element={<AccountDetail />} />
          <Route path="/cart" element={token ? <Cart /> : <Navigate to="/" />} />
          <Route path="/star" element={<Stars />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/preguntas-frecuentes" element={<Faq />} />
          <Route path="/politica-de-privacidad" element={<Privacy />} />
          <Route path='/formUser' element={<FormUser />} />
          <Route path="/formProduct" element={<FormProduct />} />

          {/* Acá esta la logica para determinar que solo el admin pueda acceder a las siguientes rutas :) */}
          
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