import {createStore , combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { productReducer } from './reducers/product/productReducer'
import { productDetailsReducer } from './reducers/product/productDetailsReducer'
import { authReducer } from './reducers/user/authReducer'
import { userReducer } from './reducers/user/userReducer'
 import { forgotPasswordReducer } from './reducers/user/forgotPassword'
import { cartReducer } from './reducers/cart/cartReducer'
import { newOrderReducer } from './reducers/orders/orderReducer'



const reducer = combineReducers({
    products:productReducer,
    productDetails:productDetailsReducer,
    auth:authReducer,
    user:userReducer,
   forgotPassword:forgotPasswordReducer,
   cart:cartReducer,
   newOrder:newOrderReducer
})

let initialState = {
    cart:{
        cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) :[],
        shippingInfo:localStorage.getItem('shippingInfo') ?  JSON.parse(localStorage.getItem('shippingInfo')) :{},
    }

}

const middleware=[thunk]
export const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))