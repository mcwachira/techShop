import React from 'react'
import {useSelector} from 'react-redux'
import {Outlet, Routes, Route, Link} from 'react-router-dom'
import Search from './Search'
import {useNavigate}  from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { logOutUser } from '../../redux/reducers/user/userActions'

const Header = () => {

  const dispatch =useDispatch()
const {user, isLoading}= useSelector((state) => state.auth) 
const { cartItems } = useSelector(state => state.cart)

// console.log(user)

const logoutHandler = () => {

  dispatch(logOutUser() )
  toast.success('Logged Out Successfully')
}

  return (
    <> 
     <nav className="navbar row">
    <div className="col-12 col-md-3">
      <div className="navbar-brand">
        <img src="/images/logo.png" />
      </div>
    </div>

{/* search */}
    <div className="col-12 col-md-6 mt-2 mt-md-0">

<Search/>
   
    </div>

    <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
                    <Link to="/cart" style={{ textDecoration: 'none' }} >
                        <span id="cart" className="ml-3">Cart</span>
                        <span className="ml-1" id="cart_count">{cartItems.length} </span>
                    </Link>

                    {user ? (
                        <div className="ml-4 dropdown d-inline">
                            <Link to="" className="btn dropdown-toggle text-white mr-4" type="button" id="dropDownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

                                <figure className="avatar avatar-nav">
                                    <img
                                         src={user.avatar && user.avatar[0].url} 
                                         alt={user && user.name}
                                        className="rounded-circle"
                                    />
                                </figure>
                                <span>{user && user.name}</span>
                            </Link>
                            <div className="dropdown-menu" aria-labelledby="dropDownMenuButton">

                                {user && user.role === 'admin' && (
                                    <Link className="dropdown-item" to="/dashboard">Dashboard</Link>
                                )}
                                <Link className="dropdown-item" to="/orders/me">Orders</Link>
                                <Link className="dropdown-item" to="/profile">Profile</Link>
                                <Link className="dropdown-item text-danger" to="/logout" onClick={logoutHandler}>
                                    Logout
                                </Link>

                           
                                </div>

                        </div>

                    ) : !isLoading && <Link to="/login" className="btn mr-4" id="login_btn">Login</Link>}


                </div>
            </nav>
   
    <Outlet/>
    </>
  )
}

export default Header








