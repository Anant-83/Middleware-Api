const { gql } = require('apollo-server');

module.exports = gql`
  type ProductDetails {
    Product_Name: String
    MRP: Int
    Rating: Int
    Number_of_orders: Int
  }

  input ProductInput {
    Product_Name: String
    MRP: Int
    Rating: Int
    Number_of_orders: Int
  }

  type Query {
    getProduct(Product_Name: String!): ProductDetails
  }

  type Mutation {
    AddProduct(details: ProductInput): ProductDetails!
  }
`;
