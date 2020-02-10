import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation:{
        follow: async (_, args, { request, isAuthToken }) => {
            const reqUser = isAuthToken(request);
            const { id } = args;
            try{
                await prisma.updateUser({
                    where:{ id: reqUser.id },
                    data:{ following:{ connect:{ id: id }}}
                });
                console.log(`::: Success following to user ${id}`);
                return true;
            }catch{
                return false;
            }
        }
    }
}