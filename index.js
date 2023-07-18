// const express = require('express');
// const app = express();
// const bodyParser = require('body-parser');
// const port = process.env.PORT || 8000;
// const { XMLParser, XMLBuilder, XMLValidator } = require("fast-xml-parser");
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.text({ type: 'application/xml' }));
// const User = require('./Database/mongo');
// const { gql } = require('apollo-server');
// const { ApolloServer } = require('apollo-server-express');
// const gqschema = require('./Database/graphql_schema');
// const resolvers = require('./resolvers')

// app.get('/', (req, res) => {
//     res.send("Hello!!");
// })

// async function startApolloServer() {
//     const server = new ApolloServer({ typeDefs: gqschema, resolvers: resolvers });
//     await server.start();

//     server.applyMiddleware({ app });

//     app.use(express.json());

//     app.post('/graphql', async (req, res) => {
//         const { query, variables } = req.body;

//         server
//             .executeOperation({ query, variables })
//             .then((response) => {
//                 res.json(response);
//             })
//             .catch((error) => {
//                 res.status(500).json({ error: 'Internal server error' });
//             });
//     });

//     app.post('/graphql', async (req, res) => {
//         const { Product_Name } = req.body;
//         res.send(req.body);
//         try {
//             const response = await server.executeOperation({
//                 query: `
//                   query GetProduct($Product_Name: String!) {
//                     getProduct(Product_Name: $Product_Name) {
//                       Product_Name
//                       MRP
//                       Rating
//                       Number_of_orders
//                     }
//                   }
//                 `,
//                 variables: { Product_Name },
//             });

//             if (response.errors) {
//                 return res.status(400).json({ errors: response.errors });
//             }

//             res.json(response.data);
//         } catch (error) {
//             console.error(error);
//             res.status(500).json({ error: 'Internal server error' });
//         }
//     });
// }

// startApolloServer().catch((error) => {
//     console.error('Error starting Apollo Server:', error);
// });

// app.post('/Json', async (req, res) => {
//     console.log(req.body);
//     const check = await User.findOne({ Product_Name: req.body.Product_Name });
//     if (check) {
//         res.send("Data of this Product is already present in our database...");
//     } else {
//         const addUser = User(req.body);
//         await addUser.save();
//         res.send("Data added successfully!!");
//     }
// });

// app.get('/Json', async (req, res) => {
//     console.log(req.query);
//     const data = await User.find(req.query);
//     if (!data || data.length == 0) {
//         res.send("No data found for this query..");
//     }
//     else
//     res.json(data);
// }); 

// app.post('/Xml', async (req, res) => {
//     const type_method = req.method;

//     if (type_method == 'POST') {
//         const parser = new XMLParser();
//         let jsonobj = parser.parse(req.body);
//         console.log(jsonobj);
//         const check = await User.findOne({ Product_Name: jsonobj.Product_Name });
//         if (check) {
//             res.send("Data with this Product is already present in the Database...");
//         } else {
//             const addUser = User(jsonobj);
//             await addUser.save();
//             res.send("Data added successfully!!");
//         }
//     }
// });

// app.get('/Xml', async (req, res) => {
//     console.log(req.query);
//     const data = await User.find(req.query);
//     if (!data || data.length == 0) {
//         res.send("No data found for this query..");
//     }
//     res.send("This feature is currently in the developing stage...");
// });

// app.listen(8000, () => {
//     console.log('Server is running on port no 8000...');
// });
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text({ type: 'application/xml' }));

const jsonRoutes = require('./Routes/Json_Api');
const xmlRoutes = require('./Routes/Xml_Api');

app.use('/json', jsonRoutes);
app.use('/xml', xmlRoutes);


const startApolloServer = require('./Routes/Graphql_Api');
startApolloServer(app).catch((error) => {
    console.error('Error starting Apollo Server:', error);
});
app.get('/', (req, res) => {
    res.send("Hello!!");
});

app.listen(port, () => {
    console.log(`Server is running on port no ${port}...`);
});
