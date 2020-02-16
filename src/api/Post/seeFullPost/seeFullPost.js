// 포스트 아이디를 받아서 포스트 내용 전체를 보여줌
import { prisma } from "../../../../generated/prisma-client"
import { COMMENT_FRAGMENT } from "../../../costomFragments/commentFragment";

export default {
    Query:{
        seeFullPost: async (_,args ) => {
            const { postId } = args;
            const post = await prisma.post({ id: postId });
            const comments = await prisma.post({ id: postId }).comments().$fragment(COMMENT_FRAGMENT);
            const likeCount = await prisma
                .likesConnection({ where: { post:{ id: postId }}})
                .aggregate()
                .count();
            return {
                post, comments, likeCount
            }
        }
    }
}