import React, {useState} from 'react';
import {connect} from 'react-redux';
import {registerUser} from '../Redux/actions/authAction';
import {toast} from 'react-toastify';
import '../css/style.css'

const RegisterForm = ({ dispatchRegisterAction }) => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState({firstName: false, lastName: false, username: false, email: false, password: false, phoneNumber: false})

    const handleSubmit = (event) => {
      event.preventDefault();
      if(isFormInvalid()) updatError();
      else dispatchRegisterAction(firstName, lastName, username, email, password,
        () => toast.success('berhasil membuat akun'), 
        (message) => toast.error(`Error : ${message}`));
    };

    const isFormInvalid = () => (!firstName || !lastName || !username || !email ||!password);

    const updatError = () => {
      const errObj = {firstName: false, lastName: false, username : false, email: false, password:false};
      if(!firstName) errObj.firstName = true;
      if(!lastName) errObj.lastName = true;
      if(!username) errObj.username = true;
      if(!email) errObj.email = true;
      if(!password) errObj.password = true;
      setError(errObj);
    };

    return (
        <React.Fragment>
          <div className="register-main-container">
            <form noValidate onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label htmlFor="firstName" className="form-label">
                First Name
              </label>
              <input
                type="text"
                className={`form-control ${error.firstName ? 'is-invalid':''}` }
                name="firstName"
                id="firstName"
                placeholder="First Name"
                value={firstName}
                onChange = {(e) => setFirstName(e.target.value)}
              />
              <p className="invalid-feedback"> Ini tolong diisi </p>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="lastName" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                className={`form-control ${error.lastName ? 'is-invalid':''}` }
                name="lastName"
                id="lastName"
                placeholder="Last Name"
                value={lastName}
                onChange = {(e) => setLastName(e.target.value)}
              />
              <p className="invalid-feedback"> Ini tolong diisi </p>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="username" className="form-label">
                User Name
              </label>
              <input
                type="text"
                className={`form-control ${error.username ? 'is-invalid':''}` }
                name="username"
                id="username"
                placeholder="user name"
                value={username}
                onChange = {(e) => setUsername(e.target.value)}
              />
              <p className="invalid-feedback"> Ini tolong diisi </p>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className={`form-control ${error.email ? 'is-invalid':''}` }
                name="email"
                id="email"
                placeholder="name@example.com"
                value={email}
                onChange = {(e) => setEmail(e.target.value)}
              />
              <p className="invalid-feedback"> Ini tolong diisi </p>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className={`form-control ${error.password ? 'is-invalid':''}` }
                name="password"
                id="password"
                placeholder="your password"
                value={password}
                onChange = {(e) => setPassword(e.target.value)}
              />
              <p className="invalid-feedback"> Ini tolong diisi </p>
            </div>
            <button type="submit">
              Register
            </button>
            </form>
          </div>
        </React.Fragment>
    );
}

const mapDispatchToProps = dispatch => ({
  dispatchRegisterAction : (username, firstName, lastName, email, password, onSuccess, onError) => {
    dispatch(registerUser({username, firstName, lastName, email, password}, onSuccess, onError))
  }
});

export default connect(null, mapDispatchToProps)(RegisterForm);