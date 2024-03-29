import React, {useEffect , useState} from 'react'
import  {useSelector, useDispatch , } from 'react-redux'
import { clearErrors, getProductsDetails } from '../../redux/reducers/product/productActions';
import Loader from '../Layout/Loader'
import MetaData from '../Layout/metaData';
import { toast} from 'react-toastify'
import { addItemsToCart ,removeItemsFromCart} from '../../redux/reducers/cart/cartAction';
import { Link , useNavigate} from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';

const Cart = () => {


    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {cartItems} = useSelector(state => state?.cart)
    console.log(cartItems)

    const increaseQty = (id, quantity, stock) => {


        const newQty  =  quantity +1 
        if(newQty >= stock) return ;

        dispatch(addItemsToCart(id, newQty))

    
    }



    const decreaseQty = (id, quantity) => {



        const newQty  =  quantity -1 
        if(newQty <=0) return ;

        dispatch(addItemsToCart(id, newQty))

    }


    const removeCartItemsHandler = (id) => {

        dispatch(removeItemsFromCart(id))
    }

    const checkoutHandler = () => {

        // navigate('/login?redirect=shipping')
      navigate('/shipping')
    }  
    
    return (
<>
{cartItems.length === 0   ? <h2  className='mt-5'>Your cart is Empty</h2> :
<>

<MetaData title={'Your Cart'}/>

 <div className="container container-fluid">
 <h2 className="mt-5">Your Cart: <b>{cartItems.length} items</b></h2> 
    
    <div className="row d-flex justify-content-between">
        <div className="col-12 col-lg-8">

            {cartItems.map((item) => (

<>
<hr/>
<div className="cart-item" key={item.product}>
                <div className="row">
                    <div className="col-4 col-lg-3">
                        <img src="./images/airpords.jpg" alt="Laptop" height="90" width="115"/>
                    </div>

                    <div className="col-5 col-lg-3">
                        <Link to={`/products/${item.product}`}>{item.name}</Link>
                    </div>


                    <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                        <p id="card_item_price">${item.price}</p>
                    </div>

                    <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                        <div className="stockCounter d-inline">
                            <span className="btn btn-danger minus" onClick={() => decreaseQty(item.product, item.quantity)}>-</span>
                            <input type="number" className="form-control count d-inline" value={item.quantity} readOnly />

                            <span className="btn btn-primary plus" onClick={() => increaseQty(item.product, item.quantity, item.stock)}>+</span>
                        </div>
                    </div>

                    <div className="col-4 col-lg-1 mt-4 mt-lg-0" onClick={() => removeCartItemsHandler(item.product)}>
                        <FaTrash id="delete_cart_item" size={40}/>
                    </div>

                </div>
            </div> 
</>
            ))}
            <hr />
   
        </div>

        <div className="col-12 col-lg-3 my-4">
            <div id="order_summary">
                <h4>Order Summary</h4>
                <hr />
                <p>Subtotal:  <span className="order-summary-values">
                    {cartItems.reduce((acc,item) =>  (acc + Number(item.quantity)), 0)} 
                (Units)</span></p>
                <p>Est. total: <span className="order-summary-values">
                    
                {cartItems.reduce((acc,item) =>  acc + item.quantity * item.price,0).toFixed(2)} 
                    </span></p>

                <hr />
                <button id="checkout_btn" className="btn btn-primary btn-block" onClick={checkoutHandler}>Check out</button>
            </div>
        </div>
    </div>
</div>
    
    
    
    
    
    
    </>
    }
</>
  
   
  )
}

export default Cart