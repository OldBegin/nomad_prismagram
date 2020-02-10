import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation:{
        unfollow: async (_, args, { request, isAuthToken }) =>{
            const reqUser = isAuthToken(request);
            const { id } = args;
            try{
                await prisma.updateUser({
                    where:{ id: reqUser.id },
                    data:{ following:{ disconnect:{ id: id}}}
                });
                console.log(`::: Success unfollowing to user ${id}`);
               return true;
            }catch{
                return false;
            }
        }
    }
}