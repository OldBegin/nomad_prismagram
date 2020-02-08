import { prisma } from './../../../../generated/prisma-client'
import './../../../env';
import bcryptjs from 'bcryptjs';
import { generateToken } from './../../../utils';

export default {
    Mutation:{
        logIn: async (_, args) => {
            const { email, password } = args;

            const user = await prisma.user({email});
            if(!user){
                throw new Error('No such user found');
            }

            const decodedPwd = await bcryptjs.compare(password,user.password)
            if(!decodedPwd){
                throw new Error('Your combination is incorrect');
            }
            const token = generateToken(user.id, user.email, process.env.SECRET, '60m'); // unpacked token: email
            console.log(`Success login authorization user: ${email}`);
            return { user, token };
        }
    }
}