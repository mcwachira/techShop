import axios from 'axios'
import { ORDER_ACTION_TYPE } from "./orderConstants"


export const createOrder = (order) => async(dispatch, getState) => {
    try{

        dispatch({type:ORDER_ACTION_TYPE.CREATE_ORDER_START})

        const config = {
            headers:{

                'Content-Type':'application/json'
            }

        }
        const { data } = await axios.post('/api/v1/order/new',  order, config)

        dispatch({
            type:ORDER_ACTION_TYPE.CREATE_ORDER_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type:ORDER_ACTION_TYPE.CREATE_ORDER_FAILED,
            payload: error.response.data.message
        })
    }
}





//Get the orders of the logged in user
export const myOrders = () => async(dispatch) => {
    try{

        dispatch({type:ORDER_ACTION_TYPE.MY_ORDERS_START})

        
        const { data } = await axios.get('/api/v1/orders/me')

        dispatch({
            type:ORDER_ACTION_TYPE.MY_ORDERS_SUCCESS,
            payload: data.orders
        })

    } catch (error) {
        dispatch({
            type:ORDER_ACTION_TYPE.MY_ORDERS_FAILED,
            payload: error.response.data.message
        })
    }
}

//Get the orders of the logged in user
export const getOrderDetails = (id) => async(dispatch) => {
    try{

        dispatch({type:ORDER_ACTION_TYPE.ORDER_DETAILS_START})


        const { data } = await axios.get(`/api/v1/orders/${id}`)

        dispatch({
            type:ORDER_ACTION_TYPE.ORDER_DETAILS_SUCCESS,
            payload: data.order
        })

    } catch (error) {
        dispatch({
            type:ORDER_ACTION_TYPE.ORDER_DETAILS_FAILED,
            payload: error.response.data.message
        })
    }
}


 

//Get the orders in admin dashboard
export const allOrders = () => async(dispatch) => {
    try{

        dispatch({type:ORDER_ACTION_TYPE.ALL_ORDERS_START})

        
        const { data } = await axios.get('/api/v1/admin/orders')

        dispatch({
            type:ORDER_ACTION_TYPE.ALL_ORDERS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type:ORDER_ACTION_TYPE.ALL_ORDERS_FAILED,
            payload: error.response.data.message
        })
    }
}
    //clear errors

    export const clearErrors = () => async(dispatch) => {
        dispatch({
            type:ORDER_ACTION_TYPE.CLEAR_ERRORS
    
    })
}


    //update order details admin

          

    export const updateOrder= (id, orderData) => async(dispatch) => {

        try {
    
            dispatch({
                type:ORDER_ACTION_TYPE.UPDATE_ORDER_START
    
            })
            const config = {
                headers:{
    
                    'Content-Type':'application/json'
                }
    
            }
            //get product data from backend via axios
            const {data} = await axios.put(`/api/v1/admin/order/${id}` , orderData, config)
            // console.log(data)
            dispatch({
                type:ORDER_ACTION_TYPE.UPDATE_ORDER_SUCCESS,
                payload:data.success
            })
    
        } catch (error) {
            dispatch({
                type:ORDER_ACTION_TYPE.UPDATE_ORDER_FAILED,
                payload:error.response.data.message
    
            })
            
        }}


            //delete product admin

            export const deleteOrder = (id) => async(dispatch) => {

                try {
            
                    dispatch({
                        type:ORDER_ACTION_TYPE.DELETE_ORDER_START
            
                    })
                    // const id =  req.params.id
            
                    //get product data from backend via axios
                    const {data} = await axios.delete(`/api/v1/admin/order/${id}`)
                    // console.log(data)
                    dispatch({
                        type:ORDER_ACTION_TYPE.DELETE_ORDER_SUCCESS,
                        payload:data.success
                    })
            
                } catch (error) {
                    dispatch({
                        type:ORDER_ACTION_TYPE.DELETE_ORDER_FAILED,
                        payload:error.response.data.message
            
                    })
                    
                }}