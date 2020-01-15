import path from 'path';
import { makeExecutableSchema } from 'graphql-tools';
import { fileLoader, mergeResolvers, mergeTypes } from 'merge-graphql-schemas';


const allTypes = fileLoader(path.join(__dirname, '/api/**/*.graphql')); // 절대경로임. 
const allResolvers = fileLoader('./src/api/**/*.js');                   // 이렇게 앱의 상대경로로 해도됨.

const schema = makeExecutableSchema({
    typeDefs: mergeTypes(allTypes),
    resolvers: mergeResolvers(allResolvers)
});

export default schema;