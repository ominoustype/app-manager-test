import User, { UserPrimitives } from "../user";
import UserMother from "../user.mother";
import NewUserCreatedDomainEvent from "./newUserCreatedDomainEvent";

export default class NewUserCreatedDomainEventMother {
    static create(user: UserPrimitives): NewUserCreatedDomainEvent {
        return new NewUserCreatedDomainEvent(user);
    }

    static random(): NewUserCreatedDomainEvent {
        return NewUserCreatedDomainEventMother.create(
            UserMother.random().toPrimitives()
        )
    }

    static fromUser(user: User): NewUserCreatedDomainEvent {
        return NewUserCreatedDomainEventMother.create(user.toPrimitives());
    }
}