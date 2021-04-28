import React, {useState} from 'react';
import { connect } from "react-redux";
import {toast} from 'react-toastify';
import { loginUser } from "../Redux/actions/authAction";

const LoginComponent = ({dispatchLoginAction}) => {
  
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('') 
  const [error, setError] = useState({username: false, password: false});

  const handleSubmit = (event) => {
    console.log(username, password)
    event.preventDefault();
    if(isFormInvalid()) updateError();
    else dispatchLoginAction(username, password, 
        () => toast.success("udah login thx"),
        (message) => toast.error(`Error:${message}`));
  };

  const isFormInvalid = () => (!username || !password);

  const updateError = () => {
    const errObj = {username: false, password:false};
    if(!username.trim()) errObj.username = true;
    if(!password.trim()) errObj.password = true;
    setError(errObj);
  };

  const handleCancel = event => {
      event.preventDefault();
      setUsername('');
      setPassword('');
      setError({username: false, password:false});
  } 

    return (
      <div>
        <React.Fragment>
          <form noValidate onSubmit={handleSubmit}>
          <div className="mb-3 row">
            <label htmlFor="username" className="col-sm-2 col-form-label">
              User Name
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange = {(e) => setUsername(e.target.value)}
                className={`form-control ${error.username ? 'is-invalid':''}` }
              />
              <p className="invalid-feedback"> Ini tolong diisi </p>
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="password" className="col-sm-2 col-form-label">
              Password
            </label>
            <div className="col-sm-10">
              <input type="password"
              id="password" 
              name="password"
              value={password}
              onChange = {(e) => setPassword(e.target.value)}
              className={`form-control ${error.password ? 'is-invalid':''}` }
              />
              <p className="invalid-feedback"> Ini tolong diisi </p>
            </div>
           
          </div>
          <button type="submit" className="btn btn-primary mr-2">
              Login
          </button>
          <button type="button" className="btn btn-outline-secondary" onClick={handleCancel}>
              cancel
          </button>
          </form>
        </React.Fragment>
      </div>
    );
}

const mapDispatchToProps = dispatch => ({
  dispatchLoginAction: (username, password, onSuccess, onError) =>
      dispatch(loginUser({username, password}, onSuccess, onError))
});

export default connect(null, mapDispatchToProps)(LoginComponent);