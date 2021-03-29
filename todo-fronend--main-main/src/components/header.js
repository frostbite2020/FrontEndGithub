import React from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import '../css/style.css'

const Header = ({isLoggedIn, onLogOut, userData}) => {
    return (
      <div>
        { isLoggedIn &&
        <nav className="navbar navbar-dark bg-dark">
          <Link className="home-navigation navbar-brand" to="/"> 
            Home
          </Link>
            <h4>
              <span className="badge badge-pill badge-secondary text-capitalize"> Hello {userData.fullName}</span>
            </h4>
            <button type="button" onClick={onLogOut} className="btn btn-outline-warning" >
              Logout 
            </button>
        </nav>
        }
      </div>
    );
}

const mapStateToProps = state => ({
  userData : state.user
});

export default connect(mapStateToProps)(Header);