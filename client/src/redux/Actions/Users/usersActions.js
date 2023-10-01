import { SEARCH_USERS, SET_SEARCH_TYPE } from '../action-types';
import axios from 'axios';

//Pdte config de error, cambiar alert por componente
export const usersCreate = (user) => {
    return async function () {
        try {
            await axios.post('https://pf-back-deploy.onrender.com/users', user)
        } catch (error) {
            alert(error.response.data)
        }
    }
}

export const createUserRole = (rol) => {
    return {type: "ROLE",payload: rol};
}

export const userLogin = (loginData) => {
    return async function () {
        try {
            // Esto se debe usar en una cookie del sessionStorage,
            // pues si se guarda en el estado global de redux entonces al refrescar la
            // página el token se pierde y la sesión se cierra.
            await axios.post('https://pf-back-deploy.onrender.com/login', loginData)
        } catch (error) {
            alert(error.response.data)
        }
    }
}

export const searchUsers = (searched) => {
    return { type: SEARCH_USERS, payload: searched };
  };
  
  export const setSearchType = (searchType) => {
    return { type: SET_SEARCH_TYPE, payload: searchType };
  };