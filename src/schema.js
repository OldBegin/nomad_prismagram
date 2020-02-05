// fileLoader를 이용하여 api폴더내의 스키마와 쿼리를 가져와서
// makeExecutableSchema를 이용하여 merge(병합)하고 병합된 schema를 export한다
// export 된 schema 만 외부에서 import 하면 api폴더내의 모든 query와 type(스키마)를 이용할수 있다.

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