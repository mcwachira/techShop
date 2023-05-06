const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type:String,
        required:[true, 'Please enter a product name'],
        maxLength:[100, 'product Name cannot exceed 100 characters'],
        default:0.0,

    },
    price: {
        type:Number,
        required:[true, 'Please enter  product price'],
        maxLength:[5, 'product price cannot exceed 5 characters']

    },

    description:{
        type:String,
        required:[true, 'Please enter a product description'],
  

    },
  
    rating:{
        type:Number,
        default:0.0,

    },
    images: [
        {
            public_id:{
                type:String,
                required:true,
            },
            url:{
                type:String,
                required:true,
            }
        }
    ],
    category:{ 
        type:String,
        required:[true, 'Please select category for this product'],
        enum:{
            values:[
                'Electronics',
                'Cameras',
                'Laptops',
                'Accessories',
                'Headphones',
                'Food',
                'Books',
                'Clothes/Shoes',
                'Sports',
                'Home',
            ],
            message:'Please select correct category for the product'
        }
    
    
    },
    stock: {
        type:Number,
        required:[true, 'Please enter  product stock'],
        maxLength:[5, 'product price cannot exceed 5 characters'],
        default:0

    },

    seller:{
        type:String,
        required:[true, 'Please enter product seller'],
  

    },
  
    numOfReviews:{
        type:Number,
        default:0,

    },
    reviews:[
        {
            name:{
                type:String,
                required:true,
            },
            rating:{
                type:Number,
                required:true,
            },
            comment:{
                type:String,
                required:true,
            }
        }
    ]
},
{ timestamps: true }
)

module.exports=mongoose.model('Product' ,productSchema)