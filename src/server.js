
// graphql 서버 생성 및 구동

import './env';
import { GraphQLServer} from "graphql-yoga";
import logger from 'morgan';
import schema from './schema';
import './passport';
//import { authenticateJwt, isAuthToken } from './passport';     // passport의 인증을 사용할 경우: 주석해제
import passport from 'passport';
import { isAuthToken } from './utils';                           // passport의 인증을 사용할 경우: 주석처리
//import { isAuthenticated } from './middlewares'

const PORT = process.env.PORT;                                   // .env 파일에서 PORT 변수를 가져와서 상수로 설정한다

const server = new GraphQLServer({                               // prisma-client를 graphql 서버에 연결해줌: 
  schema,
  context: request => {
    return { ...request, isAuthToken }                          //변수나 함수를 여기서 context로 등록하면 모든 리졸버에서 사용가능함 
  }
});

server.express.use(logger("dev"));                              // 전송로그생성하는 미들웨어
//server.express.use(authenticateJwt);                          // passport 인증을 사용할 경우: 주석해제



//sendSecretMail('youngun.you@daum.net', 'isOk');   //sendgrid 발송 테스트
//sendGmail('youngun.you@daum.net','secret words'); //gmail 발송 테스트

server.start({ port: PORT }, ()=>console.log(`Server running on http://localhost:${PORT}`)); // 서버실행: PORT 포트에서 포트실행







