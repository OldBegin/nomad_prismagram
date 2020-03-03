import { prisma } from "../../../../generated/prisma-client";
//import { USER_FRAGMENT } from "./../../../costomfragments/userFragment"

export default {
    Query:{
        seeMe: async (_,__,{ request, isAuthToken }) =>{
            const reqUser = isAuthToken(request);
            const userProfile = await prisma.user({id:reqUser.id});
            const posts = await prisma.user({ id:reqUser.id }).Posts();
            console.log('::: request ::: ', request);
            return {
                user: userProfile,
                posts
            }
        }
    }
}
