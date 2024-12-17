import User, { UserPrimitives } from "../user";
import UserMother from "../user.mother";
import UserRemovedDomainEvent from "./userRemovedDomainEvent";

export default class UserRemovedDomainEventMother {
    static create(user: UserPrimitives) {
        return new UserRemovedDomainEvent(user);
    }

    static random() {
        return UserRemovedDomainEventMother.create(
            UserMother.random().toPrimitives()
        )
    }

    static fromUser(user: User) {
        return UserRemovedDomainEventMother.create(user.toPrimitives());
    }
}