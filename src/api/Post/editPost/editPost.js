import { prisma } from './../../../../generated/prisma-client'

const EDIT = 'EDIT';
const DELETE = 'DELETE';

export default {
  Mutation: {
    editPost: async(_, args, {request, isAuthToken})=>{
      const { postId, caption, location, action } = args;
      const reqUser = isAuthToken(request);
      const isExist = await prisma.$exists.post({
        AND: [
          { id: postId },
          { user: { id: reqUser.id } }
        ]
      });
      console.log(isExist);
      if (isExist){
        if(action === EDIT ){
          return prisma.updatePost({
            data:{ caption,location }, 
            where:{ id: postId }
          });
        }else if( action === DELETE ){
          return prisma.deletePost({id: postId});
        }
      } else{
        throw new Error("::: 포스트를 수정할 권한이 없습니다. :::");
      }
    }
  }
};