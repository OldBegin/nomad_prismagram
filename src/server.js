
require("dotenv").config()
import { GraphQLServer} from "graphql-yoga";

//.env 파일에서 PORT 값을 받아서 상수로 설정한다 없을경우 4000 으로 설정한다.
const PORT = process.env.PORT || 4000;

// type 정의
const typeDefs = `
    type Query{
        hello: String!
    }
`;

// resolvers 정의: 쿼리를 날렸을때 실행할 함수를 구현한다.
const resolvers = {
    Query:{
        hello: ()=>"hi" // 'hello' 라는 쿼리를 날리면 "hi" 가 실행된다.
    }
    
}

// 서버생성: 서버의 첫번째 인자로 정의된 Type을, 두번째 인자로 resolvers 를 넘겨준다
const server = new GraphQLServer({ typeDefs, resolvers});

// 서버실행: PORT 포트에서 포트실행
server.start({ port: PORT }, ()=>console.log(`Server running on http://localhost:${PORT}`));
