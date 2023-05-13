import { PRODUCTS_ACTION_TYPE } from "./productConstants"

const INITIAL_STATE = {
    isLoading:false,
    error:null,
    product:{},
    productsCount:null
}



export const productDetailsReducer  = (state =INITIAL_STATE, action ={} ) => {
    switch(action.type){

        case PRODUCTS_ACTION_TYPE.FETCH_PRODUCT_DETAILS_START:
            return {
               isLoading:true,
               products:{}
            }

            case PRODUCTS_ACTION_TYPE.FETCH_PRODUCT_DETAILS_SUCCESS:
                return {
                  
                   product:action.payload,
                   isLoading:false,
                }

                case PRODUCTS_ACTION_TYPE.FETCH_PRODUCT_DETAILS_FAILED:
                    return {
                       isLoading:false, error:action.payload
                    } 

                    case PRODUCTS_ACTION_TYPE.CLEAR_ERRORS:
                    return {
                       error:null
                    } 
                    default:
                        return state
    }

}