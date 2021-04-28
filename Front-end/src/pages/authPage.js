import React, {useState} from 'react';
import LoginForm from '../components/loginComponent';
import RegisterForm from '../components/registerComponent';
import '../css/style.css'

const AuthPage = () => {

     const [pilih, setPilih] = useState({login : true})

     const handleClick = () => {
        setPilih({...pilih, login: !pilih.login})
     };
    

    return (
        <div className="auth-main-container">
            <div className="container main-container">
                <div className={`row ${pilih.login? "sub-container" : null}`}>
                    <div className="col-12 col-md-7">
                        <div className="left-view">
                            <h1>Todo Web Application</h1>
                            <p>Even a little things can be something</p>
                        </div>
                    </div>
                    <div className={`right-view col-12 col-md-5 jumbotron ${pilih.login? "login-active" : null}`}>
                    <React.Fragment>
                        <h1> {pilih.login ? 'LOGIN' : 'REGISTER'} </h1>
                        {pilih.login ? <LoginForm /> : <RegisterForm/>}
                        <button
                            className = "btn btn-dark mt-2"
                            onClick = {handleClick}
                        >
                        {pilih.login ? 'Register' : 'Login' }
                        </button>
                    </React.Fragment>     
                    </div>
                </div>
            </div>
        </div>
    )
}



export default AuthPage