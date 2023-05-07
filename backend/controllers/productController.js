const Product = require ('../models/product')

//create a new product

exports.newProduct = async(req, res, next) =>{
    console.log(req.body)

    try {
        const product = await Product.create(req.body)
        console.log(product)
        res.status(201).json({
            success:true,
           product
        })
    } catch (error) {
        console.log('error while creating product', error)
        // return next(new AppError(`error${error}`), 401)
    }




}


exports.getProducts = async(req, res, next) =>{

    try{
        const allProducts = await Product.find()
        res.status(200).json({
            success:true,
            message:'This will show all the products',
            allProducts
        
        })

    }catch(error){
        console.log(error)
    }


}

exports.getSingleProduct = async(req, res, next) =>{
    const id = req.params.id
    


    try{
        const product = await Product.findById(id)

        if(!product){
            return res.status(404).json({
                success:false,
                message:'Product not found'
            })
        }


        res.status(200).json({
            success:true,
            message:'Product with id found',
            product
        
        })

    }catch(error){
        console.log(error)
    }


}

exports.updateProduct = async(req, res, next) =>{
    const id = req.params.id
    
    try{
        const product = await Product.findById(id)

        if(!product){
            return res.status(404).json({
                success:false,
                message:'Product not found'
            })
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

    }catch(error){
        console.log(error)
    }


}


exports.deleteProduct = async(req, res, next) =>{
    const id = req.params.id
    
    console.log(id)

    try{
        const product = await Product.findById(id)

        if(!product){
            return res.status(404).json({
                success:false,
                message:'Product not found'
            })
        }
        const ProductToDelete = await Product.findByIdAndDelete(id)
        res.status(200).json({
            success:true,
            message:'product deleted successfully',
          
        
        })

    }catch(error){
        console.log(error)
    }


}