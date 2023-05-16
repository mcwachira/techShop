import { PRODUCTS_ACTION_TYPE } from "./productConstants"

const INITIAL_STATE = {
    isLoading:false,
    error:null,
    products:[],
    productsCount:null
}



export const productReducer  = (state =INITIAL_STATE, action ={} ) => {
    switch(action.type){

        case PRODUCTS_ACTION_TYPE.FETCH_ALL_PRODUCTS_START:
            return {
               isLoading:true,
               products:[]
            }

            case PRODUCTS_ACTION_TYPE.FETCH_ALL_PRODUCTS_SUCCESS:
                return {
                  
                   products:action.payload.products,
                   productsCount:action.payload.productsCount,
                   isLoading:false,
                }

                case PRODUCTS_ACTION_TYPE.FETCH_ALL_PRODUCTS_FAILED:
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