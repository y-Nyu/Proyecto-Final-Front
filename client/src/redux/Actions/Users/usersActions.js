import { SEARCH_USERS, 
    SET_SEARCH_TYPE, 
    GET_USER_BY_ID, 
    USER_LOG_OUT, 
    SET_USER, 
    GET_USERS, 
    GET_SALES,
    SET_SALES_BY_USER,
    ROLE
} from '../action-types';
import axios from 'axios';

export const getAllUsers = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        "https://pf-back-deploy.onrender.com/users"
      );
      data.sort((a, b) => a.name.localeCompare(b.name));
      dispatch({
        type: GET_USERS,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

//Pdte config de error, cambiar alert por componente
export const usersCreate = (user) => {
  return async function () {
    try {
      await axios.post("https://pf-back-deploy.onrender.com/users", user);
    } catch (error) {
      console.log(error);
    }
  };
};

export const createUserRole = (rol) => {
    return {type: ROLE,payload: rol};
};

export const userLogin = (loginData) => {
  return async function () {
    try {
      // Esto se debe usar en una cookie del sessionStorage,
      // pues si se guarda en el estado global de redux entonces al refrescar la
      // página el token se pierde y la sesión se cierra.
      await axios.post("https://pf-back-deploy.onrender.com/login", loginData);
    } catch (error) {
      alert(error.response.data);
    }
  };
};

export const userLogOut = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: USER_LOG_OUT });
    } catch (error) {
      alert(error.response.data);
    }
  };
};

export const getUserById = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `https://pf-back-deploy.onrender.com/users/${id}`
      );
      dispatch({ type: GET_USER_BY_ID, payload: data });
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
};

// RECIBE EL OBJETO user, QUE ES UN USUARIO DE LA DB CON TODOS LOS DATOS
// EXCEPTO EL PASSWORD
// ESTE OBJETO user ES GUARDADO EN userLogged EN EL ESTADO GLOBAL
export const setUser = (user) => {
  return { type: SET_USER, payload: user };
};

export const searchUsers = (searched) => {
  return { type: SEARCH_USERS, payload: searched };
};

export const setSearchType = (searchType) => {
  return { type: SET_SEARCH_TYPE, payload: searchType };
};

export const getSales = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        "https://pf-back-deploy.onrender.com/sale"
      );
      dispatch({ type: GET_SALES, payload: data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const setSalesByUser = (data) => {
  return { type: SET_SALES_BY_USER, payload: data };
};