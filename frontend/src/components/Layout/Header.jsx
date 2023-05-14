import React from 'react'

import {Outlet, Routes, Route, Link} from 'react-router-dom'
import Search from './Search'
import {useNavigate}  from 'react-router-dom'

const Header = () => {

  return (
    <> 
     <nav className="navbar row">
    <div className="col-12 col-md-3">
      <div className="navbar-brand">
        <img src="/images/logo.png" />
      </div>
    </div>

    <div className="col-12 col-md-6 mt-2 mt-md-0">

<Search/>
   
    </div>

    <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
      <Link className="btn ml-4" id="login_btn" to='/login'>
    
        Login
        </Link>

      <span id="cart" className="ml-3">Cart</span>
      <span className="ml-1" id="cart_count">2</span>
    </div>
    </nav>
    <Outlet/>
    </>
  )
}

export default Header