import { prisma } from "../../../generated/prisma-client";

export default{
    Post: {
        _isLiked: async (parent, _, { request, isAuthToken }) => {
            const reqUser = isAuthToken(request);
            const { id: postId } = parent;
            console.log(`Access User ID: ${reqUser.id}`);
            const exist = await prisma.$exists.like({
                AND: [
                    { post: { id: postId } },
                    { user: { id: reqUser.id } }
                ]
            });
            return exist;
        },
    
        _likeCount: async (parent) => {
            const { id: postId } = parent;
            const likeCount = await prisma
                .likesConnection({ where: { post: { id: postId } } })
                .aggregate()
                .count();

            return likeCount;
        },
        comments: (parent) =>{
            const { id: postId } = parent;
            return prisma.post({postId}).comments();
        }
    }
}
