import React, {useEffect , useState} from 'react'
import  {useSelector, useDispatch , } from 'react-redux'
import { useParams } from 'react-router-dom';
import { clearErrors, getProductsDetails, newReview } from '../../redux/reducers/product/productActions';
import Loader from '../Layout/Loader'
import MetaData from '../Layout/metaData';
import { toast} from 'react-toastify'
import {FaStar} from 'react-icons/fa'
import { Carousel } from 'react-bootstrap';
import { addItemsToCart } from '../../redux/reducers/cart/cartAction';
import { PRODUCTS_ACTION_TYPE } from '../../redux/reducers/product/productConstants';
import ListReviews from '../review/ListReviews';

const ProductDetails = () => {
    const  { id } = useParams();

    const [quantity, setQuantity]= useState(1)
    const [rating, setRating]= useState(0)

    const [comment, setComment]= useState("")



    // console.log(id)
   
    const dispatch = useDispatch()


    const {product,isLoading, error} = useSelector((state) => state.productDetails)
    
    const {error:reviewError,success} = useSelector((state) => state.newReview)
    const {user} = useSelector((state) => state.auth)
    // console.log(product)


    useEffect(() => {
      dispatch(getProductsDetails(id))
      if(error){
toast.error(error)
        dispatch(clearErrors())
      }

      if(reviewError){
        toast.error(reviewError)
                dispatch(clearErrors())
              }

              if(success){
                toast.success('Review Posted succesfully')
                dispatch({type:PRODUCTS_ACTION_TYPE.NEW_REVIEW_DETAILS_RESET})
              }


    }, [dispatch, id, reviewError, success, error])


    const increaseQty = () => {

        const count = document.querySelector('.count')
        if(count.valueAsNumber >= product.stock) return

        const qty = count.valueAsNumber + 1
        setQuantity(qty)
    
    
    }



    const decreaseQty = () => {

        const count = document.querySelector('.count')
        if(count.valueAsNumber <= 1) return

        const qty = count.valueAsNumber - 1
        setQuantity(qty)
    
    }
 
    const addToCart =() => {
        dispatch(addItemsToCart(id, quantity))
        console.log('clicked')
        toast.success('product added successfully')


    }

    function setUserRatings() {
        const stars = document.querySelectorAll('.star');

        stars.forEach((star, index) => {
            star.starValue = index + 1;

            ['click', 'mouseover', 'mouseout'].forEach(function (e) {
                star.addEventListener(e, showRatings);
            })
        })

        function showRatings(e) {
            stars.forEach((star, index) => {
                if (e.type === 'click') {
                    if (index < this.starValue) {
                        star.classList.add('orange');

                        setRating(this.starValue)
                    } else {
                        star.classList.remove('orange')
                    }
                }

                if (e.type === 'mouseover') {
                    if (index < this.starValue) {
                        star.classList.add('yellow');
                    } else {
                        star.classList.remove('yellow')
                    }
                }

                if (e.type === 'mouseout') {
                    star.classList.remove('yellow')
                }
            })
        }
    }

    const reviewHandler = () => {
        const formData = new FormData();

        formData.set('rating', rating);
        formData.set('comment', comment);
        formData.set('productId', id);

        dispatch(newReview(formData));
    }


  return (

    <>
        <MetaData title={product?.name || 'product'}/>
 {isLoading ? <Loader/>: (
      <>
      <MetaData title={product?.name || 'product'}/>
    <div className="row f-flex justify-content-around">
    <div className="col-12 col-lg-5 img-fluid" id="product_image">
        <Carousel pause='hover'>
            {product.image && product.image.map((image) => (
                <Carousel.Item key={image.public._id}>
                    <img className='d-block w-100' src={image.url} alt={product.title}/>
                </Carousel.Item>
            ))}
        </Carousel>

    </div>

    <div className="col-12 col-lg-5 mt-5">
        <h3>{product.details}</h3>
        <p id="product_id">Product # {product._id}</p>

        <hr/>

        <div className="rating-outer">
            <div className="rating-inner"  style={{width:`${(product.ratings/5) * 100}%`}}></div>
        </div>
        <span id="no_of_reviews">({product.numOfReviews})</span>

        <hr/>

        <p id="product_price">${product.price}</p>
        <div className="stockCounter d-inline">
            <span className="btn btn-danger minus" onClick={decreaseQty}>-</span>

            <input type="number" className="form-control count d-inline" value={quantity} readOnly />

            <span className="btn btn-primary plus" onClick={increaseQty}>+</span>
        </div>
         <button type="button" id="cart_btn" className="btn btn-primary d-inline ml-4" disabled={product.stock ==0} onClick={addToCart}>Add to Cart</button>

        <hr/>

        <p>Status: <span id="stock_status" className={product.stock > 0 ? 'greenColor':'redColor'}>{product.stock > 0 ? 'In stock' : 'Out of Stock'}</span></p>

        <hr/>

        <h4 className="mt-2">Description:</h4>
        <p>{product.description}</p>
        <hr/>

        <p id="product_seller mb-3">Sold by: <strong>{product.seller}</strong></p>
        
        {user ?        <button onClick={setUserRatings}  id="review_btn" type="button" className="btn btn-primary mt-4" data-toggle="modal" data-target="#ratingModal">
                    Submit Your Review
        </button>  :
        <div className='alert alert-danger mt-5' type='alert'>Login to post your review</div> }
 
        
        <div className="row mt-2 mb-5">
            <div className="rating w-50">

                <div className="modal fade" id="ratingModal" tabIndex="-1" role="dialog" aria-labelledby="ratingModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="ratingModalLabel">Submit Review</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">

<ul className="stars" >
    <li className="star"><i className="fa fa-star"></i></li>
    <li className="star"><i className="fa fa-star"></i></li>
    <li className="star"><i className="fa fa-star"></i></li>
    <li className="star"><i className="fa fa-star"></i></li>
    <li className="star"><i className="fa fa-star"></i></li>
</ul>

                                <textarea name="review" id="review" className="form-control mt-3" value={comment} onChange={(e) => setComment(e.target.value)}>

                                </textarea>

                                <button className="btn my-3 float-right review-btn px-4 text-white" data-dismiss="modal" aria-label="Close"  onClick={reviewHandler}>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
                
    </div>

</div>

</div>

{product.reviews && product.reviews.length > 0 && (
                        <ListReviews reviews={product.reviews} />
                    )}

</>
 )}
   

   </>
  )
}

export default ProductDetails