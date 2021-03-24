import React, {useState} from 'react';
import LoginForm from '../components/loginComponent';
import RegisterForm from '../components/registerComponent';

const AuthPage = () => {

     const [pilih, setPilih] = useState({login : true})

     const handleClick = () => {
        setPilih({...pilih, login: !pilih.login})
     };
    
    return (

        <div>
            <React.Fragment>
                <h1> {pilih.login ? 'Login' : 'Register'} </h1>
                
                {pilih.login ? <LoginForm/> : <RegisterForm/>}
                <button
                    className = "btn btn-dark"
                    onClick = {handleClick}
                >
                <p> {pilih.login ? 'Register' : 'Login' } </p>
                </button>
            </React.Fragment>            
        </div>
    )
}



export default AuthPage;