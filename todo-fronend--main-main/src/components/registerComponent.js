import React, {useState} from 'react';
import {connect} from 'react-redux';
import {registerUser} from '../Redux/actions/authAction';
import {toast} from 'react-toastify';

const RegisterForm = ({ dispatchRegisterAction }) => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phoneNumber, setPhoneNumber] = useState(0)
    const [error, setError] = useState({firstName: false, lastName: false, username: false, email: false, password: false, phoneNumber: false})

    const handleSubmit = (event) => {
      event.preventDefault();
      console.log(firstName, lastName, username, email, password, phoneNumber)
      if(isFormInvalid()) updatError();
      else dispatchRegisterAction(firstName, lastName, username, email, password, phoneNumber,
        () => toast.success('berhasil membuat akun'), 
        (message) => toast.error(`Error : ${message}`));
    };

    const isFormInvalid = () => (!firstName || !lastName || !username || !email ||!password || !phoneNumber);

    const updatError = () => {
      const errObj = {firstName: false, lastName: false, username : false, email: false, password:false, phoneNumber: false};
      if(!firstName) errObj.firstName = true;
      if(!lastName) errObj.lastName = true;
      if(!username) errObj.username = true;
      if(!email) errObj.email = true;
      if(!password) errObj.password = true;
      if(!phoneNumber) errObj.phoneNumber = true;
      setError(errObj);
    };

    return (
      <div>
        <React.Fragment>
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
          <div className="form-group mb-3">
            <label htmlFor="phoneNumber" className="form-label">
              Phone Number
            </label>
            <input
              type="number"
              className={`form-control ${error.phoneNumber ? 'is-invalid':''}` }
              name="phoneNumber"
              id="phoneNumber"
              placeholder="Your Phone Number"
              value={phoneNumber}
              onChange = {(e) => setPhoneNumber(parseInt(e.target.value, 10))}
            />
            <p className="invalid-feedback"> Ini tolong diisi </p>
          </div>
          <button type="submit">
            Register
          </button>
          </form>
         
        </React.Fragment>
      </div>
    );
}

const mapDispatchToProps = dispatch => ({
  dispatchRegisterAction : (username, firstName, lastName, email, password, phoneNumber, onSuccess, onError) => {
    dispatch(registerUser({username, firstName, lastName, email, password, phoneNumber}, onSuccess, onError))
  }
});

export default connect(null, mapDispatchToProps)(RegisterForm);