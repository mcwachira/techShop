import {createStore , combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { productReducer } from './reducers/product/productReducer'
import { productDetailsReducer } from './reducers/product/productDetailsReducer'


const reducer = combineReducers({
    products:productReducer,
    productDetails:productDetailsReducer
})

let initialState = {}

const middleware=[thunk]
export const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))