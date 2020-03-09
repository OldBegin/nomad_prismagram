import { prisma } from '../../../../generated/prisma-client';

export default {
  Query: {
    seeRooms: async(_,__,{ request, isAuthToken })=>{
      const reqUser = isAuthToken( request );

      return prisma.rooms({ where: { 
        participants_some: { id: reqUser.id }
      }});
    }
  }
}