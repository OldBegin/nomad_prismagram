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
                console.log(' :::[API]logIn::: No such user found:::')
                return;
                //throw new Error(' :::[API]logIn::: No such user found:::');
            }

            const decodedPwd = await bcryptjs.compare(password,user.password)
            if(!decodedPwd){
                console.log(' :::[API]logIn::: Your combination is incorrect:::')
                return;
                //throw new Error(' :::[API]logIn::: Your combination is incorrect::: ');
            }
            const token = generateToken(user.id, user.email, process.env.SECRET, '60m'); // unpacked token: email
            console.log(` :::[API]logIn::: Success issueing token to user: ${email} :::`);

            return { user, token };
        }
    }
}