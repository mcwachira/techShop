import React, { useEffect, useState } from 'react'
import Loader from '../Layout/Loader';
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, loadUser, updateProfile } from '../../redux/reducers/user/userActions';
import { useNavigate } from 'react-router-dom';
import MetaData from '../Layout/metaData';
import { toast } from 'react-toastify';
import { USERS_ACTION_TYPE } from '../../redux/reducers/user/userConstants';

const UpdateProfile = () =>{

 

    const { user} = useSelector((state) => state?.auth)
    console.log(user)
    const {isLoading,error, isUpdated} = useSelector((state) => state.user)



        const [name, setName] = useState('')
        const [email, setEmail] = useState('')

    const [avatar, setAvatar] = useState('')

    const [avatarPreview, setAvatarPreview] = useState('/images/default_avatar.jpg')

    const navigate = useNavigate()


    const dispatch = useDispatch()



   

    useEffect(() => {
        if(user){
            setName(user.name)
             setEmail(user.email)
             setAvatarPreview(user?.avatar[0].url)
           
        }
        if(error){
            toast.error(error)
            dispatch(clearErrors(error))
        }
        if(isUpdated){
            toast.success('user updated successfully')
            dispatch(loadUser())
            navigate('/profile')

            dispatch({
                type:USERS_ACTION_TYPE.UPDATE_PROFILE_RESET
            })
        }


    }, [dispatch, error, user , navigate, isUpdated,])

    const handleChange = (e) => {
      
            //Lets web applications asynchronously read the contents of files (or raw data buffers) stored on the user's computer, using File or Blob objects to specify the file or data to read.
            const reader = new FileReader()



            reader.onload = () => {
                if(reader.readyState ===2){
                    setAvatarPreview(reader.result)
                    setAvatar(reader.result)
                }
            }

            reader.readAsDataURL(e.target.files[0])


    }


    const handleSubmit =(e) => {

        e.preventDefault()
        
        const formData= new FormData()

        formData.set('name', name),
        formData.set('email', email), 


        formData.set('avatar', avatar),
        console.log(formData.avatar)

        dispatch(updateProfile(formData))
       

    }

    return (
        <>
        {isLoading ? <Loader/>: (
            <>
            <MetaData title={"update profile"}/>
        <div className="container-container-fluid">
       <div className="row wrapper">
                <div className="col-10 col-lg-5">
                <form className="shadow-lg" encType='multipart/form-data' onSubmit={handleSubmit}>
                        <h1 className="mt-2 mb-5">Update Profile</h1>

                        <div className="form-group">
     <label htmlFor="name_field">Name</label>
     <input type="name" id="name_field" 
     className="form-control"   
     onChange={(e) => setName(e.target.value)}
         name='name'
          value={name}/>
   </div>

   <div className="form-group">
<label htmlFor="email_field">Email</label>
<input
  type="email"
  id="email_field"
  className="form-control"
  onChange={(e) => setEmail(e.target.value)}
  name='email'
   value={email}
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

                        <button type="submit" className="btn update-btn btn-block mt-4 mb-3"
                        disabled={isLoading? true:false} >Update</button>
                    </form>
                </div>
            </div>
        
    </div>
    </>
    )}
    </>
    )
}

export default UpdateProfile


