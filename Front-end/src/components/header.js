import React, { useState } from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import '../css/style.css'

const Header = ({isLoggedIn, onLogOut, userData}) => {
  const [date, setDate] = useState({time: new Date()})

  const currentTime = () => {
    setDate({...date, time: new Date()})
  }
  setInterval(() => {
    currentTime()
  }, 1000)
  
    return (
      <div>
        { isLoggedIn &&
        <nav className="navbar navbar-dark">
          <Link className="home-navigation navbar-brand" to="/"> 
            <p className="px-3">Home</p>
          </Link>
          <div className="clock">
            {date.time.toLocaleTimeString()}
          </div>
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