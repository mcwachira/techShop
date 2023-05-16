import axios from 'axios'
import { USERS_ACTION_TYPE } from './userConstants'

// Login
export const login = (email, password) => async (dispatch) => {
    try {

        dispatch({ type: USERS_ACTION_TYPE.LOAD_USER_START })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('/api/v1/user/login', { email, password }, config)

        dispatch({
            type:USERS_ACTION_TYPE.LOAD_USER_SUCCESS,
            payload: data.user
        })

    } catch (error) {
        dispatch({
            type:USERS_ACTION_TYPE.LOAD_USER_FAILED,
            payload: error.response.data.message
        })
    }
}


    export const register = (userData) => async(dispatch) => {

        try {
    
            dispatch({
                type:USERS_ACTION_TYPE.REGISTER_USER_START
    
            })
    
            const config = {
                headers:{
                    'Content-Type': 'multipart/form-data'

                }
            }

            console.log(userData)
            //get product data from backend via axios
            const {data} = await axios.post('/api/v1/user/register',userData, config)

            dispatch({
                type:USERS_ACTION_TYPE.REGISTER_USER_SUCCESS,
                payload:data.user
            })
    
        } catch (error) {
            dispatch({
                type:USERS_ACTION_TYPE.REGISTER_USER_FAILED,
                payload:error.response.data.message
    
            })
            
        }}

export const getUserDetails = (id) => async(dispatch) => {

    try {

        dispatch({
            type:USERS_ACTION_TYPE.FETCH_PRODUCT_DETAILS_START

        })
        // const id =  req.params.id

        //get product data from backend via axios
        const {data} = await axios.get(`/api/v1/product/${id}`)
        console.log(data)
        dispatch({
            type:USERS_ACTION_TYPE.FETCH_PRODUCT_DETAILS_SUCCESS,
            payload:data.product
        })

    } catch (error) {
        dispatch({
            type:USERS_ACTION_TYPE.FETCH_PRODUCT_DETAILS_FAILED,
            payload:error.response.data.message

        })
        
    }}




    //load user

    export const loadUser = () => async(dispatch) => {

        try {
    
    
            dispatch({
                type:USERS_ACTION_TYPE.LOAD_USER_START
    
            })
    
            //get product data from backend via axios
            const {data} = await axios.get('/api/v1/profile')
       
            dispatch({
                type:USERS_ACTION_TYPE.LOAD_USER_SUCCESS,
                payload:data.user
            })
    
        } catch (error) {
            dispatch({
                type:USERS_ACTION_TYPE.LOAD_USER_FAILED,
                payload:error.response.data.message
    
            })
            
        }}
    


            //log out user

    export const logOutUser = () => async(dispatch) => {

        try {
     await axios.get(`/api/v1/user/logout`)
       
            dispatch({
                type:USERS_ACTION_TYPE.LOGOUT_USER_SUCCESS,
               
            })
    
        } catch (error) {
            dispatch({
                type:USERS_ACTION_TYPE.LOGOUT_USER_FAILED,
                payload:error.response.data.message
    
            })
            
        }}
    
    //clear errors

    export const clearErrors = () => async(dispatch) => {
        dispatch({
            type:USERS_ACTION_TYPE.CLEAR_ERRORS
    
    })
}


export const updateProfile = (userData) => async(dispatch) => {

    try {

        dispatch({
            type:USERS_ACTION_TYPE.UPDATE_PROFILE_START
        })

        const config = {
            headers:{
                'Content-Type': 'multipart/form-data'

            }
        }

        console.log(userData)
        //get product data from backend via axios
        const {data} = await axios.put('/api/v1/profile/update',userData, config)

        dispatch({
            type:USERS_ACTION_TYPE.UPDATE_PROFILE_SUCCESS,
            payload:data.success
        })

    } catch (error) {
        dispatch({
            type:USERS_ACTION_TYPE.UPDATE_PROFILE_FAILED,
            payload:error.response.data.message

        })
        
    }}


export const updatePassword = (passwords) => async(dispatch) => {

    try {

        dispatch({
            type:USERS_ACTION_TYPE.UPDATE_PASSWORD_START
        })

        const config = {
            headers:{
                'Content-Type': 'application/json'

            }
        }

        //get product data from backend via axios
        const {data} = await axios.put('/api/v1/password/update',passwords, config)

        dispatch({
            type:USERS_ACTION_TYPE.UPDATE_PASSWORD_SUCCESS,
            payload:data.success
        })

    } catch (error) {
        dispatch({
            type:USERS_ACTION_TYPE.UPDATE_PASSWORD_FAILED,
            payload:error.response.data.message

        })
        
    }}


    export const forgotPassword = (email) => async(dispatch) => {

        try {
    
            dispatch({
                type:USERS_ACTION_TYPE.FORGOT_PASSWORD_START
            })
    
            const config = {
                headers:{
                    'Content-Type': 'application/json'
    
                }
            }
    
            //get product data from backend via axios
            const {data} = await axios.post('/api/v1/password/forgot',email, config)
    
            dispatch({
                type:USERS_ACTION_TYPE.FORGOT_PASSWORD_SUCCESS,
                payload:data.message
            })
    
        } catch (error) {
            dispatch({
                type:USERS_ACTION_TYPE.FORGOT_PASSWORD_FAILED,
                payload:error.response.data.message
    
            })
            
        }}



    export const resetPassword = (token, passwords) => async(dispatch) => {

        try {
    
            dispatch({
                type:USERS_ACTION_TYPE.NEW_PASSWORD_START
            })
    
            const config = {
                headers:{
                    'Content-Type': 'application/json'
    
                }
            }
    
            //get product data from backend via axios
            const {data} = await axios.put(`api/v1/password/reset/${token}`,passwords, config)
    
            dispatch({
                type:USERS_ACTION_TYPE.NEW_PASSWORD_SUCCESS,
                payload:data.success
            })
    
        } catch (error) {
            dispatch({
                type:USERS_ACTION_TYPE.NEW_PASSWORD_FAILED,
                payload:error.response.data.message
    
            })
            
        }}

    