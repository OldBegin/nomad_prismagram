import { prisma } from '../../../../generated/prisma-client'

export default {
    Mutation:{
        createAccount: async (_, args)=>{
            const { userName, email, password, loginSecret, firstName = "", lastName = "", bio = "" } = args;
            const user = await prisma.createUser({userName, email, password, loginSecret, firstName, lastName, bio});
            return user;
        }
    }
};