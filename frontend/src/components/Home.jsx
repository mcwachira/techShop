import React, {useEffect} from 'react'
import  {useSelector, useDispatch} from 'react-redux'
 import MetaData from './Layout/metaData'
import { clearErrors, getProducts } from '../redux/reducers/product/productActions'
import Product from './product/product'
import Loader from './Layout/Loader'
import { toast } from 'react-toastify'
import PaginatedItems from './Layout/PaginatedItems'


const Home = () => {

  const {products, isLoading , error, resultsPerPage} = useSelector((state) => state?.products)
  console.log(resultsPerPage)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProducts())

    if(error){
      toast.error(error)
              dispatch(clearErrors())
            }
  }, [dispatch])
  return (
    <>
    {isLoading ? <Loader/> :(
<>
<MetaData title={"Buy the best products Online"}/>
    
<h1 id="products_heading">Latest Products</h1>

<section id="products" className="container mt-5">
  <div className="row">
    {products &&products.map((product) => (
  <Product  key={product._id} product={product}/>
    ))

    }

    </div>


</section>

<div className='d-flex.justify-content-center mt-5'>

<PaginatedItems productsPerPage={2}products={products}/>
</div>
</>

    )}
   </>
  )
}

export default Home