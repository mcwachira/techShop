const Product = require ('../models/product')
const ErrorHandler  = require('../utils/errorHandler')
const CatchAsyncErrors= require('../middlewares/catchAsyncErrors')
const asyncHandler = require('express-async-handler')
const APIFeatures = require('../utils/apiFeatures')
const product = require('../models/product')
const cloudinary = require('cloudinary').v2;




//create a new product

exports.newProduct =  CatchAsyncErrors(async(req, res, next) =>{

    let images = [];
    if(typeof req.body.images === 'string') {
        images.push(req.body.images)
    }else{
        images = req.body.images
    }


    let imagesLinks = [];

    for(let i =0; i<images.length;i++){
        const results = await cloudinary.uploader.upload(images[i], {
            folder: "products"
        })

        imagesLinks.push({
            public_id:results.public.id,
            url:results.secure_url
        })
    }


  

    req.body.images = imagesLinks
     req.body.user = req.user.id
        const product = await Product.create(req.body)
        console.log(product)
        res.status(201).json({
            success:true,
           product
        })
    



})


exports.getProducts =CatchAsyncErrors(async(req, res, next) =>{

    //number of products tro display per page
    const resultsPerPage = 8;

    //product count
    const productCount = await Product.countDocuments()

    //find product by  search term
    const  apiFeatures= new APIFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultsPerPage) //pagination reduces time teken to fetch items as we only fetch a number of items


        const products = await apiFeatures.query 
        console.log(products)
        res.status(200).json({
            success:true,
            message:'This will show all the products',
           products,
            productCount,
            resultsPerPage
        
        })


})


//get admin products /api/v1/admin/products
exports.getAdminProducts =CatchAsyncErrors(async(req, res, next) =>{


        const products = await Product.find()
        res.status(200).json({
            success:true,

           products,

        })


})

exports.getSingleProduct =  CatchAsyncErrors(async(req, res, next) =>{
    const id = req.params.id
    



        const product = await Product.findById(id) 

        if(!product){
            return next(new ErrorHandler('product with that id not found', 404))
        }


        res.status(200).json({
            success:true,
            message:'Product with id found',
            product
        
        })

    


})


exports.updateProduct = CatchAsyncErrors(async(req, res, next) =>{
    const id = req.params.id
    

        const product = await Product.findById(id)

        if(!product){
                      return next(new ErrorHandler('product with that id not found', 404))
        }

        const ProductToUpdate = await Product.findByIdAndUpdate(id, req.body ,{

            new:true,
            runValidators:true,
            useFindAndModify:false,
        })
        res.status(200).json({
            success:true,
            message:'This will update the product',
            ProductToUpdate
        
        })

   


})


exports.deleteProduct = asyncHandler(async(req, res, next) =>{
    const id = req.params.id
    
    console.log(id)


        const product = await Product.findById(id)

        if(!product){
                      return next(new ErrorHandler('product with that id not found', 404))
        }
        const ProductToDelete = await Product.findByIdAndDelete(id)
        res.status(200).json({
            success:true,
            message:'product deleted successfully',
          
        
        })

   


})





//REWVIEWS


//create product review
exports.createProductReview =  CatchAsyncErrors(async(req, res, next) =>{
const {
    rating,
    comment,
    productId,
} = req.body
    

const review = {
    user:req.user._id,
    name:req.user.name ,
    rating:Number(rating),
    comment
}

//find product reviewed to update its review

const product = await Product.findById(productId);


const isReviewed  = product.reviews.find(
    review => review.user.toString() === req.user._id.toString()
)

//checks if the product has been reviewed and updates the review

if(isReviewed){
    product.reviews.forEach((review) => {
        if(review.user.toString() === req.user._id.toString()){
            review.comment = comment,
            review.rating = rating
        }

    })

}else{
product.reviews.push(review);
product.numOfReviews =  product.reviews.length;
}


//average reviews

product.rating = product.reviews.reduce((acc, item) => (item.rating + acc)/ product.reviews.length)

 await product.save({validateBeforeSave:false})

 res.status(200).json({
    success:true,

 })
})


exports.getProductsReviews =   CatchAsyncErrors(async(req, res, next) =>{


    const productId = req.query.id

    const product = await Product.findById(productId);
        res.status(200).json({
            success:true,
           reviews:product.reviews
        
        })


})


exports.deleteProductReview = asyncHandler(async(req, res, next) =>{



        const product = await Product.findById(req.query.productId)
        console.log(product)

        if(!product){
                      return next(new ErrorHandler('product with that id not found', 404))
        }

//   const reviews = product.reviews.filter( review => review.user.toString() === req.user._id.toString() )
        const reviews = product.reviews.filter(
            review => review._id.toString() !==req.query.id
        )

        const numOfReviews =  reviews.length;
        const ratings =product.reviews.reduce((acc, item) => (item.rating + acc)/ reviews.length)
       
      
        await Product.findByIdAndUpdate(req.query.productId, {
            reviews,
            ratings,
            numOfReviews
        }, {
            new:true,
            runValidators:true,
            useFindAndModify:false
        })

   
        res.status(200).json({
            success:true,
            message:'review deleted successfully',
          
        
        })



})