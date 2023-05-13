import React from 'react'
import 'react-toastify/dist/ReactToastify.css'
import Home from './components/Home'
import {Routes, Route} from 'react-router-dom'
import Header from './components/Layout/Header'
import Footer from './components/Layout/Footer'
import ProductDetails from './components/productDetails/ProductDetails'
import { ToastContainer } from 'react-toastify'

function App() {


  return (
    <div className='App'>

<Header/>


      <div className='container container-fluid'>  
      <Routes>
<Route path='/' element={<Home/>}/>

<Route path='/product/:id' element={<ProductDetails/>}/>
    </Routes> 
      
    </div>
<Footer/>
<ToastContainer/>
    </div>
  )
}

export default App
