import { prisma } from './../../../../generated/prisma-client'
import { generateSecret, sendGmail } from '../../../utils';

export default {
  Mutation:{
    requestSecret: async(_, args) => {
      const { email } = args;
      const loginSecret = generateSecret();
      
      try{
        await sendGmail(email, loginSecret);
        await prisma.updateUser({data:{ loginSecret }, where:{ email }});
        return true;
      }catch(error){
        console.log(error);
        return false;
      }
    }
  }
}