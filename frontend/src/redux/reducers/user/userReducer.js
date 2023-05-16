import { USERS_ACTION_TYPE } from "./userConstants"

const INITIAL_STATE = {
// isLoading:false,
// isUpdated:false,


}



export const userReducer  = (state =INITIAL_STATE, action ={} ) => {
    switch(action.type){

        case USERS_ACTION_TYPE.UPDATE_PROFILE_START:
            case USERS_ACTION_TYPE.UPDATE_PASSWORD_START:
         
            return {
                ...state,
               isLoading:true,
               isAuthenticated:false,
            }

            case USERS_ACTION_TYPE.UPDATE_PROFILE_SUCCESS:
                case USERS_ACTION_TYPE.UPDATE_PASSWORD_SUCCESS:
         
            return {
                ...state,
               isLoading:false,
               isUpdated:action.payload
            }

            case USERS_ACTION_TYPE.UPDATE_PROFILE_RESET:
                case USERS_ACTION_TYPE.UPDATE_PASSWORD_RESET:
         
            return {
                ...state,
               isUpdated:false
            
            }

            case USERS_ACTION_TYPE.UPDATE_PROFILE_FAILED:
                case USERS_ACTION_TYPE.UPDATE_PASSWORD_FAILED:
         
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