import { prisma } from './../../../../generated/prisma-client'
import { generateSecret, sendGmail } from '../../../utils';

//// nomad 타입의 인증 ////////////////////////////////////////////////////////////
// export default {
//   Mutation: {
//     requestSecret: async (_, args) => {
//       const { email } = args;
//       const loginSecret = generateSecret();
//       try {
//         await sendGmail(email, loginSecret);
//         await prisma.updateUser({ data: { loginSecret }, where: { email } });
//         return true;
//       } catch (error) {
//         console.log(error);
//         return false;
//       }
//     }
//   }
// };


//// veolg 타입의 인증 ////////////////////////////////////////////////////////////
// 회원가입시 시크릿 문자를 이메일로 발송하고 발송내역을 디비에 저장함.
//////////////////////////////////////////////////////////////////////////////////
export default {
  Mutation: {
    requestSecret: async (_, args) => {
      const { email } = args;
      const loginSecret = generateSecret();
      try {
        console.log(email);
        await sendGmail(email, loginSecret);
        const isExistUser = await prisma.userBeforeEmailAuth({email});
        if ( isExistUser ){
          await prisma.updateUserBeforeEmailAuth({ data:{ loginSecret }, where:{ email }});
          console.log(`메일이 존재하므로 시크릿문자 \" ${loginSecret} \" 만 갱신합니다.`);
        }else{
          await prisma.createUserBeforeEmailAuth({ email, loginSecret });
          console.log(`"${loginSecret} 의  ${loginSecret} 를 임시로 등록합니다.`);
        }
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    }
  }
};