import React, {useEffect , useState} from 'react'
import  {useSelector, useDispatch , } from 'react-redux'
import Loader from '../Layout/Loader'
import MetaData from '../Layout/metaData';
import { toast} from 'react-toastify'
import { Link , useNavigate} from 'react-router-dom';
import {MDBDataTable} from 'mdbreact'
import { getAdminProducts, clearErrors } from '../../redux/reducers/product/productActions';
import SideBar from './SideBar';




const ProductList = () => {
    const {isLoading, products, error} =  useSelector((state) => state.products)
    console.log(products)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    

    useEffect(() => {

        dispatch(getAdminProducts())

        if(error){
            toast.error(error)
            dispatch(clearErrors(error))
        }
    },[dispatch, error])
    

    const setProducts= () => {

        const data = {
            columns:[
              {  label:'Product ID',
                field:'id',
                sort:'asc'
            },
            {
                  label:'Name ',
            field:'name',
            sort:'asc'
        },
        {  label:'Price',
        field:'price',
        sort:'asc'
    },
    { 
         label:'Stock',
    field:'stock',
    sort:'asc'
},
{ 
    label:'Actions',
field:'actions',
// sort:'asc'
},
            ],
            rows:[]
        }

        products.forEach((product) => {
            data.rows.push({
                id:product._id,
                name:product.name,
                price:`$${product.price}`,
                stock:product.stock,

                actions:
                
                <>
                 <Link to={`/products/${product._id}`} className='btn btn-primary py-1 px-2'>
                    <i className='fa fa-pencil'></i>
                </Link>

                <button className="btn btn-danger py-1 px-2 ml-2">
                <i className='fa fa-trash'></i>

                </button>
                </>
               
            })
        })


        return data
    }
    return (
   <>
   
   <div className="row">

<div className="col-12 col-md-2">
    <SideBar/>
</div>
<div className="col-12 col-md-10">
    <h1 className="my-5">
        All Products
    </h1>
    {isLoading ? <Loader/> : (
        <>
        <MDBDataTable data={setProducts()} className='px-3' bordered striped hover/>
        </>
    )}
</div>
   </div>
   </>

  )
}

export default ProductList