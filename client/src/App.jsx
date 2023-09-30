import NavBar from './components/NavBar/NavBar'
import Footer from './components/Footer/Footer'
import Pagination from "./components/Pagination/Pagination";
import Home from './views/Home/Home'
import About from './views/About/About'
import LoginRegister from './views/LoginRegister/LoginRegister'
import AccountDetail from './views/AccountDetail/AccountDetail'
import Store from './views/Store/Store'
import Detail from './views/Detail/Detail'
import Users from './views/Users/Users'
import Sales from './views/Sales/Sales'
import { Routes, Route } from 'react-router-dom'
import './App.css'

// CONSULTAR RUTAS DEFINIDAS POR EL BACK - PDTE AJUSTAR!!

const App = () => {
  const [datosFromApi, setDatosFromApi] = useState(DATOS_API);

  const [items, setItems] = useState([...DATOS_API].splice(0, ITEMS_PER_PAGE));

  const [currentPage, setCurrentPage] = useState(0);

  const nextHandler = () => {
    const totalElementos = datosFromApi.length;

    const nextPage = currentPage + 1;

    const firsIndex = nextPage * ITEMS_PER_PAGE;

    if (firsIndex === totalElementos) return;

    setItems([...DATOS_API].splice(firsIndex, ITEMS_PER_PAGE));
    setCurrentPage(nextPage);
  };
  const prevHandler = () => {
    const prevPage = currentPage - 1;

    if (prevPage < 0) return;
    const firsIndex = prevPage * ITEMS_PER_PAGE;

    setItems([...DATOS_API].splice(firsIndex, ITEMS_PER_PAGE));
    setCurrentPage(prevPage);
  };

  return (
    <div>
      {location.pathname !== "/loginRegister" && <NavBar />}
      <Routes>
        <Route path="/form" element={<FormProduct></FormProduct>}></Route>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/loginRegister" element={<LoginRegister />} />
        <Route path="/accountDetail/:id" element={<AccountDetail />} />
        <Route path="/store" element={<Store />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/preguntas-frecuentes" element={<Faq />} />
        <Route path="/politica-de-privacidad" element={<Privacy />} />

        <Route path="/adminLogin" element={<LoginRegister />} />
        <Route path="/adminStore" element={<Store />} />
        <Route path="/adminUsers" element={<Users />} />
        <Route path="/adminSales" element={<Sales />} />
      </Routes>
      <Pagination
        currentPage={currentPage}
        items={items}
        nextHandler={nextHandler}
        prevHandler={prevHandler}
      />
      <Footer  />
    </div>
  );
};

export default App;
