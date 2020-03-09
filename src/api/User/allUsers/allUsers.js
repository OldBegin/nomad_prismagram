import { prisma } from "../../../../generated/prisma-client";
import { USER_FRAGMENT } from "../../../customFragments/customFragments";

export default {
    Query: {
        //allUsers: () => prisma.users().$fragment(USER_FRAGMENT)  //fragment 적용타입
        allUsers: () => prisma.users()  //graphql 적용타입
    }
}