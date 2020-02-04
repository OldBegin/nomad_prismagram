import { prisma } from './../../../../generated/prisma-client';
import dotenv from 'dotenv';
import path from 'path';
import { createToken } from './../../../utils';

dotenv.config({ path: path.join(__dirname,'.env')});

export default {
    Mutation:{
        confirmSecret: async (_, args) => {
           const { email, loginSecret } = args;
           const userInfo = await prisma.user({email});
           if (userInfo.loginSecret === loginSecret){
               
            const token = createToken(email, loginSecret, '5m');
            console.log(token);
            return token;
            
           }else{       
               throw Error("Wrong Email/secret combination!");  
           }
        }
    }
}