import UuidMother from "@context/shared/domain/uuid.mother";
import EnvironmentId from "./environmentId";
import MotherCreator from "@context/shared/domain/motherCreator.mother";
import Repeater from "@context/shared/domain/repeater.mother";

export default class EnvironmentIdMother {
    static create(value: string) {
        return new EnvironmentId(value);
    }

    static random() {
        return EnvironmentIdMother.create(UuidMother.random().value)
    }

    static randomList() {
        return Repeater.randomWithoutRepetitions(
            EnvironmentIdMother.random,
            MotherCreator.positiveNumber(10)
        );
    }

    static randomListWithSize(size: number) {
        return Repeater.randomWithoutRepetitions(
            EnvironmentIdMother.random,
            size
        );
    }
}