import { prisma } from "./../../../../generated/prisma-client";

export default {
    Query: {
        userById: async (_, arg, { request, isAuthToken }) => {
            const { id } = arg;
            await isAuthToken(request);                                // 토큰인증
            return await prisma.user({ id }).$fragment();
        }
    }
};