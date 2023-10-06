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
import Cart from './views/Cart/Cart';
import axios from 'axios';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ShoppingCartProvider } from './contexts/ShoppingCartContext';
import { getUserById } from './redux/Actions/Users/usersActions'
import jwtDecode from 'jwt-decode'
import './App.css'


const App = () => {

  return (
    <div>
      <ShoppingCartProvider>
        <NavBar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/store" element={<Store/>}/>
          <Route path="/detail/:id" element={<Detail/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/loginRegister" element={token ? <Navigate to="/"/> : <LoginRegister/>}/>
          <Route path="/accountDetail/:id" element={<AccountDetail/>}/>
          <Route path="/cart" element={token ? <Cart/> : <Navigate to="/"/>}/>
          {/* <Route path="/sales" element={token ? <Sales/> : <Navigate to="/"/>}/> */}
          <Route path="/sales" element={<Sales/>}/>
          <Route path="/preguntas-frecuentes" element={<Faq/>}/>
          <Route path="/politica-de-privacidad" element={<Privacy/>}/>
          <Route path='/formUser' element={<FormUser/>}></Route>
          <Route path="/formProduct" element={<FormProduct/>}/>

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