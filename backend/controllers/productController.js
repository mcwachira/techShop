const Product = require ('../models/product')

//create a new product

exports.newProduct = async(req, res, next) =>{

    const product = await Product.create(req.body)

    res.status(201).json({
        success:true,
       product
    })
}


exports.getProduct = async(req, res, next) =>{
res.status(200).json({
    success:true,
    message:'This will show all the products'
})

}