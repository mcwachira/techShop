import axios from "axios"
import { CART_ACTION_TYPE } from "./cartConstants"

export const addItemsToCart = (id, quantity) => async(dispatch, getState) => {
    const {data} = await axios.get(`/api/v1/product/${id}`)


    dispatch({
        type:CART_ACTION_TYPE.ADD_TO_CART,
        payload:{
            product:data.product._id,
            name:data.product.name,
            price:data.product.price,
            image:data.product.images[0].url,
            stock:data.product.stock,
            quantity

        }
    })



    //save the cart to local storage
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))


}

export const removeItemsFromCart = (id ) => async(dispatch, getState) => {
    const {data} = await axios.get(`/api/v1/product/${id}`)


    dispatch({
        type:CART_ACTION_TYPE.REMOVE_FROM_CART,
        payload:id
    })



    //save the cart to local storage
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))


}

export const  saveShippingInfo = (data ) => async(dispatch) => {
    


    dispatch({
        type:CART_ACTION_TYPE. SAVE_SHIPPING_INFO,
        payload:data
    })



    //save the cart to local storage
    localStorage.setItem('shippingInfo', JSON.stringify(data))


}