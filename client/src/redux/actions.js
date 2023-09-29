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

export const userLogin = (loginData) => {
    return async function () {
        try {
            await axios.post('https://pf-back-deploy.onrender.com/login', loginData)
        } catch (error) {
            alert(error.response.data)
        }
    }
}