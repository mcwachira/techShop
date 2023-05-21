import { PRODUCTS_ACTION_TYPE } from "./productConstants"

const INITIAL_STATE = {
    isLoading:false,
    error:null,
    products:[],
    productsCount:null,
    // product:{}
}



export const productReducer  = (state =INITIAL_STATE, action ={} ) => {
    switch(action.type){

        case PRODUCTS_ACTION_TYPE.FETCH_ALL_PRODUCTS_START:
            case PRODUCTS_ACTION_TYPE.ADMIN_PRODUCTS_START:
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

                case PRODUCTS_ACTION_TYPE.ADMIN_PRODUCTS_SUCCESS:
                    return {
                        isLoading:false, products:action.payload
                     } 
                case PRODUCTS_ACTION_TYPE.FETCH_ALL_PRODUCTS_FAILED:
                    case PRODUCTS_ACTION_TYPE.ADMIN_PRODUCTS_FAILED:
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

export const newReviewReducer  = (state={ isLoading:false, error:null, success:false}, action ={} ) => {
    switch(action.type){

        case PRODUCTS_ACTION_TYPE.NEW_REVIEW_DETAILS_START:
            return {
               isLoading:true,
               products:[]
            }

            case PRODUCTS_ACTION_TYPE.NEW_REVIEW_DETAILS_SUCCESS:
                return {
                  success:action.payload,
                   isLoading:false,
                }

                case PRODUCTS_ACTION_TYPE.NEW_REVIEW_DETAILS_FAILED:
                    return {
                       isLoading:false, error:action.payload
                    } 

                    case PRODUCTS_ACTION_TYPE.NEW_REVIEW_DETAILS_RESET:
                        return {
                            ...state,
                            success:false
                        }
                    case PRODUCTS_ACTION_TYPE.CLEAR_ERRORS:
                    return {
                       error:null
                    } 

                    default:
                        return state
    }

}


export const newProductReducer  = (state={ product:{},  success:false,    isLoading:false,
    error:null,}, action ={} ) => {
    switch(action.type){

        case PRODUCTS_ACTION_TYPE.NEW_PRODUCT_START:
            return {
                ...state,
               isLoading:true,
     
            }

            case PRODUCTS_ACTION_TYPE.NEW_PRODUCT_SUCCESS:
                return {
                  product:action.payload.product,
                  success:action.payload.success,
                   isLoading:false,
                }

                case PRODUCTS_ACTION_TYPE.NEW_PRODUCT_FAILED:
                    return {
                       isLoading:false, error:action.payload
                    } 

                    case PRODUCTS_ACTION_TYPE.NEW_PRODUCT_RESET:
                        return {
                            ...state,
                            success:false
                        }
            
                    case PRODUCTS_ACTION_TYPE.CLEAR_ERRORS:
                    return {
                       error:null
                    } 

                    default:
                        return state
    }

}
