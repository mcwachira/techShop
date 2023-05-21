import axios from 'axios'
import { PRODUCTS_ACTION_TYPE } from './productConstants'

export const getProducts = (keyword ='') => async(dispatch) => {

    try {

        dispatch({
            type:PRODUCTS_ACTION_TYPE.FETCH_ALL_PRODUCTS_START

        })

        //get product data from backend via axios
        const {data} = await axios.get(`/api/v1/products?keyword=${keyword}`)
        console.log(data)
        dispatch({
            type:PRODUCTS_ACTION_TYPE.FETCH_ALL_PRODUCTS_SUCCESS,
            payload:data
        })

    } catch (error) {
        dispatch({
            type:PRODUCTS_ACTION_TYPE.FETCH_ALL_PRODUCTS_FAILED,
            payload:error.response.data.message

        })
        
    }}




export const getProductsDetails = (id) => async(dispatch) => {

    try {

        dispatch({
            type:PRODUCTS_ACTION_TYPE.FETCH_PRODUCT_DETAILS_START

        })
        // const id =  req.params.id

        //get product data from backend via axios
        const {data} = await axios.get(`/api/v1/product/${id}`)
        // console.log(data)
        dispatch({
            type:PRODUCTS_ACTION_TYPE.FETCH_PRODUCT_DETAILS_SUCCESS,
            payload:data.product
        })

    } catch (error) {
        dispatch({
            type:PRODUCTS_ACTION_TYPE.FETCH_PRODUCT_DETAILS_FAILED,
            payload:error.response.data.message

        })
        
    }}


    //create as review
    export const newReview = (reviewData) => async(dispatch) => {

        try {
    
            dispatch({
                type:PRODUCTS_ACTION_TYPE.NEW_REVIEW_DETAILS_START
    
            })
            // const id =  req.params.id
            const config = {
                headers:{
    
                    'Content-Type':'application/json'
                }
    
            }
            const {data} = await axios.put('/api/v1/review', reviewData, config)
            // console.log(data)
            dispatch({
                type:PRODUCTS_ACTION_TYPE.NEW_REVIEW_DETAILS_SUCCESS,
                payload:data.success
            })
    
        } catch (error) {
            dispatch({
                type:PRODUCTS_ACTION_TYPE.NEW_REVIEW_DETAILS_FAILED,
                payload:error.response.data.message
    
            })
            
        }}
    

        


    //FETCH PRODUCTS IN ADMIN DASHBOARD

    export const getAdminProducts = () => async(dispatch) => {

        try {
    
            dispatch({
                type:PRODUCTS_ACTION_TYPE.ADMIN_PRODUCTS_START
    
            })
    
            //get product data from backend via axios
            const {data} = await axios.get(`/api/v1/admin/products`)
            console.log(data)
            dispatch({
                type:PRODUCTS_ACTION_TYPE.ADMIN_PRODUCTS_SUCCESS,
                payload: data.products

            })
    
        } catch (error) {
            dispatch({
                type:PRODUCTS_ACTION_TYPE.ADMIN_PRODUCTS_FAILED,
                payload:error.response.data.message
    
            })
            
        }}


        //admin create product

        
        export const newProduct= (productData) => async(dispatch) => {

            try {
        
                dispatch({
                    type:PRODUCTS_ACTION_TYPE. NEW_PRODUCT_START
        
                })
               
                const config = {
                    headers:{
                        'Content-Type': 'application/json'
                    }
                }
        
                //get product data from backend via axios
                const { data } = await axios.post(`/api/v1/admin/product/new`, productData, config)
               
                // console.log(data)
                dispatch({
                    type:PRODUCTS_ACTION_TYPE.NEW_PRODUCT_SUCCESS,
                    payload:data
                })
        
            } catch (error) {
                dispatch({
                    type:PRODUCTS_ACTION_TYPE.NEW_PRODUCT_FAILED,
                    payload:error.response.data.message
        
                })
                
            }}
        


    //clear errors

    export const clearErrors = () => async(dispatch) => {
        dispatch({
            type:PRODUCTS_ACTION_TYPE.CLEAR_ERRORS
    
    })
}