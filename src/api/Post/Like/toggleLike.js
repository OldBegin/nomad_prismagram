import { prisma } from '../../../../generated/prisma-client'

export default {
    Mutation:{
        toggleLike: async (_, args, { request, isAuthToken } ) =>{
            const { postId } = args;
            const reqUser = await isAuthToken(request);
            
            try{
                const existngLike = await prisma.$exists.like({  // 현재포스트에 자신의 좋아요를 했는지 확인
                    AND: [
                        { user: { id: reqUser.id } },
                        { post: { id: postId }}
                    ]
                });
                
                if ( existngLike ) {                                    // 좋아요 있을경우 
                    console.log('좋아요 취소!');
                    await prisma                              
                        .deleteManyLikes({                             // 현재포스트 아이디와  자기아이디를 찾아 삭제
                            AND: [
                                { user: { id: reqUser.id } },
                                { post: { id: postId } }
                            ]
                        });
                } else {                                              // 좋아요 없을경우   
                    console.log('좋아요!');
                    await prisma
                        .createLike({                                 // 현재포스트아이디와 자기아이디를 Like에 등록
                            user: { connect: { id: reqUser.id } },
                            post: { connect: { id: postId } }
                        })
                }
                return true;
            }catch(error){
                console.log(':::API-toggleLike::: \n Fail to toggle Like');
                return false
            }
            
        }
    }
}