
import Environment, { EnvironmentPrimitives } from "./environment";
import UuidMother from "@context/shared/domain/uuid.mother";
import MotherCreator from "@context/shared/domain/motherCreator.mother";
import Repeater from "@context/shared/domain/repeater.mother";

export default class EnvironmentMother {
    static create(primitives: EnvironmentPrimitives): Environment {
        return new Environment(primitives);
    }

    static random(primitives?: Partial<EnvironmentPrimitives>): Environment {
        return EnvironmentMother.create({
            id: UuidMother.random().value,
            name: MotherCreator.word().toString(),
            ...primitives
        })
    }

    static randomList() {
        return Repeater.randomWithoutRepetitions(
            EnvironmentMother.random, 
            MotherCreator.positiveNumber(10));
    }

    static randomListWithSize(size: number) {
        return Repeater.randomWithoutRepetitions(
            EnvironmentMother.random,
            size
        );
    }
}