const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/Middleware",{
});

const userSchema = mongoose.Schema({
    Product_Name:{
        type: String,
        required : true
    },
    MRP:{
        type: Number,
        required : true,
    },
    Rating:{
        type : Number
    },
    Number_of_orders: {
        type : Number
    }
})

const User = mongoose.model('User',userSchema);

module.exports =  User;