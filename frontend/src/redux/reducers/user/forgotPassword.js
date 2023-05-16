import { USERS_ACTION_TYPE } from "./userConstants"

const INITIAL_STATE = {
// error:null


}



export const forgotPasswordReducer  = (state =INITIAL_STATE, action ={} ) => {
    switch(action.type){

        case USERS_ACTION_TYPE.FORGOT_PASSWORD_START:
        case USERS_ACTION_TYPE.NEW_PASSWORD_START:
         
            return {
                ...state,   
                isLoading:true,
               error:null
            }

            case USERS_ACTION_TYPE.FORGOT_PASSWORD_SUCCESS:
         
            return {
                ...state,
                isLoading:false,
               message:action.payload
            }
            case USERS_ACTION_TYPE.NEW_PASSWORD_SUCCESS:
         
            return {
                ...state,
               success:action.payload
            }

            case USERS_ACTION_TYPE.FORGOT_PASSWORD_FAILED:
                case USERS_ACTION_TYPE.NEW_PASSWORD_FAILED:
         
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