import { prisma } from '../../../../generated/prisma-client'
import { isAuthorizedEmail, generateToken, isUserExist } from './../../../utils';
import './../../../env';
import bcryptjs from 'bcryptjs';

export default {
    Mutation:{
        signUp: async (_, args)=>{
            try{
                const { userName, email, loginSecret, password, firstName = "", lastName = "", bio = "" } = args;
                await isAuthorizedEmail(email,loginSecret)                         // email 과 문자체크: util.js
    
                const encodedPwd = await bcryptjs.hash(password,10);               // 비밀번호 encoding 체크: util.js
                console.log(` :::[API]signUp::: Success encoding password!::: `);
    
                const userExist = await isUserExist(email, userName);              // email, userName 중복체크: util.js
                if (userExist){
                    console.log(" :::[API]signUp::: 이메일 또는 사용자명이 존재합니다.::: ");
                    return;
                }
                const user = await prisma.createUser({ userName, email, password:encodedPwd, firstName, lastName, bio });
                const token = generateToken(user.id, user.email, process.env.SECRET, '30m');
                console.log(` :::[API]signUp::: Success to signUp of user ${user.email} :::`);
                
                return { user, token };

            }catch(error){
                throw Error(` :::[API]signUp::: 회원가입 진행중 오류가 발행했습니다.::: \n :::오류코드: ${error} :::`);
            }
        }
    }
}