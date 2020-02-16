import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: {
        seeUser: (_, args) => {
            const { id } = args;
            const user = prisma.user({id})
            const posts = prisma.user({id}).Posts();
            return {
                user,
                posts
            }
        } 
    }
}