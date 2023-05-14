import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { clearErrors, register } from '../../redux/reducers/user/userActions'
import Loader from '../Layout/Loader'
import MetaData from '../Layout/metaData'

const Register = () => {

    
    const [formValues, setFormValues] = useState({
        name:"",
        email:"",
        password:""
    })

    const {name, email, password} = formValues

    const [avatar, setAvatar] = useState('')

    const [avatarPreview, setAvatarPreview] = useState('/images/default_avatar.jpg')

    const navigate = useNavigate()


    const dispatch = useDispatch()

    const handleChange = (e) => {
        if(e.target.name === 'avatar'){
            //Lets web applications asynchronously read the contents of files (or raw data buffers) stored on the user's computer, using File or Blob objects to specify the file or data to read.
            const reader = new FileReader()

            reader.onload = () => {
                if(reader.readyState ===2){
                    setAvatarPreview(reader.result)
                    setAvatar(reader.result)
                }
            }

            reader.readAsDataURL(e.target.files[0])
        }else{
            setFormValues({
                ...formValues,
                [e.target.name]:e.target.value
            })
        }

    }

   
    const handleSubmit =(e) => {

        e.preventDefault()
        
        const formData= new FormData()

        formData.set('name', name),
        formData.set('email', email),
        formData.set('password', password),
        formData.set('avatar', avatar),
        console.log(formData.avatar)

        dispatch(register(formData))
       

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
        <MetaData title={"Register"}/>
   {isLoading ? <Loader/> : (
 <div className="container container-fluid">
 <div className="row wrapper">
 <div className="col-10 col-lg-5">
 <form className="shadow-lg" encType='multipart/form-data' onSubmit={handleSubmit} >
     <h1 className="mb-3">Register</h1>

   <div className="form-group">
     <label htmlFor="name_field">Name</label>
     <input type="name" id="name_field" 
     className="form-control"   
     onChange={handleChange}
         name='name'
          value={name}/>
   </div>

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

     <div className='form-group'>
       <label htmlFor='avatar_upload'>Avatar</label>
       <div className='d-flex align-items-center'>
           <div>
               <figure className='avatar mr-3 item-rtl'>
                   <img
                       src={avatarPreview}
                       className='rounded-circle'
                       alt='avatar preview'
                   />
               </figure>
           </div>
           <div className='custom-file'>
               <input
                   type='file'
                   name='avatar'
                   className='custom-file-input'
                   id='customFile'
                   accept='images/*'
                   onChange={handleChange}
               />
               <label className='custom-file-label' htmlFor='customFile'>
                   Choose Avatar
               </label>
           </div>
       </div>
   </div>

     <button
       id="register_button"
       type="submit"
       className="btn btn-block py-3"
       disabled={isLoading? true: false}
     >
       REGISTER
     </button>
   </form>
   </div>
</div>
</div>
   )}
    </>
  )
}

export default Register