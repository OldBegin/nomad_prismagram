import dotenv from 'dotenv';
import path from 'path';
import { generateToken } from './../../../utils';

dotenv.config({ path: path.join(__dirname,'.env')});

export default {
    Mutation:{
        confirmSecret: async (_, args, { prisma }) => {

            const { email, loginSecret } = args;
            const userInfo = await prisma.user({email});

            if (userInfo.loginSecret === loginSecret){
                const token = generateToken(userInfo.email, process.env.SECRET, '5m');
                return token;           
           }else{       
               throw Error("Wrong Email/secret combination!");  
           }
        }
    }
}
