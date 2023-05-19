import React, { useEffect , useState } from 'react'
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
import axios from 'axios'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import Payment from './components/cart/Payment'

function App() {
  //Loads logged in user if present

  const [stripeApiKey, setStripeApiKey] =  useState('')



  //function to fetch stripe api key from backend

  useEffect(() => {


store.dispatch(loadUser())

const getStripeApiKey = async() => {

  const {data} =  await axios.get('/api/v1/stripe-key')  

  setStripeApiKey(data.stripeApiKey)

}
getStripeApiKey()

  }, [])

  console.log(stripeApiKey)
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


{
 stripeApiKey && 
<Route path='/payment' element={ <Elements stripe={loadStripe(stripeApiKey)}> 
<ProtectedRoute> <Payment/> </ProtectedRoute>
</Elements>
 }/>
}



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


