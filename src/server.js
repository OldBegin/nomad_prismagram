
// graphql 서버 생성 및 구동

import './env';
import { GraphQLServer} from "graphql-yoga";
import logger from 'morgan';
import schema from './schema';
import './passport';
import { authenticateJwt } from './passport';
import passport from 'passport';
//import { isAuthenticated } from './'

const PORT = process.env.PORT;                                   // .env 파일에서 PORT 변수를 가져와서 상수로 설정한다

const server = new GraphQLServer({
  schema,
  context: ({ request }) => ({ request })
}); // prisma-client를 graphql 서버에 연결해줌: context - prisma를 graphqlApi(api폴더내부)에서 인클루드하지 않고 사용할수 있다.

server.express.use(logger("dev"));                            // 전송로그생성하는 미들웨어
server.express.use(authenticateJwt);
//sendSecretMail('youngun.you@daum.net', '보이나오케이?');  //sendgrid 발송 테스트
//sendGmail('youngun.you@daum.net','secret words'); //gmail 발송 테스트

server.start({ port: PORT }, ()=>console.log(`Server running on http://localhost:${PORT}`)); // 서버실행: PORT 포트에서 포트실행





////////// 내가만든 토큰생성기 테스트 코드 /////////////////////////////////////////////////
// const token = jwt.sign(
//   {
//     email: 'youngun.you@daum.net'
//   },
//   process.env.SECRET,
//   {
//     expiresIn: '5m'
//   }
// );
// const decodedToken = jwt.verify(token, process.env.SECRET);
//
// const tokenInfo = {
//   issuer: 'unitedin.kr',                  // 토큰발급자 (Issuer)
//   subject: 'loginToken',                  // 토큰제목   (Subject)
//   audience: 'youngun',                    // 토큰대상자
//   expTime: 2                              // 토큰유효시간: 2 시간
// }
// const userInfo = {
//   userName: 'youngun',
//   email: 'youngun.you@daum.net'
// }
// generateTokenMyself(tokenInfo, userInfo);
// /////////////////////////////////////////////////////////////////////////////