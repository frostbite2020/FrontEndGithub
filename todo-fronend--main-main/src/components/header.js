import React from 'react';
import {Link} from 'react-router-dom'


const Header = ({isLoggedIn, onLogOut}) => {
    return (
      <div>
        <nav className="navbar navbar-dark bg-dark">
          <Link className="navbar-brand" to="/"> 
            <i className="fas fa-th-list "></i>
          </Link>
          { isLoggedIn &&
            <h4>
              <span className="badge badge-pill badge-secondary text-capitalize"> Hello  </span>
            </h4>
          }
          { isLoggedIn &&
            <button type="button" onClick={onLogOut} className="btn btn-outline-warning" >
              Logout 
            </button>}
        </nav>
      </div>
    );
}

export default Header;