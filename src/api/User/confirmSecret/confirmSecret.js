
// 이메일과 시크릿을 확인하여 확인되면 return true

import { prisma } from "./../../../../generated/prisma-client";

export default {
  Query:{
    confirmSecret: async(_,args) =>{
      const { email, secret } = args
      try {
        const user = await prisma.userWaitSignUp({ email });
        if (user.email && user.loginSecret === secret) {  //임시테이블에 사용자가존재하고 로그인시크릿이 동일하면 트루
          console.log(` :::isAuthorizedEmail::: Success to authorize loginSecret! `);
          return true;
        } else {
          console.log(" :::isAuthorizedEmail::: LoginSecret has been no confirmed ");
          return false;
        }
      } catch (error) {
        throw Error(" :::isAuthorizedEmail::: Error occured confirming loginSecret ");
      }
    }
  }
}