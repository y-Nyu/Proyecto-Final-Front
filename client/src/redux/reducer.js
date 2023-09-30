const initialState = {
  searchType: "users",
  products: [],
  users: [],
  allUsers: [],
  allProducts: [],
  sortedProducts: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_PRODUCTS":
      return { ...state, allProducts: action.payload };
    case "SET_SEARCH_TYPE":
      return { ...state, searchType: action.payload.component };
    case "SEARCH_USERS":
      console.log("en reducer users: " + action.payload + state.products);
      return {
        ...state,
        products: state.allUsers.filter((user) =>
          user.name.toUpperCase().includes(action.payload.toUpperCase())
        ),
      };
    case "SEARCH_PRODUCTS":
      console.log(state.products);
      console.log(action.payload);
      return {
        ...state,
        products: state.allProducts.filter((product) =>
          product.name.toUpperCase().includes(action.payload.toUpperCase())
        ),
      };
    case "ORDERED": {
      const sortedProducts = [...state.allProducts].sort((a, b) => {
        if (action.payload) {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
        }
      });
      console.log(sortedProducts);
      return {
        ...state,
        allProducts: sortedProducts,
      };
    }
    default:
      return {
        ...state,
      };
  }
};

export default reducer;
