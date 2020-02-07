import { prisma } from '../../../../generated/prisma-client'
import { isAuthorizedEmail, generateToken } from './../../../utils';
import './../../../env';
import bcryptjs from 'bcryptjs';

export default {
    Mutation:{
        signUp: async (_, args)=>{
            const { userName, email, loginSecret, password, firstName = "", lastName = "", bio = "" } = args;
            //await isAuthorizedEmail(email,loginSecret)
            const encodedPwd = await bcryptjs.hash(password,10);
            console.log(`Success encoding password!!`);
            
            const user = await prisma.createUser({ userName, email, password:encodedPwd, firstName, lastName, bio });
            const token = generateToken(user.email,process.env.SECRET, '1m');
            console.log(`Success to signUp of user ${user.email}`);
           
            return { user, token };
        }
    }
}