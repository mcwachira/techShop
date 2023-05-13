import React from 'react'

import Home from './components/Home'
import {Routes, Route} from 'react-router-dom'
import Header from './components/Layout/Header'
import Footer from './components/Layout/Footer'

function App() {


  return (
    <div className='App'>

<Header/>


      <div className='container container-fluid'>  
      <Routes>
<Route path='/' element={<Home/>}/>


    </Routes>
      
    </div>
<Footer/>

    </div>
  )
}

export default App
