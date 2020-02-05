///////// 토큰 추출기 : passport-jwt 라이브러리 사용 ///////////////////////////////////////////////////////////////////

import './env';
import passport from "passport";
import { Strategy, ExtractJwt } from 'passport-jwt';
import { prisma } from './../generated/prisma-client';

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET,
}

const verifyToken = async (payload, done) => {   // Decoding 된 토큰이 payload 인자로 넘어옴
  try {
    const user = await prisma.user({ email: payload.email });  //토큰의  payload 중 email을 디비와 비교함

    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (error) {
    return done(error, false); 
  }
};

export const authenticateJwt = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (error, user) => {
    if (user) {
      req.user = user;
    }
    next();
  })(req, res, next);
};

passport.use(new Strategy(jwtOptions, verifyToken));
passport.initialize();