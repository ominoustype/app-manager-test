import UniqueObjectsArray from "@context/shared/domain/uniqueObjectsArray";
import User, { UserPrimitives } from "./user";

export type UsersPrimitives = Array<UserPrimitives> 

export default class Users extends UniqueObjectsArray<User,UserPrimitives> {
    constructor(users: UsersPrimitives) {
        super(users,User);
    }
}
