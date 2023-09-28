import { Provider } from "react-redux";
import store from "../src/redux/store";

// import FormProduct from "./Components/FomProducto/FormProduct";
import FormUser from "./Components/FormUser/FormUser";
import Searchbar from "./Components/SearchBar/SearchBar";
import OrderByName from "./Components/OrderBYName/OrderByName";

function App() {
  return (
    <Provider store={store}>
      <Searchbar component="products" />
      <OrderByName />
      <FormUser />
    </Provider>
  );
}

export default App;
