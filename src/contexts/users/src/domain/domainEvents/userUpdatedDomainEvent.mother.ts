import User, { UserPrimitives } from "../user";
import UserMother from "../user.mother";
import UserUpdatedDomainEvent from "./userUpdatedDomainEvent";

export default class UserUpdatedDomainEventMother {
    static create(user: UserPrimitives) {
        return new UserUpdatedDomainEvent(user);
    }

    static random() {
        return UserUpdatedDomainEventMother.create(
            UserMother.random().fullToPrimitives()
        )
    }

    static fromUser(user: User) {
        return UserUpdatedDomainEventMother.create(user.fullToPrimitives());
    }
}