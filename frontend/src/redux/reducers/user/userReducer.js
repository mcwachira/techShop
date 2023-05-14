import { USERS_ACTION_TYPE } from "./userConstants"

const INITIAL_STATE = {
    isLoading:false,
    isAuthenticated:false,
    error:null,
    user:{},
 
}



export const authReducer  = (state =INITIAL_STATE, action ={} ) => {
    switch(action.type){

        case USERS_ACTION_TYPE.LOGIN_START:
            case USERS_ACTION_TYPE.REGISTER_USER_START:
            return {
               isLoading:true,
               isAuthenticated:false,
            }

            case USERS_ACTION_TYPE.LOGIN_SUCCESS:
                case USERS_ACTION_TYPE.REGISTER_USER_SUCCESS:
                return {
                  ...state,
                   user:action.payload,
                   isAuthenticated:true,
                   isLoading:false,
                }

                case USERS_ACTION_TYPE.LOGIN_FAILED:
                    case USERS_ACTION_TYPE.REGISTER_USER_FAILED:
                    return {
                        ...state,
                       isLoading:false, 
                       isAuthenticated:false,
                       user:null,
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