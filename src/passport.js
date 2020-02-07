// ///////// 토큰 추출기 : passport-jwt 라이브러리 사용 ///////////////////////////////////////////////////////////////////

import './env';
import passport from "passport";
import { Strategy, ExtractJwt } from 'passport-jwt';
import { prisma } from './../generated/prisma-client';

const opt = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET,
}

const verifyUser = async (payload, done) => {   // Decoding 된 토큰이 payload 인자로 넘어옴
  try {
    console.log("2 - in verifyToken::::::::::", payload);
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

export const authenticateJwt = (req, res, next) => 
  passport.authenticate("jwt", { session: false }, (error, user) => {
  // console.log('request::::', req);
    if (user) {
      req.user = user;
    }
    next();
  })(req, res, next);

passport.initialize();
passport.use(new Strategy(opt, verifyUser));




// import './env'
// import passport from "passport";
// import { Strategy, ExtractJwt } from "passport-jwt";
// import { prisma } from "../generated/prisma-client";

// const jwtOptions = {
//   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//   secretOrKey: process.env.SECRET
// };

// const verifyUser = async (payload, done) => {
//   try {
//     const user = await prisma.user({ email: payload.email });
//     console.log("user:::::", payload.email);
//     if (user !== null) {
//       return done(null, user);
//     } else {
//       return done(null, false);
//     }
//   } catch (error) {
//     return done(error, false);
//   }
// };

// export const authenticateJwt = (req, res, next) =>
//   passport.authenticate("jwt", { sessions: false }, (error, user) => {
//     //console.log("request:::::", req);
    
//     if (user) {
//       req.user = user;
//     }
//     next();
//   })(req, res, next);

// passport.use(new Strategy(jwtOptions, verifyUser));
// passport.initialize();