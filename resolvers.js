const User = require('./Database/mongo');

module.exports =  {
    Query : {
        async getProduct(_,{Product_Name}){
            return await User.findOne({Product_Name : Product_Name});
        }
    },
    Mutation : {
        async AddProduct(_, { details }) {
            const { Product_Name, MRP, Rating, Number_of_orders } = details;
          
            const new_product = User({
              Product_Name: Product_Name,
              MRP: MRP,
              Rating: Rating,
              Number_of_orders: Number_of_orders
            });
          
            const response = await new_product.save();
          
            return {
              id: response._id, // Use _id instead of id for MongoDB's generated unique identifier
              ...response._doc
            };
          }
    }
}