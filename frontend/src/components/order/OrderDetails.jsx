import React, {useEffect , useState} from 'react'
import  {useSelector, useDispatch , } from 'react-redux'
import Loader from '../Layout/Loader'
import MetaData from '../Layout/metaData';
import { toast} from 'react-toastify'
import { Link , useNavigate , useParams} from 'react-router-dom';
import { clearErrors, getOrderDetails } from '../../redux/reducers/orders/orderActions';
const OrderDetails = () => {

    const { isLoading, error, order={}  } = useSelector(state => state.orderDetails)
    console.log(order)
    const { shippingInfo, orderItems, paymentInfo, user, totalPrice, orderStatus } = order


    console.log(order)
    const  { id } = useParams();
    const dispatch = useDispatch()
    useEffect(() => {
      dispatch(getOrderDetails(id))
      if(error){
toast.error(error)
        dispatch(clearErrors())
      }
    }, [dispatch, id, error])


    const shippingDetails =  shippingInfo && `${shippingInfo.address}, ${shippingInfo.city} , ${shippingInfo.postalCode}, ${shippingInfo.country}`
  
    const isPaid = paymentInfo && paymentInfo.status ==='succeded' ? true: false
  
    return (

    <>
       <MetaData title={'my orders'}/>

<h1 className="mt-5"> My Orders </h1>
{isLoading ? <Loader/> : (
    <>
     <div className="container container-fluid">
	
    <div className="row d-flex justify-content-between">
                <div className="col-12 col-lg-8 mt-5 order-details">

                    <h1 className="my-5">Order # {order._id}</h1>

                    <h4 className="mb-4">Shipping Info</h4>
                    <p><b>Name:</b> {user  && user.name}</p>
                    <p><b>Phone:</b> {shippingInfo && shippingInfo.phoneNumber}</p>
                    <p className="mb-4"><b>Address:</b>{shippingDetails}</p>
                    <p><b>Amount:</b> {totalPrice}</p>

                    <hr />

                    <h4 className="my-4">Payment</h4>
                    <p className="greenColor" ><b>{paymentInfo && paymentInfo.status} </b></p>
                    <p className={isPaid? 'greenColor': "redColor"} >
                        <b>{isPaid ? 'PAID': 'NOT PAID'}</b>
                        </p>

                    <h4 className="my-4">Order Status:</h4>
                    <p className={order.OrderStatus && String(order.OrderStatus).includes('Delivered')? 'greenColor': "redColor"} >
                        <b>{orderStatus}</b>
                        </p>


                    <h4 className="my-4">Order Items:</h4>

                    <hr />
                    <div className="cart-item my-1">
                        {orderItems && orderItems.map((item) => (
 <div key={item.product} className="row my-5">
 <div className="col-4 col-lg-2">
     <img src={item.name} alt={item.name} height="45" width="65" />
 </div>

 <div className="col-5 col-lg-5">
     <Link to={`/products/${item.product}`}>{item.name}</Link>
 </div>


 <div className="col-4 col-lg-2 mt-4 mt-lg-0">
     <p>$ {item.price}</p>
 </div>

 <div className="col-4 col-lg-3 mt-4 mt-lg-0">
     <p>{item.quantity} Piece(s)</p>
 </div>
</div>
                        ))}
                               
                    </div>
                    <hr />
                </div>
            </div>
    
</div>
    
    </>
)
}
</>
   
  )
}

export default OrderDetails