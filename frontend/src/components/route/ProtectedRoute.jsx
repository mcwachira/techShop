import React from 'react'
import { useSelector } from 'react-redux'
import LoadingToRedirect from '../../util/LoadingToRedirect'

const ProtectedRoute = ({children}) => {

    const {user, isAuthenticated}= useSelector((state) => state.auth) 
  return isAuthenticated === true && user ? (
    <div>{children}</div>
  ):(
    <LoadingToRedirect/>
  )
}

export default ProtectedRoute