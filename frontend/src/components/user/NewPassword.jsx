import React, {useState, useEffect} from 'react'
import Loader from '../Layout/Loader';
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, resetPassword } from '../../redux/reducers/user/userActions';
import { useNavigate , useParams } from 'react-router-dom';
import MetaData from '../Layout/metaData';
import { toast } from 'react-toastify';



const NewPassword = () => {

    const {isLoading, error,success} = useSelector((state) => state.forgotPassword)

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
   

    const dispatch = useDispatch()
    const navigate= useNavigate()


    const {token} = useParams()
console.log(token)

   

    useEffect(() => {
      
        if(error){
            toast.error(error)
            dispatch(clearErrors(error))
        }
        if(success){
            toast.success('Password updated successfully')
         navigate('/login')

         
        }


    }, [dispatch, error, success, navigate])

   


    const handleSubmit =(e) => {

        e.preventDefault()
        
        const formData= new FormData()

        formData.set('password', password),
        formData.set('confirmPassword', confirmPassword),



        dispatch(resetPassword(token,formData))
       

    }
  return (

    <>
    {isLoading ? <Loader/>: (
        <>
        <MetaData title={"password reset"}/>
<div className="container-container-fluid">
		<div className="row wrapper">
            <div className="col-10 col-lg-5">
                <form className="shadow-lg" onSubmit={handleSubmit}>
                    <h1 className="mb-3">New Password</h1>

                    <div className="form-group">
                        <label htmlFor="password_field">Password</label>
                        <input
                            type="password"
                            id="password_field"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirm_password_field">Confirm Password</label>
                        <input
                            type="password"
                            id="confirm_password_field"
                            className="form-control"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    <button
                        id="new_password_button"
                        type="submit"
                        className="btn btn-block py-3">
                        Set Password
                    </button>

                </form>
            </div>
        </div>
        
    </div>
    </>
    )}

</>
  )
}

export default NewPassword