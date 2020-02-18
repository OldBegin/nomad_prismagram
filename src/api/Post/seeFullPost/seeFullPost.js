// 포스트 아이디를 받아서 포스트 내용 전체를 보여줌"
import { prisma } from "./../../../../generated/prisma-client";
import { FULL_POST_FRAGMENT, COMMENT_FRAGMENT } from "../../../customFragments/customFragments";

export default {
    Query:{
        seeFullPost: async (_,args ) => {
             const { postId } = args;
             console.log(postId);
            //  const post = await prisma.post({ id: postId });
            //  const user = await prisma.post({ id: postId }).user();
            //  const comments = await prisma.post({ id: postId }).comments().$fragment(COMMENT_FRAGMENT);
            //  const files = await prisma.post({ id: postId }).files();
             
            //  return {
            //     post,
            //     user,
            //     comments,
            //     files
            // }
            return prisma.post({id: postId}).$fragment(FULL_POST_FRAGMENT);
        }
    }
}