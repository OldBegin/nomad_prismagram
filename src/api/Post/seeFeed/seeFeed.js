
export default {
  Query:{
    seeFeed: async(_,__, { request, isAuthToken })=>{
      const { reqUser } = isAuthToken(request);
      console.log({user});
      const following = await prisma.user({id: reqUser.id}).following();
      retrun ;
    }
  }
}