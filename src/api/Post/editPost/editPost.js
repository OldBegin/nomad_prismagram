import { prisma } from './../../../../generated/prisma-client'

export default {
  Mutation: {
    editPost: async(_, args, {request, isAuthToken})=>{
      const { postId, caption, location } = args;
      const reqUser = isAuthToken(request);
      const isExist = await prisma.$exists.post({
        AND: [
          { id: postId },
          { user: { id: reqUser.id } }
        ]
      });
      console.log(isExist);
      if (isExist){
        return prisma.updatePost({
          data:{ caption,location }, 
          where:{ id: postId }
        });
      }else{
        throw new Error("::: 포스트를 수정할 권한이 없습니다. :::");
      }
    }
  }
};