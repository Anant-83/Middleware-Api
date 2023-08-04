const express = require('express');
const router = express.Router();
const User = require('../Database/mongo');
const { gql } = require('apollo-server');
const { ApolloServer } = require('apollo-server-express');
const gqschema = require('../Database/graphql_schema');
const resolvers = require('../resolvers')

    
async function startApolloServer(app) {
    const server = new ApolloServer({ typeDefs: gqschema, resolvers: resolvers });
    await server.start();

    server.applyMiddleware({ app });

    app.use(express.json());

    app.post('/graphql', async (req, res) => {
        const { query, variables } = req.body;

        server
            .executeOperation({ query, variables })
            .then((response) => {
                res.json(response);
            })
            .catch((error) => {
                res.status(500).json({ error: 'Internal server error' });
            });
    });

    app.post('/graphql', async (req, res) => {
        const { Product_Name } = req.body;
        res.send(req.body);
        try {
            const response = await server.executeOperation({
                query: `
                  query GetProduct($Product_Name: String!) {
                    getProduct(Product_Name: $Product_Name) {
                      Product_Name
                      MRP
                      Rating
                      Number_of_orders
                    }
                  }
                `,
                variables: { Product_Name },
            });

            if (response.errors) {
                return res.status(400).json({ errors: response.errors });
            }

            res.json(response.data);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });
}

module.exports = startApolloServer;
