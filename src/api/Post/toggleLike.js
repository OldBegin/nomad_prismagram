import { isAuthenticated } from "../../middlewares"

export default {
    Mutation:{
        toggleLike: async (_, args, {request}) =>{
            isAuthenticated(request);
            
            const { user } = request;
            const { postId } = args;
            return true;
        }
    }
}