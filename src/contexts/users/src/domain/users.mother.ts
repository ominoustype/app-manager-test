import UserMother from "./user.mother";
import Users, { UsersPrimitives } from "./users";
import User from "./user";

export default class UsersMother {
    static create(users: UsersPrimitives): Users {
        return new Users(users);
    }

    static empty(): Users {
        return UsersMother.create([]);
    }

    static random(): Users {
        return UsersMother.create(
            UserMother.randomList().map((d: User) => d.toPrimitives())
        );
    }

    static randomWithSize(size: number): Users {
        return UsersMother.create(
            UserMother.randomListWithSize(size).map((d: User) => d.toPrimitives())
        );
    }
}
