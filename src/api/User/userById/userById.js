import { prisma } from "./../../../../generated/prisma-client";

export default {
    Query: {
        userById: async (_, args, context) => {
            const { id } = args;
            const { request, isAuthToken } = context;
            await isAuthToken(request);                                // 토큰인증
            const user = await prisma.user({ id }).$fragment();
            return user;
        }
    }
};