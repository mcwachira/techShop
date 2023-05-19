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



    //clear errors

    export const clearErrors = () => async(dispatch) => {
        dispatch({
            type:ORDER_ACTION_TYPE.CLEAR_ERRORS
    
    })
}