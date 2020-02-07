/////////// 토큰 추출기 : passport-jwt 라이브러리 사용 ///////////////////////////////////////////////////////////////////
/// authenticateJwt 를 서버에서 구동하면 됨: 
/// server.js 의 server.express.use(authenticateJwt) 부분의 주석을 제거하여 사용
/////////////////////////////////////////////////////////////////////////////////////////////////////////

import './env';
import passport from "passport";
import { Strategy, ExtractJwt } from 'passport-jwt';
import { prisma } from './../generated/prisma-client';



const optionJwt = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET,
}


export const authenticateJwt = (req, res, next) =>
passport.authenticate("jwt", { session: false }, (error, user) => {
  if (user) {
    req.user = user;
  }
  next();
})(req, res, next);


passport.initialize();
passport.use(new Strategy( optionJwt, async (payload, done) => {   // Decoding 된 토큰이 payload 인자로 넘어옴
  try {
    console.log(`Passport.use: Success to verify Token: \n ${JSON.stringify(payload)}`);
    const user = await prisma.user({ email: payload.email });  //토큰의  payload 중 email을 디비와 비교함

    if (user) {
      console.log(`Success to get user info from payload \n ${JSON.stringify(user)}`);
      return done(null, user);
    } else {
      console.log(`Can't find registered user from token: \n ${payload}`);
      return done(null, false);
    }
  } catch (error) {
    return done(error, false);
  }
}));
