import React, { useEffect } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import Home from './components/Home'
import {Routes, Route} from 'react-router-dom'
import Header from './components/Layout/Header'
import Footer from './components/Layout/Footer'
import ProductDetails from './components/productDetails/ProductDetails'
import { ToastContainer } from 'react-toastify'
import Login from './components/user/login'
import './App.css'
import Register from './components/user/Register'

import { loadUser } from './redux/reducers/user/userActions'
import { store } from './redux/store'
import Profile from './components/user/Profile'
import ProtectedRoute from './components/route/ProtectedRoute'
import UpdateProfile from './components/user/UpdateProfile'
import UpdatePassword from './components/user/UpdatePassword'
import ForgotPassword from './components/user/ForgotPassword'
import NewPassword from './components/user/NewPassword'
import Cart from './components/cart/Cart'
import ShippingInfo from './components/cart/ShippingInfo'
import ConfirmOrder from './components/cart/ConfirmOrder'

function App() {
  //Loads logged in user if present

  useEffect(() => {


store.dispatch(loadUser())

  }, [])

  return (
    <div className='App'>

<Header/>


      <div className='container container-fluid'>  
      <Routes>
<Route path='/' element={<Home/>}/>

<Route path='/login' element={<Login/>}/>
<Route path='/register' element={<Register/>}/>


<Route path='/cart' element={<Cart/>}/>

<Route path='/profile'element={<ProtectedRoute> <Profile/> </ProtectedRoute>}/>
<Route path='/profile/update' element={ <ProtectedRoute> <UpdateProfile/> </ProtectedRoute> }/>
<Route path='/password/update' element={ <ProtectedRoute> <UpdatePassword/> </ProtectedRoute> }/>
<Route path='/shipping' element={ <ProtectedRoute> <ShippingInfo/> </ProtectedRoute> }/>
<Route path='/order/confirm' element={ <ProtectedRoute> <ConfirmOrder/> </ProtectedRoute> }/>
<Route path='/password/forgot' element={  <ForgotPassword/> }/>
<Route path='/password/reset/:token' element={  <NewPassword/> }/>



<Route path='/product/:id' element={<ProductDetails/>}/>
    </Routes> 
      
    </div>
<Footer/>
<ToastContainer/>
    </div>
  )
}

export default App


