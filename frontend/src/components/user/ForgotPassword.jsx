import React, {useState, useEffect} from 'react'
import Loader from '../Layout/Loader';
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, forgotPassword } from '../../redux/reducers/user/userActions';
import { useNavigate } from 'react-router-dom';
import MetaData from '../Layout/metaData';
import { toast } from 'react-toastify';
const ForgotPassword = () => {



    const {isLoading,error, message} = useSelector((state) => state.forgotPassword)



        const [email, setEmail] = useState('')
   

    const dispatch = useDispatch()
    const navigate= useNavigate()



   

    useEffect(() => {
      
        if(error){
            toast.error(error)
            dispatch(clearErrors(error))
        }
        if(message){
            toast.success(message)
            // navigate('/profile')

         
        }


    }, [dispatch, error, message, navigate])

   


    const handleSubmit =(e) => {

        e.preventDefault()
        
        const formData= new FormData()

        formData.set('email', email),



        dispatch(forgotPassword(formData))
       

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
                    <h1 className="mb-3">Forgot Password</h1>
                    <div className="form-group">
                        <label htmlFor="email_field">Enter Email</label>
                        <input
                            type="email"
                            id="email_field"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <button
                        id="forgot_password_button"
                        type="submit"
                        className="btn btn-block py-3">
                        Send Email
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

export default ForgotPassword