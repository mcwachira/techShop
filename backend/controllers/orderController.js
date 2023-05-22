const Order =  require('../models/order')
const Product = require('../models/product');

const ErrorHandler = require('../utils/errorHandler')
const CatchAsyncErrors= require('../middlewares/catchAsyncErrors');
const product = require('../models/product');


exports.newOrder = CatchAsyncErrors(async(req, res, next) => {

    const {
        shippingInfo,
orderItems,
 paymentInfo,
   itemsPrice,
taxPrice,
shippingPrice,
totalPrice,
user ,
OrderStatus,

    } = req.body
    
    const order = await Order.create({
        shippingInfo,
        orderItems,
         paymentInfo,
           itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt:Date.now(),
        user:req.user._id
    })

    res.status(201).json({
        success:true,
   order
    })
})


// Get logged in user orders   =>   /api/v1/orders/me
exports.myOrders = CatchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find({ user: req.user.id })

    res.status(200).json({
        success: true,
        orders
    })
})



exports.allOrders = CatchAsyncErrors(async(req, res, next) =>{

    //number of orders tro display per page


    const orders = await Order.find()

    let totalAmount = 0;

    orders.forEach(order => {
        totalAmount += order.totalPrice
    })

    console.log(totalAmount)
    res.status(200).json({
        success: true,
        totalAmount,
        orders
    })
})


exports.getSingleOrder =  CatchAsyncErrors(async(req, res, next) =>{
    const id = req.params.id
    



        const order = await Order.findById(id).populate('user', 'name email') 

        if(!order){
            return next(new ErrorHandler('order with that id not found', 404))
        }


        res.status(200).json({
            success:true,
            message:'Order with id found',
            order
        
        })

    


})

exports.updateOrder = CatchAsyncErrors(async(req, res, next) =>{
    const id = req.params.id
    

        const order = await Order.findById(id)

        if(!order){
                      return next(new ErrorHandler('order with that id not found', 404))
        }
        if(order.OrderStatus === 'Delivered'){
            return next(new ErrorHandler('You have already delivered this product', 404))
        }

        //reducing the product quantity based on the order
        order.orderItems.forEach(async (item) =>  await updateStock(item.product, item.quantity))
  
        order.OrderStatus = req.body.status,
        order.deliveredAt = Date.now()

        await order.save()


        res.status(200).json({
            success:true,
      
        
        })

   


})


exports.deleteOrder = CatchAsyncErrors(async(req, res, next) =>{
    const id = req.params.id
    
    console.log(id)


        const order = await Order.findById(id)

        if(!order){
                      return next(new ErrorHandler('order with that id not found', 404))
        }
        const OrderToDelete = await Order.findByIdAndDelete(id)
        res.status(200).json({
            success:true,
            message:'order deleted successfully',
          
        
        })

   


})


//function to update stock
const updateStock = async(id, quantity)=> {
    console.log(quantity)

    const product = await Product.findById(id)

    product.stock = product.stock - quantity;
    console.log(product.stock)

    await product.save({validateBeforeSave:false})
}