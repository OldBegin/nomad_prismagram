//// veolg 타입의 인증 ////////////////////////////////////////////////////////////
// 회원가입시 시크릿 문자를 이메일로 발송하고 발송내역을 디비에 저장함.
//////////////////////////////////////////////////////////////////////////////////

import { prisma } from './../../../../generated/prisma-client'
import { generateSecret, sendGmail } from '../../../utils';

export default {
  Mutation: {
    requestSecret: async (_, args) => {
      const { email } = args;
      const loginSecret = generateSecret();
      try { 
        sendGmail(email, loginSecret);

        const isExistUser = await prisma.userWaitSignUp({email});
        
        if ( isExistUser ){
          await prisma.updateUserWaitSignUp({ data:{ loginSecret }, where:{ email }});
          console.log(` :::[API]requestSecret::: 메일이 존재하므로 시크릿문자 \" ${loginSecret} \" 만 갱신합니다.:::`);
        }else{
          await prisma.createUserWaitSignUp({ email, loginSecret });
          console.log(` :::[API]requestSecret::: ${loginSecret} 의 <${loginSecret}>를 임시로 등록합니다.::: `);
        }
        return true;
      } catch (error) {
        throw Error(`::: confirmSecret ::: 에러코드: ${error.message}`);
      }
    }
  }
};