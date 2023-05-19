import React, {useEffect , useState} from 'react'
import {countries} from 'countries-list'
import  {useSelector, useDispatch , } from 'react-redux'
import Loader from '../Layout/Loader'
import MetaData from '../Layout/metaData';
import { toast} from 'react-toastify'
import { saveShippingInfo} from '../../redux/reducers/cart/cartAction';
import { Link , useNavigate} from 'react-router-dom';
import CheckOutSteps from './CheckOutSteps';
import {useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement} from '@stripe/react-stripe-js'
import axios from 'axios';
import ConfirmOrder from './ConfirmOrder';


const options = {
    style:{
        base:{
            fontSize:'16px'
        },
        invalid:{
            color:'#9e2146'
        }
    }
}


const Payment = () => {

  const {user}= useSelector((state) => state.auth) 

    const stripe = useStripe()
    const elements = useElements()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'))

    const paymentData = {

      //amount in cents
      amount: Math.round(orderInfo.totalPrice *100)
    }


    const handlePayments = async (e) => {
      e.preventDefault()
      document.querySelector('#pay_btn').disabled = true

      let res;

      try{

        const config = {
          headers:{
            'Content-Type': 'application/json'
          }
        }

        res = await axios.post('/api/v1/payment/process', paymentData, config)

        const clientSecret = res.data.client_secret

        if(!stripe || !elements){
          return;
        }

        const results = await stripe.confirmCardPayment(clientSecret,{
          payment_method:{
            card:elements.getElement(CardNumberElement),
            billing_details:{
            name:user.name,
            email:user.email
            }
          }
        } )

        if(results.error){
          toast.error(results.error.message)
          document.querySelector('#pay_btn').disabled = false
        }else{

          //process payment
          if(results.paymentIntent.status === 'succeeded'){
            navigate('/success')
          }else {
            toast.error('there is some issue during payment processing')
          }
        }

      }catch(error){
        toast.error(error.response.data.message)
        document.querySelector('#pay_btn').disabled = false
      }

    }
  return (
    <>

<CheckOutSteps shippingInfo ConfirmOrder  payment/>
    <MetaData title={'payment'}/>

<div className="row wrapper">
    <div className="col-10 col-lg-5">
        <form className="shadow-lg" onSubmit={handlePayments}>
            <h1 className="mb-4">Card Info</h1>
            <div className="form-group">
              <label htmlFor="card_num_field">Card Number</label>
              <CardNumberElement
                type="text"
                id="card_num_field"
                className="form-control"
                value=""
                options={options}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="card_exp_field">Card Expiry</label>
              <CardExpiryElement
                type="text"
                id="card_exp_field"
                className="form-control"
                value=""
                options={options}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="card_cvc_field">Card CVC</label>
              <CardCvcElement
                type="text"
                id="card_cvc_field"
                className="form-control"
                value=""
                options={options}
              />
            </div>
  
        
            <button
              id="pay_btn"
              type="submit"
              className="btn btn-block py-3"
            >
              Pay {`- ${orderInfo && orderInfo.totalPrice}`}
            </button>

          </form>
          </div>
    </div>
    </>
  
  )
}

export default Payment