import React, {useEffect} from 'react'
import  {useSelector, useDispatch} from 'react-redux'
 import MetaData from './Layout/metaData'
import { getProducts } from '../redux/reducers/product/productActions'
import Product from './product/product'
import Loader from './Layout/Loader'

const Home = () => {

  const {products, loading} = useSelector((state) => state.products)
  console.log(products)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch])
  return (
    <>
    {loading ? <Loader/> :(
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
</>

    )}
   </>
  )
}

export default Home