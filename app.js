const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { mergeTypeDefs } = require('@graphql-tools/merge');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const corsConfig = require('./utils/corsConfig');
const schemas = require('./schemas/index');
const resolvers = require('./resolvers/index');

const app = express();

const startApolloServer = async () => {
    const apolloServer = new ApolloServer({
        introspection: process.env.NODE_ENV !== 'PROD',
        typeDefs: mergeTypeDefs(schemas),
        resolvers,
    });
    await apolloServer.start();
    app.use(bodyParser.json({ limit: '20480mb' }));
    app.use(bodyParser.urlencoded({ extended: true, limit: '20480mb' }));
    app.use(morgan('tiny'));
    app.use(cors(corsConfig()));

    app.use('/graphql', expressMiddleware(apolloServer, {
        context: ({ req }) => ({ req })
    }));
    return app;
};

module.exports = startApolloServer;