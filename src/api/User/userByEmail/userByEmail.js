import { prisma } from "../../../../generated/prisma-client"

export default {
  Query:{
    userByEmail: async (_, args, { request, isAuthToken }) => {
      const { email } = args;
      await isAuthToken(request);
      const user = await prisma.user({ email }).$fragment();
      return user;
    }
  }
}