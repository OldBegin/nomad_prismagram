import { prisma } from './../../../../generated/prisma-client'

export default {
    Mutation:{
        confirmSecret: async (_, args) => {
           const { email, loginSecret } = args;
           const userInfo = await prisma.user({email});
           if (userInfo.loginSecret === loginSecret){
               //jwt
               return "Token!!!";
           }else{       
               throw Error("Wrong Email/secret combination!");  
           }
        }
    }
}