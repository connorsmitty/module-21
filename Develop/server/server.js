const express = require('express');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./graphql');

const app = express();
const PORT = process.env.PORT || 3001;

// Use the express.urlencoded() middleware to parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

// Use the express.json() middleware to parse JSON request bodies
app.use(express.json());

// If we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// Create a new instance of the Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

// Apply the Apollo Server as middleware to the Express server
server.applyMiddleware({ app });

// Use the routes middleware
app.use(routes);

// Connect to the database
db.once('open', () => {
  // Start the server
  app.listen(PORT, () => {
    console.log(`🌍 Now listening on localhost:${PORT}`);
    console.log(`GraphQL API available at http://localhost:${PORT}${server.graphqlPath}`);
  });
});