import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation:{
        editUser: async(_, args, { request, isAuthToken }) =>{
            const { password, firstName, lastName, bio } = args;
            const reqUser = await isAuthToken(request);
            
            try{
                const user = await prisma.updateUser({
                    where:{ id: reqUser.id },
                    data: { password, firstName, lastName, bio }
                });
                console.log(` ::: API - editUser ::: \n 정보수정을 완료했습니다.`);
                return user;
            }catch(error){
                console.log(` ::: API - editUser ::: \n 사용자 정보수정에 실패했습니다. 에러코드: ${error}`);
                throw Error(error);
            }
        }
    }
}