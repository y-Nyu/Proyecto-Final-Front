import { GET_PRODUCTS, GET_PRODUCT_NAME, GET_PRODUCT_ID, GET_PRODUCTS_CATEGORIES, CREATE_PRODUCT } from "../Actions/action-types";



const initialState = {
    products: [],
    productsCopy: [],
    categories: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
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
        default:
            return {...state}
    }
}

export default reducer;