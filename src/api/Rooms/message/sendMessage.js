import { prisma } from './../../../../generated/prisma-client';

export default {
  Mutation: {
    sendMessage: async (_, args, { request, isAuthToken })=>{
      const reqUser = isAuthToken(request);
      const { roomId, message, toId } = args;

      if(!roomId){ //채팅룸이 없을경우
        if(!toId){
          throw new Error(':::sendMessage::: 채팅방이 없을경우 채팅을 시작할 사용자를 필히 입력해야 합니다.');
        }
        const newRoom = await prisma.createRoom({ 
            participants:{ 
              connect: [
                  { id: reqUser.id },
                  { id: toId }
              ]
            }
        });
        const room = newRoom;
      }else{
        const room = await prisma.room({id: roomId});
      }
    
      const result = await prisma.createMessage({
        data:{ 
          text: message, 
          from: reqUser.id,
          to: toId,
          room: room.id
        }});

      return result;
    } 
  }
}