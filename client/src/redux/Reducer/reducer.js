import {
  GET_PRODUCTS,
  GET_PRODUCT_NAME,
  GET_PRODUCT_ID,
  GET_PRODUCTS_CATEGORIES,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  GET_FILTERED_PRODUCTS,
  CLEAR_FILTERS,
  ROLE,
  SET_SEARCH_TYPE,
  SEARCH_USERS,
  SEARCH_PRODUCTS,
  ORDERED,
  GET_USER_BY_ID,
  USER_LOG_OUT,
  SET_USER,
  GET_USERS,
  SET_PAGE,
  GET_SALES,
  SET_SALES_BY_USER,
  GET_PRODUCTS_ADMIN,
} from "../Actions/action-types";

const initialState = {
  products: [],
  productsCopy: [],
  categories: [],
  updatedProduct: [],
  userLogged: {},
  users: [],
  userRole: sessionStorage.getItem("userRole") || "",
  allUsers: [],
  currentPage: 1,
  searchType: "users",
  sales: [],
  salesByUser: [],
  productsAdmin: [],
  productsAdminCopy: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PAGE:
      return { ...state, currentPage: action.payload };
    case GET_PRODUCTS_ADMIN:
      return {
        ...state,
        productsAdmin: action.payload,
        productsAdminCopy: action.payload,
      };
    case GET_PRODUCTS:
      console.log("ACTION", action.payload[0].active);
      let activados = [...action.payload].filter(
        (product) => product.active === true
      );
      console.log("ACTIVADOS", activados);
      return {
        ...state,
        products: activados,
        productsCopy: activados,
      };
    case GET_PRODUCTS_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
    case GET_PRODUCT_NAME:
      return {
        ...state,
        products: action.payload,
      };
    case GET_PRODUCT_ID:
      return {
        ...state,
        products: [action.payload],
      };
    case CREATE_PRODUCT:
      return {
        ...state,
        products: action.payload,
      };
    case UPDATE_PRODUCT:
      state.updatedProduct = action.payload;
      return {
        ...state,
      };
    case DELETE_PRODUCT:
      const productToDelete = action.payload;
      const fileteredProducts = state.products.filter(
        (product) => product.id !== productToDelete
      );
      return {
        ...state,
        products: fileteredProducts,
      };
    case GET_FILTERED_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    case CLEAR_FILTERS:
      return {
        ...state,
        products: [...state.productsCopy],
      };
    case ROLE:
      return { ...state, userRole: action.payload };

    case SET_SEARCH_TYPE:
      return { ...state, searchType: action.payload.component };
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case SEARCH_USERS:
      return {
        ...state,
        products: state.allUsers.filter((user) =>
          user.name.toUpperCase().includes(action.payload.toUpperCase())
        ),
      };

    case SEARCH_PRODUCTS:
      return {
        ...state,
        products: state.productsCopy.filter((product) =>
          product.name.toUpperCase().includes(action.payload.toUpperCase())
        ),
        productsAdmin: state.productsAdminCopy.filter((productAdmin) =>
          productAdmin.name.toUpperCase().includes(action.payload.toUpperCase())
        ),
      };

    case ORDERED: {
      const sortedProducts = [...state.products].sort((a, b) => {
        if (action.payload) {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
        }
      });
      return {
        ...state,
        products: sortedProducts,
      };
    }

    case SET_USER: {
      return {
        ...state,
        userLogged: action.payload,
      };
    }

    case GET_USER_BY_ID: {
      return {
        ...state,
        //Se relaciona de nuevo para settear la información de las sales
        userLogged: action.payload,
      };
    }

    case USER_LOG_OUT: {
      return {
        ...state,
        userLogged: [],
      };
    }
    case GET_SALES: {
      return {
        ...state,
        sales: action.payload.sales,
      };
    }

    case SET_SALES_BY_USER: {
      return {
        ...state,
        salesByUser: [action.payload],
      };
    }

    default:
      return { ...state };
  }
};

export default reducer;

// Reemplazar lógica case ORDERED para traerlo desde el back
// Error búsqueda por nombre cuando se omiten la mayúscula inicial en cada palabra
