import Login from "../../components/Login/Login";
import Register from "../../components/Register/Register";
import { useState } from "react";
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'

const LoginRegister = () => {
    const [loginState, setLoginState] = useState(true)
    const handleClick = () => {
        setLoginState(!loginState)
    }

    return(
        <div className='container'>
            <div className='row'>
                <div className="col-md-6">
                    <img src="https://www.dailypaws.com/thmb/6xXDSVNVQh9aCCnfZ5dNT78dqeE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/diarrhea-in-dogs-2-66b0d15efa99466ca69401b8794efcfa.png" className="img-thumbnail" alt="petImage" />
                </div>
                <div className="col-md-6">
                    {loginState ? <Login /> : <Register/>}
                    <button onClick={handleClick} className="btn btn-secondary mb-12">{loginState ? 'Quiero registrarme' : 'Ya tengo una cuenta'}</button>
                </div>

            </div>
        </div>
    )
}

export default LoginRegister;