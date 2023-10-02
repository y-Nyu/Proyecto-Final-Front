import NavBar from './components/NavBar/NavBar'
import Footer from './components/Footer/Footer'
import Pagination from "./components/Pagination/Pagination";
import FormProduct from "./components/FomProducto/FormProduct";
import Home from './views/Home/Home'
import About from './views/About/About'
import LoginRegister from './views/LoginRegister/LoginRegister'
import AccountDetail from './views/AccountDetail/AccountDetail'
import Store from './views/Store/Store'
import Detail from './views/Detail/Detail'
import Faq from "./views/Faq/faq";
import Privacy from "./views/PrivacyP/Privacy";
import Users from './views/Users/Users'
import Sales from './views/Sales/Sales'
import { Routes, Route } from 'react-router-dom'
import { useState } from 'react';
import './App.css'

// CONSULTAR RUTAS DEFINIDAS POR EL BACK - PDTE AJUSTAR!!
const DATOS_API = [
  {
      "id": 1,
      "name": "Collares Isabelinos",
      "brand": " Delta Brandds, Inc.",
      "image": "https://www.ammascotas.com/wp-content/uploads/2023/09/ISABELINO-GRANDE.jpg",
      "category": "Accesorios",
      "detail": "Collares Isabelinos, evite que las mascotas se muerden a sí mismas se lastimen o que las mascotas se rasquen las heridas después de la cirugía. Lámina de plástico translúcido suave fácil de poner.",
      "price": 8700,
      "stock": 225,
      "active": "true"
  },
  {
      "id": 2,
      "name": "Chaleco Acolchado para Perro",
      "brand": "Generic",
      "image": "https://www.ammascotas.com/wp-content/uploads/2023/08/mateo-chaleco-acolchado-azul.jpg/",
      "category": "Accesorios",
      "detail": "Chaleco Acolchado para perros, ajustable,  diseño ergonómico y práctico para tu mascota.",
      "price": 1000,
      "stock": 12,
      "active": "true"
  },
  {
      "id": 3,
      "name": "Coffee Bones",
      "brand": "",
      "image": "https://www.ammascotas.com/wp-content/uploads/2018/10/CoffeBones.jpg",
      "category": "",
      "detail": "",
      "price": 1000,
      "stock": 225,
      "active": "true"
  },
  {
      "id": 4,
      "name": "Comedero Gato",
      "brand": "Delta Brands, Inc.",
      "image": "https://www.ammascotas.com/wp-content/uploads/2017/08/comederogato.jpg",
      "category": "Comedero",
      "detail": "Comedero en forma de cara de gato, ideal para tu mascota, disponible en varios colores, única medida, divertido comedero para agua o concentrado. Producto no tóxico, biodegradable y amigable con el medio ambiente",
      "price": 8700,
      "stock": 225,
      "active": true
  },
  {
      "id": 5,
      "name": "Cepillos Dentales",
      "brand": "Generic",
      "image": "https://www.ammascotas.com/wp-content/uploads/2016/11/cepillodentalx4.jpg",
      "category": "Accesorios",
      "detail": "Cepillos dentales x 4 ideal para la higiene de tu mascota, masajea las encías y dientes, reduce el sarro y la placa. Producto con fácil ajuste al dedo, práctico de usar, para perros y gatos. Producto no tóxico, biodegradable y amigable con el medio ambiente.",
      "price": 8000,
      "stock": 32,
      "active": true
  },
  {
      "id": 6,
      "name": "Capa Impermeable",
      "brand": "Pet Toys",
      "image": "https://www.ammascotas.com/wp-content/uploads/2018/10/CoffeBones.jpg",
      "category": "Snacks para Mascotas",
      "detail": "Capa impermeable para mascotas, ideal para que tu peludo no tenga que mojarse en los días de lluvia. Capa impermeable transparente, disponible en diferentes colores de ribertes (bordes) colores surtidos.",
      "price": 8900,
      "stock": 50,
      "active": true
  },
  {
      "id": 7,
      "name": "Juguete Pelota de Goma",
      "brand": "Playful Pets",
      "image": "https://www.ammascotas.com/wp-content/uploads/2023/09/pelota-goma-roja.jpg",
      "category": "Juguetes",
      "detail": "Pelota de goma resistente para perros. Perfecta para juegos de lanzar y traer.",
      "price": 800,
      "stock": 50,
      "active": true
  },
  {
      "id": 8,
      "name": "Camiseta para Perros",
      "brand": "Pet Fashion",
      "image": "https://i.linio.com/p/9fe9d5f27698f5918e1c9aab876028b9-product.jpg",
      "category": "Ropa para Mascotas",
      "detail": "Camiseta de algodón suave y cómoda para perros. Disponible en varios colores y tallas.",
      "price": 1500,
      "stock": 50,
      "active": true
  },
  {
      "id": 9,
      "name": "Collar de Cuero",
      "brand": "Luxury Pets",
      "image": "https://style4pets.com/cdn/shop/products/collar-classic-honey.jpg?v=1678126430",
      "category": "Accesorios",
      "detail": "Elegante collar de cuero genuino para perros. Diseño duradero y resistente.",
      "price": 2500,
      "stock": 30,
      "active": true
  },
  {
      "id": 10,
      "name": "Comida para Gatos",
      "brand": "Meow Delights",
      "image": "https://jumbocolombiaio.vtexassets.com/arquivos/ids/205582/7702084057132.jpg?v=637814200413970000",
      "category": "Alimentos",
      "detail": "Nutritiva comida para gatos con ingredientes de alta calidad. Sabores variados.",
      "price": 1200,
      "stock": 100,
      "active": true
  },
  {
      "id": 11,
      "name": "Juguete Pelota con Plumas",
      "brand": "Playful Pets",
      "image": "https://imagenes.elpais.com/resizer/Em0F9S-lzZ0dPO6e_qnzEcA9rvc=/1960x1470/cloudfront-eu-central-1.images.arcpublishing.com/prisa/423OQRR5TYDXJCOXE42CZL2BNM.jpg",
      "category": "Juguetes para Gatos",
      "detail": "Pelota de juguete con plumas para gatos. Ideal para estimular el juego y el ejercicio.",
      "price": 800,
      "stock": 80,
      "active": true
  },
  {
      "id": 12,
      "name": "Cama de Lujo para Perros",
      "brand": "Luxury Pet Beds",
      "image": "https://imagenes.elpais.com/resizer/RrBdTb0r5xaLv0MNST38nykE2Xg=/1960x0/cloudfront-eu-central-1.images.arcpublishing.com/prisa/GOTB2GS6R5G6FKLUCF3KRYEI4A.png",
      "category": "Camas y Muebles",
      "detail": "Cama de lujo con cojines suaves y diseño elegante para perros de todos los tamaños.",
      "price": 35000,
      "stock": 20,
      "active": true
  },
  {
      "id": 13,
      "name": "Arnés Reflectante para Gatos",
      "brand": "SafePets",
      "image": "https://m.media-amazon.com/images/I/710FMS6J1sL._AC_UF1000,1000_QL80_.jpg",
      "category": "Accesorios para Gatos",
      "detail": "Arnés ajustable y reflectante para gatos, proporciona seguridad durante los paseos nocturnos.",
      "price": 12800,
      "stock": 55,
      "active": true
  },
  {
      "id": 14,
      "name": "Comida para Perros Saludable",
      "brand": "Healthy Paws",
      "image": "https://aratiendas.com/wp-content/uploads/2021/07/3060-7704269102651-1.jpg",
      "category": "Alimentos",
      "detail": "Comida para perros con ingredientes naturales y equilibrados para una dieta saludable.",
      "price": 1800,
      "stock": 40,
      "active": true
  },
  {
      "id": 15,
      "name": "Rascador de Gatos",
      "brand": "Cat Haven",
      "image": "https://www.comportamientoanimal.com.co/wp-content/uploads/Rascador-gatos-2.jpg",
      "category": "Juguetes y Rascadores",
      "detail": "Rascador de sisal para gatos con múltiples plataformas y juguetes colgantes.",
      "price": 2500,
      "stock": 15,
      "active": true
  },
  {
      "id": 16,
      "name": "Pelota de Tenis para Perros",
      "brand": "PlayFetch",
      "image": "https://t1.ea.ltmcdn.com/es/posts/2/4/2/son_buenas_las_pelotas_de_tenis_para_los_perros_21242_orig.jpg",
      "category": "Juguetes",
      "detail": "Pelota de tenis resistente para perros. Perfecta para juegos de buscar y traer.",
      "price": 500,
      "stock": 100,
      "active": true
  },
  {
      "id": 17,
      "name": "Chaqueta Impermeable para Perros",
      "brand": "WeatherPaws",
      "image": "https://m.media-amazon.com/images/I/61KHBFCvMXS.jpg",
      "category": "Ropa para Mascotas",
      "detail": "Chaqueta impermeable para perros con forro polar. Ideal para paseos en días lluviosos.",
      "price": 20000,
      "stock": 30,
      "active": true
  },
  {
      "id": 18,
      "name": "Comedero Automático para Gatos",
      "brand": "AutoFeeder",
      "image": "https://s.libertaddigital.com/2021/12/24/comedero-automatico-para-perros-y-gatos-honeyguaridan-4l.jpg",
      "category": "Alimentación",
      "detail": "Comedero automático programable para gatos. Dispensa comida en horarios programados.",
      "price": 8000,
      "stock": 20,
      "active": true
  },
  {
      "id": 19,
      "name": "Collar Antipulgas para Gatos",
      "brand": "FleaGuard",
      "image": "https://i.ebayimg.com/thumbs/images/g/rAEAAOSwE8xh4R0B/s-l640.jpg",
      "category": "Cuidado de la Salud",
      "detail": "Collar antipulgas repelente para gatos. Protege a tu mascota de pulgas y garrapatas.",
      "price": 1500,
      "stock": 50,
      "active": true
  },
  {
      "id": 20,
      "name": "Juguete para Perros Kong",
      "brand": "Kong Toys",
      "image": "https://www.latiendadefrida.com/cdn/shop/products/kong-classic-s-m-l-xl-xxl_e19235a8-f552-4fb3-a7cb-0e7c0d657d5f.jpg",
      "category": "Juguetes",
      "detail": "Juguete clásico de goma Kong para perros. Perfecto para masticar y jugar.",
      "price": 1200,
      "stock": 40,
      "active": true
  }
]

const ITEMS_PER_PAGE = 4;

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
      <NavBar />
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