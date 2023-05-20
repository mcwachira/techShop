import React, {useEffect , useState} from 'react'
import  {useSelector, useDispatch , } from 'react-redux'
import Loader from '../Layout/Loader'
import MetaData from '../Layout/metaData';
import { toast} from 'react-toastify'
import { Link , useNavigate} from 'react-router-dom';
import {MDBDataTable} from 'mdbreact'


import {myOrders, clearErrors } from '../../redux/reducers/orders/orderActions';

const ListOrders = () => {

    const {isLoading, orders, error} =  useSelector((state) => state.myOrders)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    

    useEffect(() => {

        dispatch(myOrders())

        if(error){
            toast.error(error)
            dispatch(clearErrors(error))
        }
    },[dispatch, error])
    

    const setOrders= () => {

        const data = {
            columns:[
              {  label:'Order ID',
                field:'id',
                sort:'asc'
            },
            {
                  label:'Num of Items ',
            field:'numOfItems',
            sort:'asc'
        },
        {  label:'Amount',
        field:'amount',
        sort:'asc'
    },
    { 
         label:'Status',
    field:'status',
    sort:'asc'
},
{ 
    label:'Actions',
field:'actions',
sort:'asc'
},
            ],
            rows:[]
        }

        orders.forEach((order) => {
            data.rows.push({
                id:order._id,
                numOfItems:order.orderItems.length,
                amount:`$${order.totalPrice}`,
                status:order.orderStatus && String(order.orderStatus).includes('Delivered') 
                ? <p style={{color:'green'}}>{order.OrderStatus}</p>
                : <p style={{color:'red'}}>{order.OrderStatus}</p>,

                actions:<Link to={`/orders/${order._id}`} className='btn btn-primary'>
                    <i className='fa fa-eye'></i>
                </Link>
            })
        })


        return data
    }
    return (
    <>
    <MetaData title={'my orders'}/>

    <h1 className="mt-5"> My Orders </h1>
    {isLoading ? <Loader/> : (
        <>
        <MDBDataTable data={setOrders()} className='px-3' bordered striped hover/>
        </>
    )}


    </>
  )
}

export default ListOrders