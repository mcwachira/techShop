const Product = require ('../models/product')
const ErrorHandler  = require('../utils/errorHandler')
const CatchAsyncErrors= require('../middlewares/catchAsyncErrors')
const asyncHandler = require('express-async-handler')
const APIFeatures = require('../utils/apiFeatures')
const product = require('../models/product')




//create a new product

exports.newProduct =  asyncHandler(async(req, res, next) =>{
    console.log(req.body)


     req.body.user = req.user.id
        const product = await Product.create(req.body)
        console.log(product)
        res.status(201).json({
            success:true,
           product
        })
    



})


exports.getProducts = asyncHandler(async(req, res, next) =>{

    //number of products tro display per page
    const resultsPerPage = 4;

    //product count
    const productCount = await Product.countDocuments()

    //find product by  search term
    const  apiFeatures= new APIFeatures(product.find(), req.query).search().filter().pagination(resultsPerPage)


        const allProducts = await apiFeatures.query 
        res.status(200).json({
            success:true,
            message:'This will show all the products',
            allProducts,
            productCount
        
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