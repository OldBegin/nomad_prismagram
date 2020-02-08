import { prisma } from './../../../generated/prisma-client'

export default {
    Mutation:{
        toggleLike: async (_, args, context ) =>{
            const { request, isAuthToken } = context;
            const { postId } = args;
            const user = await isAuthToken(request);
            const existngLike = await prisma.$exists.like({
                AND: [
                    {
                        user: {
                            id: user.id
                        }
                    }
                ]
            })

        
            return true;
        }
    }
}