import express, { Express } from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ExpressContextFunctionArgument } from '@apollo/server/express4';
import { mergeTypeDefs } from '@graphql-tools/merge';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import corsConfig from './utils/corsConfig';
import schemas from './schemas';
import resolvers from './resolvers';
import { GraphQLContext } from './types/contextType';

const app: Express = express();

const startApolloServer = async (): Promise<Express> => {
    const apolloServer = new ApolloServer<GraphQLContext>({
        introspection: process.env.NODE_ENV !== 'PROD',
        typeDefs: mergeTypeDefs(schemas),
        resolvers,
    });

    await apolloServer.start();

    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
    app.use(morgan('tiny'));
    app.use(cors(corsConfig()));

    app.use(
        '/graphql',
        expressMiddleware(apolloServer, {
            context: async ({ req }: ExpressContextFunctionArgument): Promise<GraphQLContext> => {
                return { req };
            },
        })
    );

    return app;
};

export default startApolloServer;
