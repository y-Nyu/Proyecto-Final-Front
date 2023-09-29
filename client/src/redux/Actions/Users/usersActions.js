import { GET_USERS, GET_USER_ID, CREATE_USER, UPDATE_USER, DELETE_PRODUCT, DELETE_USER } from "../action-types";
import axios from "axios";

export const getAllUsers = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get('https://pf-back-deploy.onrender.com/users');

            dispatch({
                type: GET_USERS,
                payload: data
            })

        } catch (error) {
            console.log(error);
        }
    }
};

export const getUserByID = (id) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(`https://pf-back-deploy.onrender.com/users/${id}`);

            dispatch({
                type: GET_USER_ID,
                payload: data
            })

        } catch (error) {
            console.log(error);
        }
    }
};

export const createUser = (body) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.post('https://pf-back-deploy.onrender.com/users', body);

            dispatch({
                type: CREATE_USER,
                payload: data
            })

        } catch (error) {
            console.log(error);
        }
    }
};

export const updateUser = (id, body) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.put(`https://pf-back-deploy.onrender.com/users/${id}`, body);

            dispatch({
                type: UPDATE_USER,
                payload: data
            });

        } catch (error) {
            console.log(error);
        }
    }
};

export const deleteUser = (id) => {
    return async (dispatch) => {
        try {
            await axios.delete(`https://pf-back-deploy.onrender.com/users/${id}`);

            dispatch({
                type: DELETE_USER,
                payload: id
            });

        } catch (error) {
            console.log(error);
        }
    }
};

