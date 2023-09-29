import { GET_PRODUCTS, GET_PRODUCT_NAME, GET_PRODUCT_ID, GET_PRODUCTS_CATEGORIES, CREATE_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT, GET_USERS, GET_USER_ID, CREATE_USER, UPDATE_USER, DELETE_USER } from "../Actions/action-types";



const initialState = {
    // ESTADOS DE PRODUCTOS
    products: [],
    productsCopy: [],
    categories: [],
    updatedProduct: [],
    // ESTADOS DE USERS
    users: [],
    usersCopy: [],
    updatedUsers: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        // PRODUCTS CASES
        case GET_PRODUCTS:
            return {
                ...state,
                products: action.payload,
                productsCopy: action.payload
            };
        case GET_PRODUCTS_CATEGORIES:
            return {
                ...state,
                categories: action.payload
            };
        case GET_PRODUCT_NAME:
            return {
                ...state,
                products: action.payload
            };
        case GET_PRODUCT_ID:
            return {
                ...state,
                products: [action.payload]
            };
        case CREATE_PRODUCT:
            return {
                ...state,
                products: action.payload
            };
        case UPDATE_PRODUCT:
            state.updatedProduct = action.payload;

            return {
                ...state
            };
        case DELETE_PRODUCT:
            const productToDelete = action.payload;
            const fileteredProducts = state.products.filter((product) => product.id !== productToDelete);

            return {
                ...state,
                products: fileteredProducts
            };

        // USER CASES
        case GET_USERS:
            return {
                ...state,
                users: action.payload,
                usersCopy: action.payload
            };
        case GET_USER_ID:
            return {
                ...state,
                users: action.payload
            };
        case CREATE_USER:
            return {
                ...state,
                users: action.payload
            };
        case UPDATE_USER:
            state.updatedProduct = action.payload;

            return {
                ...state
            };
        case DELETE_USER:
            const userToDelete = action.payload;
            const fileteredUsers = state.users.filter((user) => user.id !== userToDelete);

            return {
                ...state,
                users: fileteredUsers
            }
        default:
            return {...state}
    }
}

export default reducer;