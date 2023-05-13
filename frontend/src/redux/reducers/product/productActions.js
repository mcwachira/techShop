import axios from 'axios'
import { PRODUCTS_ACTION_TYPE } from './productConstants'

export const getProducts = () => async(dispatch) => {

    try {

        dispatch({
            type:PRODUCTS_ACTION_TYPE.FETCH_ALL_PRODUCTS_START

        })

        //get product data from backend via axios
        const {data} = await axios.get('/api/v1/products')
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
        console.log(data)
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



    //clear errors

    export const clearErrors = () => async(dispatch) => {
        dispatch({
            type:PRODUCTS_ACTION_TYPE.CLEAR_ERRORS
    
    })
}