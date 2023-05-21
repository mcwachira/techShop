import React, {  useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'
import { useDispatch, useSelector } from 'react-redux'

import { toast } from 'react-toastify'
import MetaData from '../Layout/metaData'
import SideBar from './SideBar'
import Loader from '../Layout/Loader'
import { allOrders, clearErrors, deleteOrder } from '../../redux/reducers/orders/orderActions'
import { ORDER_ACTION_TYPE } from '../../redux/reducers/orders/orderConstants'

const OrdersList = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isLoading, error, orders } = useSelector(state => state.allOrders);
    const { isDeleted } = useSelector(state => state.order)

    useEffect(() => {
        dispatch(allOrders());

        if (error) {
            toast.error(error);
            dispatch(clearErrors())
        }

        if (isDeleted) {
            toast.success('Order deleted successfully');
            navigate('/admin/orders');
            dispatch({ type: ORDER_ACTION_TYPE.DELETE_ORDER_RESET })
        }

    }, [dispatch,error, navigate , isDeleted])

    const deleteOrderHandler = (id) => {
        dispatch(deleteOrder(id))
    }

    const setOrders = () => {
        const data = {
            columns: [
                {
                    label: 'Order ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'No of Items',
                    field: 'numofItems',
                    sort: 'asc'
                },
                {
                    label: 'Amount',
                    field: 'amount',
                    sort: 'asc'
                },
                {
                    label: 'Status',
                    field: 'status',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }

        orders.forEach(order => {
            data.rows.push({
                id: order._id,
                numofItems: order.orderItems.length,
                amount: `$${order.totalPrice}`,
                status: order.orderStatus && String(order.orderStatus).includes('Delivered')
                    ? <p style={{ color: 'green' }}>{order.OrderStatus}</p>
                    : <p style={{ color: 'red' }}>{order.OrderStatus}</p>,
                actions: <>
                    <Link to={`/admin/order/${order._id}`} className="btn btn-primary py-1 px-2">
                        <i className="fa fa-eye"></i>
                    </Link>
                    <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteOrderHandler(order._id)}>
                        <i className="fa fa-trash"></i>
                    </button>
                </>
            })
        })

        return data;
    }


    return (
        <>
            <MetaData title={'All Orders'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <SideBar />
                </div>

                <div className="col-12 col-md-10">
                    <>
                        <h1 className="my-5">All Orders</h1>

                        {isLoading ? <Loader /> : (
                            <MDBDataTable
                                data={setOrders()}
                                className="px-3"
                                bordered
                                striped
                                hover
                            />
                        )}

                    </>
                </div>
            </div>

        </>
    )
}

export default OrdersList