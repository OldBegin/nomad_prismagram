import dotenv from 'dotenv';
import path from 'path';
import { createToken } from './../../../utils';

dotenv.config({ path: path.join(__dirname,'.env')});

export default {
    Mutation:{
<<<<<<< HEAD
        confirmSecret: async (_, args, { prisma }) => {

            const { email, loginSecret } = args;
            const userInfo = await prisma.user({email});

            if (userInfo.loginSecret === loginSecret){
                const token = generateToken(userInfo.email, process.env.SECRET, '5m');
                return token;           
=======
        confirmSecret: async (_, args) => {
           const { email, loginSecret } = args;
           const userInfo = await prisma.user({email});
           if (userInfo.loginSecret === loginSecret){
               
            const token = createToken(email, loginSecret, '5m');
            console.log(token);
            return token;
            
>>>>>>> parent of 6561d78... 유저인증기능: 토큰생성기 코딩 완료
           }else{       
               throw Error("Wrong Email/secret combination!");  
           }
        }
    }
}