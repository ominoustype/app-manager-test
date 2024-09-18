import MotherCreator from "@context/shared/domain/motherCreator.mother";
import Password from "./password";

export default class PasswordMother {
    static create(value: string) {
        return new Password(value);
    }

    static random() {
        return PasswordMother.create(MotherCreator.password())
    }
}
