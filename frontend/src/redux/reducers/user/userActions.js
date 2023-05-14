import axios from 'axios'
import { USERS_ACTION_TYPE } from './userConstants'

export const login = (email, password) => async(dispatch) => {

    try {


        dispatch({
            type:USERS_ACTION_TYPE.LOGIN_START

        })

        const config = {
            headers:{
                'Content-Type':'application/json'
            }
        }
        //get product data from backend via axios
        const {data} = await axios.post(`/api/v1/user/login`, {email, password}, config)
        console.log(email)
        console.log(data)
        dispatch({
            type:USERS_ACTION_TYPE.LOGIN_SUCCESS,
            payload:data.user
        })

    } catch (error) {
        dispatch({
            type:USERS_ACTION_TYPE.LOGIN_FAILED,
            payload:error.response.data.message

        })
        
    }}


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



    //clear errors

    export const clearErrors = () => async(dispatch) => {
        dispatch({
            type:USERS_ACTION_TYPE.CLEAR_ERRORS
    
    })
}