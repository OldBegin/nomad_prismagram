import  './../../../env';
import { generateToken } from './../../../utils';
import { prisma } from '../../../../generated/prisma-client'

export default {
    Mutation:{
        confirmSecret: async (_, args) => {
            const { email, loginSecret } = args;
            const userInfo = await prisma.user({email});
 
            if (userInfo.loginSecret === loginSecret){
                const token = generateToken(userInfo.email, process.env.SECRET, '1m');
                return token;           
           }else{       
               throw Error("Wrong Email/secret combination!");  
           }
        }
    }
}
