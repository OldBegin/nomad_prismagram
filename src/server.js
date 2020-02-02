
// graphql 서버 생성 및 구동

import dotenv from 'dotenv';
import path from 'path';
import { GraphQLServer} from "graphql-yoga";
import logger from 'morgan';
import schema from './schema';
import { sendSecretMail } from './utils';


dotenv.config({path: path.join(__dirname, ".env")}); // 현재경로의 .env 파일에서 변수들을 로드: path사용시 path.resolve 를 사용해도 됨

const PORT = process.env.PORT;        //.env 파일에서 PORT 변수를 가져와서 상수로 설정한다

const server = new GraphQLServer({ schema }); // 서버생성: 서버의 첫번째 인자로 정의된 Type을, 두번째 인자로 resolvers 를 넘겨준다

server.express.use(logger("dev"));   //전송로그생성하는 미들웨어

sendSecretMail('youngun.you@daum.net', '123456');

// 서버실행: PORT 포트에서 포트실행
server.start({ port: PORT }, ()=>console.log(`Server running on http://localhost:${PORT}`));