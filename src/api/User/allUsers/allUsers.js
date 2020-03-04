import { prisma } from "../../../../generated/prisma-client";
import { USER_FRAGMENT } from "../../../customFragments/customFragments";

export default {
    Query: {
        allUsers: () => prisma.users().$fragment(USER_FRAGMENT)
    }
}