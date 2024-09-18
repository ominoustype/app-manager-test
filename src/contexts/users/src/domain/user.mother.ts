import User, { UserPrimitives } from "./user";
import DatetimeMother from "@context/shared/domain/datetime.mother";
import MotherCreator from "@context/shared/domain/motherCreator.mother";
import Repeater from "@context/shared/domain/repeater.mother";
import CustomerMother from "./customer/customer.mother";
import UuidMother from "@context/shared/domain/uuid.mother";
import UsernameMother from "./username.mother";
import NameMother from "./name.mother";
import PasswordMother from "./password/password.mother";
import RoleMother from "./role/role.mother";
import EmailMother from "./email.mother";
import UserStatusMother from "./userStatus.mother";
import UserStatus from "./userStatus";

export default class UserMother {
    static create(primitives: UserPrimitives): User {
        return new User(primitives);
    }

    static random(primitives?: Partial<UserPrimitives>): User {
        return UserMother.create({
            id: UuidMother.random().value,
            createdAt: DatetimeMother.random().toString(),
            name: NameMother.random().toString(),
            username: UsernameMother.random().toString(),
            email: EmailMother.random().toString(),
            password: PasswordMother.random().toString(),
            customer: CustomerMother.random().toPrimitives(),
            role: RoleMother.random().toPrimitives(),
            status: UserStatusMother.random(),
            ...primitives
        })
    }

    static randomList() {
        return Repeater.randomWithoutRepetitions(
            UserMother.random,
            MotherCreator.positiveNumber(10)
        );
    }

    static randomListWithSize(size: number) {
        return Repeater.randomWithoutRepetitions(
            UserMother.random,
            size
        );
    }

    static merge(oldUser: User, newUser: User) {
        return UserMother.create({
            ...oldUser.merge(newUser.fullToPrimitives())
        });
    }

    static disabled(primitives: UserPrimitives) {
        return UserMother.create({
            ...primitives,
            status: UserStatus.DISABLED
        });
    }
}
