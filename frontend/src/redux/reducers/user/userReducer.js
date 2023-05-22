import { USERS_ACTION_TYPE } from "./userConstants"

const INITIAL_STATE = {
isLoading:false,
isDeleted:false,
isUpdated:false,
isAuthenticated:false,


}



export const userReducer  = (state =INITIAL_STATE, action ={} ) => {
    switch(action.type){

        case USERS_ACTION_TYPE.UPDATE_PROFILE_START:
            case USERS_ACTION_TYPE.UPDATE_PASSWORD_START:
                case USERS_ACTION_TYPE.UPDATE_USERS_START:
                    case USERS_ACTION_TYPE.DELETE_USERS_START:
         
            return {
                ...state,
               isLoading:true,
               isAuthenticated:false,
            }

            case USERS_ACTION_TYPE.UPDATE_PROFILE_SUCCESS:
                case USERS_ACTION_TYPE.UPDATE_PASSWORD_SUCCESS:
                    case USERS_ACTION_TYPE.UPDATE_USERS_SUCCESS:
         
            return {
                ...state,
               isLoading:false,
               isUpdated:action.payload
            }

            case USERS_ACTION_TYPE.DELETE_USERS_SUCCESS:
                return {
                    ...state,
                   isDeleted:action.payload
                }


            case USERS_ACTION_TYPE.UPDATE_PROFILE_RESET:
                case USERS_ACTION_TYPE.UPDATE_PASSWORD_RESET:
                    case USERS_ACTION_TYPE.UPDATE_USERS_RESET:
         
            return {
                ...state,
               isUpdated:false
            
            }

            case USERS_ACTION_TYPE.DELETE_USERS_RESET:
                return {
                    ...state,
                   isDeleted:false
                }

                case USERS_ACTION_TYPE.UPDATE_PASSWORD_FAILED:
                    case USERS_ACTION_TYPE.UPDATE_USERS_FAILED:
                        case USERS_ACTION_TYPE.DELETE_USERS_FAILED:
         
            return {
                ...state,
               isLoading:false,
               error:action.payload
            }

                    case USERS_ACTION_TYPE.CLEAR_ERRORS:
                    return {
                       error:null
                    } 

                    default:
                        return state
    }

}

export const allUsersReducer  = (state ={
    users:[],
    isLoading:false,
    error:null

}, action ={} ) => {
    switch(action.type){

        case USERS_ACTION_TYPE.FETCH_ALL_USERS_START:
            return {
                ...state,
               isLoading:true,
               
            }

            case USERS_ACTION_TYPE.FETCH_ALL_USERS_SUCCESS:
                return {
                  
                    ...state,
                   users:action.payload,
                
                   isLoading:false,
                }

                case USERS_ACTION_TYPE.FETCH_ALL_USERS_FAILED:
             
                    return {
                        ...state,
                       isLoading:false, 
                       error:action.payload
                    } 

                    case USERS_ACTION_TYPE.CLEAR_ERRORS:
                    return {
                        ...state,
                        error: null
                    } 

                    default:
                        return state
    }

}



export const userDetailsReducer  = (state =INITIAL_STATE, action ={} ) => {
    switch(action.type){

        case USERS_ACTION_TYPE.UPDATE_USERS_START:
            return {
               isLoading:true,
               products:{}
            }

            case USERS_ACTION_TYPE.UPDATE_USERS_SUCCESS:
                return {
                  
                   product:action.payload,
                   isLoading:false,
                }

                case USERS_ACTION_TYPE.UPDATE_USERS_FAILED:
                    return {
                       isLoading:false, error:action.payload
                    } 

                    case USERS_ACTION_TYPE.CLEAR_ERRORS:
                    return {
                       error:null
                    } 
                    default:
                        return state
    }

}