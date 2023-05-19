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