// npm init -y && npm pkg set type="module"
// npm i @apollo/server graphql graphql-tag mongoose
// npm i --save-dev typescript @types/node @types/mongoose...
// npx tsc --init

import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import mongoose from 'mongoose';

// import <module> from '<module>.js' for ES module, (CommonJS: require('<module>'))
import typeDefs  from './schema/typeDefs.js';
import resolvers from './schema/resolvers.js';

const MONGODB = "creds";

// Apollo server

const server = new ApolloServer({
    typeDefs,
    resolvers,

    /* Older version: apollo-server
    formatResponse: (res: GraphQLResponse, requestContext: GraphQLRequestContext<any>) => {
        // Bug fixed: header: Content-Type: text/html
        // Set Content-Type header: application/json
        requestContext.response.http.headers.set('Content-Type', 'application/json');
        return res;
    }
    */
});


/*
mongoose.connect(MONGODB, {useNewUrlParser: true})
    .then(()=>{
        console.log("Connected to MongoDB");
        return server.listen({port: 5000});
    })
    .then(({url}) => {
        console.log(`Server is running on port ${url}`);
    })
    .catch((err: Error) => {
        console.error(err);
        process.exit(1);
    });
*/

const startServer = async () => {
    try {
        await mongoose.connect(MONGODB);
        console.log("Connected to MongoDB");

        // Start the Apollo server
        const { url } = await startStandaloneServer(server, { listen: { port: 5000 } });
        console.log(`Server is running on ${url}`);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};
startServer();