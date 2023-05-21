import React from 'react'
import { useSelector } from 'react-redux'
import LoadingToRedirect from '../../util/LoadingToRedirect'

const ProtectedRoute = ({children , isAdmin}) => {

    const {user, isAuthenticated}= useSelector((state) => state.auth) 
    console.log(user)
  return isAuthenticated === true && user  || user?.role ==='admin' ? (
    <div>{children}</div>
  ):(
    <LoadingToRedirect/>
  )
}

export default ProtectedRoute