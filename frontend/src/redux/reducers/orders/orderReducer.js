import { ORDER_ACTION_TYPE } from "./orderConstants"

const INITIAL_STATE = {
    isLoading:false,
    error:null,
    order:{}
}



export const newOrderReducer  = (state =INITIAL_STATE, action ={} ) => {
    switch(action.type){

        case ORDER_ACTION_TYPE.CREATE_ORDER_START:
            return {
               isLoading:true,
               
            }

            case ORDER_ACTION_TYPE.CREATE_ORDER_SUCCESS:
                return {
                    isLoading:false,
                order:action.payload
                }

                case ORDER_ACTION_TYPE.CREATE_ORDER_FAILED:
                    return {
                       isLoading:false, 
                       error:action.payload
                    } 

                    case ORDER_ACTION_TYPE.CLEAR_ERRORS:
                    return {
                        ...state,
                       error:null
                    } 

                    default:
                        return state
    }

}

export const myOrdersReducer  = (state ={orders:[],  isLoading:false, error:null,}, action ={} ) => {
    switch(action.type){

        case ORDER_ACTION_TYPE.MY_ORDERS_START:
            return {
               isLoading:true,
               
            }

            case ORDER_ACTION_TYPE.MY_ORDERS_SUCCESS:
                return {
                    isLoading:false,
                orders :action.payload
                }

                case ORDER_ACTION_TYPE.MY_ORDERS_FAILED:
                    return {
                       isLoading:false, 
                       error:action.payload
                    } 

                    case ORDER_ACTION_TYPE.CLEAR_ERRORS:
                    return {
                        ...state,
                       error:null
                    } 

                    default:
                        return state
    }




}


export const OrderDetailsReducer  = (state ={order:{},  isLoading:false, error:null,}, action ={} ) => {
    switch(action.type){

        case ORDER_ACTION_TYPE.ORDER_DETAILS_START:
            return {
               isLoading:true,
               
            }

            case ORDER_ACTION_TYPE.ORDER_DETAILS_SUCCESS:
                return {
                    isLoading:false,
                order :action.payload
                }

                case ORDER_ACTION_TYPE.ORDER_DETAILS_FAILED:
                    return {
                       isLoading:false, 
                       error:action.payload
                    } 

                    case ORDER_ACTION_TYPE.CLEAR_ERRORS:
                    return {
                        ...state,
                       error:null
                    } 

                    default:
                        return state
    }



    
}