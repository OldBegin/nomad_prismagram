import { prisma } from '../../../../generated/prisma-client'
import { isAuthorizedEmail, generateToken, isUserExist } from './../../../utils';
import './../../../env';
import bcryptjs from 'bcryptjs';

export default {
    Mutation:{
        signUp: async (_, args)=>{
            //throw new Error("서버에서 만들어진 오류");
            try{
                const { userName, email, password, firstName = "", lastName = "", bio = "" } = args;
                
                const userExist = await isUserExist(email, userName);              // email, userName 중복체크: util.js
                
                if (userExist){
                    throw new Error(" :::[API]signUp::: 이메일 또는 사용자명이 존재합니다.::: ");
                }else{
                    const encodedPwd = await bcryptjs.hash(password,10);               // 비밀번호 encoding 체크: util.js
                    const isSuccess = await prisma.createUser({ userName, email, password:encodedPwd, firstName, lastName, bio });
                    if(isSuccess){
                        console.log(` :::[API]signUp::: Success to signUp of user ${email} :::`);     
                        return true;
                    }else{
                        return false;
                    }
                }
            }catch(error){
                throw Error(` :::[API]signUp::: 회원가입 진행중 오류가 발행했습니다.::: \n :::오류코드: ${error} :::`);
            }
        }
    }
}

// export default {
//     Mutation: {
//         signUp: async (_, args) => {
//             try {
//                 const { userName, email, password, firstName = "", lastName = "", bio = "" } = args;

//                 isUserExist(email, userName)
//                     .then((userExist)=>{
//                         if (userExist) {
//                             throw new Error(" :::[API]signUp::: 이메일 또는 사용자명이 존재합니다.::: ");
//                         } else {
//                             bcryptjs.hash(password, 10, (error, encodedPwd)=>{
//                                 if(!error){
//                                     prisma.createUser({ userName, email, password: encodedPwd, firstName, lastName, bio });
//                                 }
//                             });
//                         }
//                 });
//             } catch (error) {
//                 throw Error(` :::[API]signUp::: 회원가입 진행중 오류가 발행했습니다.::: \n :::오류코드: ${error} :::`);
//             }
//         }
//     }
// }