import React, {useEffect , useState} from 'react'
import Loader from '../Layout/Loader'
import MetaData from '../Layout/metaData';
import { toast} from 'react-toastify'
import { Link , useNavigate} from 'react-router-dom';
import  {useSelector, useDispatch , } from 'react-redux'
import SideBar from './SideBar';
import { getAdminProducts } from '../../redux/reducers/product/productActions';


const DashBoard = () => {

    const dispatch =  useDispatch()

    const {products} = useSelector((state) => state?.products)
    console.log(products)

    let outOfStock = 0;
 products?.forEach((product) => {
        if(product.stock === 0){
            outOfStock +=1;
        }
    })
    useEffect(() => {

        dispatch(getAdminProducts())
    }, [dispatch])
        
        
        return (
    <>
    
    <MetaData title={'Admin Dashboard'}/>
    
   
    <div className="row">
            <div className="col-12 col-md-2">
             <SideBar/>
            </div>

            <div className="col-12 col-md-10">
                <h1 className="my-4">Dashboard</h1>
                        <div className="row pr-4">
                            <div className="col-xl-12 col-sm-12 mb-3">
                                <div className="card text-white bg-primary o-hidden h-100">
                                    <div className="card-body">
                                        <div className="text-center card-font-size">Total Amount<br /> <b>$4567</b>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row pr-4">
                            <div className="col-xl-3 col-sm-6 mb-3">
                                <div className="card text-white bg-success o-hidden h-100">
                                    <div className="card-body">
                                        <div className="text-center card-font-size">Products<br /> <b>{products && products.length}</b></div>
                                    </div>
                                    <Link className="card-footer text-white clearfix small z-1" to="/admin/products">
                                        <span className="float-left">View Details</span>
                                        <span className="float-right">
                                            <i className="fa fa-angle-right"></i>
                                        </span>
                                    </Link>
                                </div>
                            </div>


                            <div className="col-xl-3 col-sm-6 mb-3">
                                <div className="card text-white bg-danger o-hidden h-100">
                                    <div className="card-body">
                                        <div className="text-center card-font-size">Orders<br /> <b>125</b></div>
                                    </div>
                                    <Link className="card-footer text-white clearfix small z-1" to="/admin/orders">
                                        <span className="float-left">View Details</span>
                                        <span className="float-right">
                                            <i className="fa fa-angle-right"></i>
                                        </span>
                                    </Link>
                                </div>
                            </div>


                            <div className="col-xl-3 col-sm-6 mb-3">
                                <div className="card text-white bg-info o-hidden h-100">
                                    <div className="card-body">
                                        <div className="text-center card-font-size">Users<br /> <b>45</b></div>
                                    </div>
                                    <Link className="card-footer text-white clearfix small z-1" href="/admin/users">
                                        <span className="float-left">View Details</span>
                                        <span className="float-right">
                                            <i className="fa fa-angle-right"></i>
                                        </span>
                                    </Link>
                                </div>
                            </div>


                            <div className="col-xl-3 col-sm-6 mb-3">
                                <div className="card text-white bg-warning o-hidden h-100">
                                    <div className="card-body">
                                        <div className="text-center card-font-size">Out of Stock<br /> <b>{outOfStock}</b></div>
                                    </div>
                                </div>
                            </div>
                        </div>
            </div>
        </div>

</>
  )
}

export default DashBoard