import MotherCreator from "@context/shared/domain/motherCreator.mother";
import Name from "./name";

export default class NameMother {
    static create(value: string) {
        return new Name(value);
    }

    static random() {
        return NameMother.create(MotherCreator.word())
    }
}
