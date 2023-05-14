import React from 'react'
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

function App() {


  return (
    <div className='App'>

<Header/>


      <div className='container container-fluid'>  
      <Routes>
<Route path='/' element={<Home/>}/>

<Route path='/login' element={<Login/>}/>
<Route path='/register' element={<Register/>}/>

<Route path='/product/:id' element={<ProductDetails/>}/>
    </Routes> 
      
    </div>
<Footer/>
<ToastContainer/>
    </div>
  )
}

export default App
