import NavBar from './components/NavBar/NavBar'
import Footer from './components/Footer/Footer'
import FormProduct from "./components/FomProducto/FormProduct";
import FormUser from './components/FormUser/FormUser';
import Home from './views/Home/Home'
import About from './views/About/About'
import LoginRegister from './views/LoginRegister/LoginRegister'
import AccountDetail from './views/AccountDetail/AccountDetail'
import Store from './views/Store/Store'
import Detail from './views/Detail/Detail'
import Faq from "./views/Faq/Faq";
import Privacy from "./views/PrivacyP/Privacy";
import Users from './views/Users/Users'
import Sales from './views/Sales/Sales'
import Cart from './views/Shopping Cart/Cart';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import './App.css'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ShoppingCartProvider } from './contexts/ShoppingCartContext';

// CONSULTAR RUTAS DEFINIDAS POR EL BACK - PDTE AJUSTAR!!

const App = () => {

  const location = useLocation();

  useEffect(() => {
    
    if(location.pathname == "/")
    {
      const queries = location.search;
      const params = new URLSearchParams(queries);

      // We search for the google oauth code
      let codeParam = params.entries().next();
      while(!codeParam.done)
      {
        if(codeParam.value[0] == "code")
        {
          codeParam = codeParam[1];
          alert("TODO BIEN! El codigo de google es: " + codeParam);      
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
          <Route path="/" element={<Home />} />
          <Route path="/formProduct" element={<FormProduct/>}></Route>
          <Route path='/formUser' element={<FormUser/>}></Route>
          <Route path="/about" element={<About />} />
          <Route path="/loginRegister" element={<LoginRegister />} />
          <Route path="/accountDetail/:id" element={<AccountDetail />} />
          <Route path="/store" element={<Store />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/preguntas-frecuentes" element={<Faq />} />
          <Route path="/politica-de-privacidad" element={<Privacy />} />
          <Route path="/cart" element={<Cart />} />

          <Route path="/adminLogin" element={<LoginRegister />} />
          <Route path="/adminStore" element={<Store />} />
          <Route path="/adminUsers" element={<Users />} />
          <Route path="/adminSales" element={<Sales />} />
        </Routes>
        <Footer/>
      </ShoppingCartProvider>
    </div>
  );
};

export default App;