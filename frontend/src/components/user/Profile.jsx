import React from 'react'
import MetaData from '../Layout/metaData'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Loader from '../Layout/Loader'

const Profile = () => {
    const {user, isLoading}= useSelector((state) => state.auth) 

    console.log(user)

  return (

<>

{isLoading ? <Loader/>: (
    <>
    <MetaData title={"Profile"}/>
        <h2 className="mt-5 ml-5">My Profile</h2>
    <div className="row justify-content-around mt-5 user-info">
        <div className="col-12 col-md-3">
            <figure className='avatar avatar-profile'>
            <img
                                         src={user.avatar && user.avatar[0].url} 
                                         alt={user && user.name}
                                        className="rounded-circle img-fluid"
                                    />
            </figure>
            <Link to="/profile/update" id="edit_profile" className="btn btn-primary btn-block my-5">
                Edit Profile
            </Link>
        </div>
 
        <div className="col-12 col-md-5">
             <h4>Full Name</h4>
             <p>{user && user.name}</p>
 
             <h4>Email Address</h4>
             <p>{user && user.email}</p>


{user.role !== 'admin' &&(
       <Link to="/orders/me" className="btn btn-danger btn-block mt-5">
       My Orders
   </Link>
)
    }
          

            <Link to="/password/forgot" className="btn btn-primary btn-block mt-3">
                Change Password
            </Link>
        </div>
    </div>
    </>
    )
}


</>

  )
}

export default Profile