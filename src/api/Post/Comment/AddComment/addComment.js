import { prisma } from "../../../../../generated/prisma-client";

export default {
  Mutation:{
    addComment: async (_, args, { request, isAuthToken }) => {
      const { text, postId } = args;
      const reqUser = await isAuthToken(request);
      //console.log(`text: ${text} postId: ${postId} reqUser: ${reqUser.id}`);
      const comment = await prisma.createComment({
        user:{ connect:{ id: reqUser.id } }, 
        post:{ connect:{ id: postId } },
        text
      });
      return comment;
    }
  }
}