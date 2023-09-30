import axios from 'axios';

//Pdte config de error, cambiar alert por componente
export const usersCreate = (user) => {
    return async function () {
        try {
            await axios.post('http://localhost:3001/users', user)
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
            await axios.post('http://localhost:3001/login', loginData)
        } catch (error) {
            alert(error.response.data)
        }
    }
}