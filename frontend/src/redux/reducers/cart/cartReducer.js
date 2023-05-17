import { CART_ACTION_TYPE } from "./cartConstants"

const INITIAL_STATE = {
    cartItems:[]
}

export const cartReducer = (state=INITIAL_STATE, action={}) => {
    switch(action.type){
        case CART_ACTION_TYPE.ADD_TO_CART:
            const item = action.payload
            const isItemExist = state.cartItems.find(i => i.product === item.product)

        if(isItemExist){
            return {
                ...state, 
                cartItems:state.cartItems.map((i) => i.product === isItemExist.product  ? item : i)           
             }
        }else{
            return {
                ...state,
                cartItems:[...state.cartItems, item]
            }
        }

        case CART_ACTION_TYPE.REMOVE_FROM_CART:
            
        return {
            ...state,
            cartItems:state.cartItems.filter((i) => i.product  !== action.payload)
        }


        default:
            return state
            
    }
}