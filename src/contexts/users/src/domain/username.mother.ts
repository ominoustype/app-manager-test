import MotherCreator from "@context/shared/domain/motherCreator.mother";
import Username from "./username";

export default class UsernameMother {
    static create(value: string) {
        return new Username(value);
    }

    static random() {
        return UsernameMother.create(MotherCreator.username())
    }
}
