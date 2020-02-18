import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation:{
        upload: async (_, args, {request, isAuthToken })=>{
            const { caption, files } = args;
            const reqUser = isAuthToken(request);
            const post = await prisma.createPost({
                caption,
                user: { connect: { id: reqUser.id }}
            });
          
            files.forEach( async file => {
                await prisma.createFile({
                    url: file,
                    post: { connect: { id: post.id } }
                });
            });
            return post;
        }
    }
}