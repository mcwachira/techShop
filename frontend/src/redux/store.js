import {createStore , combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { productReducer } from './reducers/product/productReducer'
import { productDetailsReducer } from './reducers/product/productDetailsReducer'
import { authReducer } from './reducers/user/authReducer'
import { userReducer } from './reducers/user/userReducer'
 import { forgotPasswordReducer } from './reducers/user/forgotPassword'
import { cartReducer } from './reducers/cart/cartReducer'



const reducer = combineReducers({
    products:productReducer,
    productDetails:productDetailsReducer,
    auth:authReducer,
    user:userReducer,
   forgotPassword:forgotPasswordReducer,
   cart:cartReducer,
})

let initialState = {
    cart:{
        cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) :[]
    }
}

const middleware=[thunk]
export const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))