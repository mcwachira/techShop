import React,{useState , useEffect} from 'react'
import { Link , useNavigate } from 'react-router-dom'
import MetaData from '../Layout/metaData';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer , toast} from 'react-toastify'
import { clearErrors, login } from '../../redux/reducers/user/userActions';
import Loader from '../Layout/Loader';

const Login = () => {

    const [formValues, setFormValues] = useState({
        email:"",
        password:""
    })

    const navigate = useNavigate()


    const dispatch = useDispatch()

    const handleChange = (e) => {
        const {name, value} = e.target

        setFormValues({
            ...formValues,  
            [name]:value
        })
    }

    const { email, password} = formValues
    console.log(email, password)
    const handleSubmit =(e) => {

        e.preventDefault()
        dispatch(login(email, password))
       

    }

    const {isLoading, isAuthenticated, error} = useSelector((state) => state.auth)

    useEffect(() => {
        if(isAuthenticated){
            toast.success('logged in successfully')
            navigate('/')
        }
        if(error){
            toast.error(error)
            dispatch(clearErrors(error))
        }


    }, [dispatch, error, isAuthenticated , navigate])

    
  return (


    <>
        <MetaData title={"Login"}/>
    {isLoading ? <Loader/> : (

 <div className="row wrapper"> 
 <div className="col-10 col-lg-5">
 <form className="shadow-lg" onSubmit={handleSubmit}>
     <h1 className="mb-3">Login</h1>
     <div className="form-group">
       <label htmlFor="email_field">Email</label>
       <input
         type="email"
         id="email_field"
         className="form-control"
         onChange={handleChange}
          name='email'
           value={email}
       />
     </div>

     <div className="form-group">
       <label htmlFor="password_field">Password</label>
       <input
         type="password"
         id="password_field"
         className="form-control"
         onChange={handleChange}
          name='password'
           value={password}
       />
     </div>

     <Link  to='/password/forgot' className="float-right mb-4">Forgot Password?</Link>

     <button
       id="login_button"
       type="submit"
       className="btn btn-block py-3"
     >
       LOGIN
     </button>

     <Link to="/register" className="float-right mt-3">New User?</Link>
   </form>
   </div>
</div>


    )}


   
</>
  )
}

export default Login