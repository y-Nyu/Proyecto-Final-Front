import { GET_PRODUCTS, GET_PRODUCT_NAME, GET_PRODUCT_ID, GET_PRODUCTS_CATEGORIES, CREATE_PRODUCT } from "./action-types";


export const getAllProducts = () => {
    return async (dispatch) => {
        try {
            // const { data } = await xxxx.get('xxxx');

            dispatch({
                type: GET_PRODUCTS,
                payload: data
            })

        } catch (error) {
            console.log(error);
        }
    }
};

export const getProductByName = (name) => {
    return async (dispatch) => {
        try {
            // const { data } = await xxxx.get(`xxxx${name}`);

            dispatch({
                type: GET_PRODUCT_NAME,
                payload: data
            })

        } catch (error) {
            console.log(error);
        }
    }
};

export const getProductByID = (id) => {
    return async (dispatch) => {
        try {
            // const { data } = await xxxx.get(`xxxx${id}`);

            dispatch({
                type: GET_PRODUCT_ID,
                payload: data
            })

        } catch (error) {
            console.log(error);
        }
    }
};

export const getCategories = () => {
    return async (dispatch) => {
        try {
            // const { data } = await xxxx.get('xxxx');

            dispatch({
                type: GET_PRODUCTS_CATEGORIES,
                payload: data
            })

        } catch (error) {
            console.log(error);
        }
    }
};

export const createProduct = (body) => {
    return async (dispatch) => {
        try {
            // const { data } = await xxxx.post('xxxx', body);

            dispatch({
                type: CREATE_PRODUCT,
                payload: data
            })

        } catch (error) {
            console.log(error);
        }
    }
};
