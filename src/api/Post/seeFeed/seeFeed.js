import { prisma } from './../../../../generated/prisma-client'

export default {
  Query:{
    seeFeed: async(_,__, { request, isAuthToken })=>{
      const reqUser = isAuthToken(request);
      const followings = await prisma.user({id: reqUser.id}).following();
      const userIds = await followings.map((followUser)=>followUser.id);
      const resultPosts = await prisma.posts({ where:{ user:{ id_in: userIds }}});
      console.log(':::resultPosts::: ', resultPosts);
      return resultPosts ;
    }
  }
}