import React, {useState, useEffect} from 'react'
import Loader from '../Layout/Loader';
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, loadUser, updatePassword } from '../../redux/reducers/user/userActions';
import { useNavigate } from 'react-router-dom';
import MetaData from '../Layout/metaData';
import { toast } from 'react-toastify';
import { USERS_ACTION_TYPE } from '../../redux/reducers/user/userConstants';

const UpdatePassword = () => {

 

    const { user} = useSelector((state) => state?.auth)

    const {isLoading,error, isUpdated} = useSelector((state) => state.user)



        const [oldPassword, setOldPassword] = useState('')
        const [newPassword, setNewPassword] = useState('')

    const dispatch = useDispatch()
    const navigate= useNavigate()



   

    useEffect(() => {
      
        if(error){
            toast.error(error)
            dispatch(clearErrors(error))
        }
        if(isUpdated){
            toast.success('password updated successfully')
            navigate('/profile')

            dispatch({
                type:USERS_ACTION_TYPE.UPDATE_PASSWORD_RESET
            })
        }


    }, [dispatch, error, user , navigate, isUpdated,])

   


    const handleSubmit =(e) => {

        e.preventDefault()
        
        const formData= new FormData()

        formData.set('oldPassword', oldPassword),
        formData.set('newPassword', newPassword), 


        dispatch(updatePassword(formData))
       

    }

  return (
    <>
    {isLoading ? <Loader/>: (
        <>
        <MetaData title={"update profile"}/>
    <div className="container-container-fluid">
    <div className="row wrapper">
            <div className="col-10 col-lg-5">
                <form className="shadow-lg" onSubmit={handleSubmit}>
                    <h1 className="mt-2 mb-5">Update Password</h1>
                    <div className="form-group">
                        <label htmlFor="old_password_field">Old Password</label>
                        <input
                            type="password"
                            id="old_password_field"
                            className="form-control"
                            onChange={(e) => setOldPassword(e.target.value)}
                            value={oldPassword}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="new_password_field">New Password</label>
                        <input
                            type="password"
                            id="new_password_field"
                            className="form-control"
                            onChange={(e) => setNewPassword(e.target.value)}
                            value={newPassword}
                        />
                    </div>

                    <button type="submit"   disabled={isLoading? true:false} className="btn update-btn btn-block mt-4 mb-3">Update Password</button>
                </form>
            </div>
        </div>
    
</div>
</>
    )}
    </>

  )
}

export default UpdatePassword