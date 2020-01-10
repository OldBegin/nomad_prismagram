/*
api 폴더내에 Schema(.graphql) 와 resolve(.js) 를 짝을지어 생성해 놓고나서
여기서 합병하여 export함. 
*/

import { makeExcutableSchema } from "graphql-tools"; // 합병을 실행하기 위해 필요한 모듈
import { fileLoader, mergeResolvers, mergeTypes } from "merge-graphql-schemas"; //type들과 resolve들을 schema에 합병하기 위한 모듈패키지
import path from "path";

const allTypes = fileLoader(path.join(__dirname,"/api/**/*.graphql")); //api/모든폴더/ .graphql 확장자를 가진 파일을 로드함
const allResolvers = fileLoader(path.join(__dirname, "/api/**/*.js")); // api/모든폴더/ .js 확장자를가진 파일을 로드함

const schema = makeExcutableSchema({
    typeDefs: mergeTypes(allTypes),
    resolvers: mergeResolvers(allResolvers)
});

export default schema;