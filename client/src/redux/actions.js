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

export const userLogin = (loginData) => {
    return async function () {
        try {
            await axios.post('http://localhost:3001/login', loginData)
        } catch (error) {
            alert(error.response.data)
        }
    }
}