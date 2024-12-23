import UuidMother from "@context/shared/domain/uuid.mother";
import EnvironmentId from "./environmentId";
import Repeater from "@context/shared/domain/repeater.mother";
import MotherCreator from "@context/shared/domain/motherCreator.mother";

export default class EnvironmentIdMother {
    static create(primitives: string): EnvironmentId {
        return new EnvironmentId(primitives);
    }

    static random(): EnvironmentId {
        return EnvironmentIdMother.create(
            UuidMother.random().value
        )
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