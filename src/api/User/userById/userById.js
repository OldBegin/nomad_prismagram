import { prisma } from "./../../../../generated/prisma-client";

export default {
    Query:{
        userById: async (_, args)=>{
            const { id } = args;
            return await prisma.user({id}).$fragment(); // $fragment 는 계속 쿼리에 노드를 추가해서 공격할수 있는데 이것을 방지하기 위함.
        }
    }
};