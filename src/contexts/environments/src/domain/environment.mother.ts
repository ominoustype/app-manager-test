import UuidMother from "@context/shared/domain/uuid.mother";
import Environment, { EnvironmentPrimitives } from "./environment";
import MotherCreator from "@context/shared/domain/motherCreator.mother";
import Repeater from "@context/shared/domain/repeater.mother";

export default class EnvironmentMother{
    static create(primitives: EnvironmentPrimitives): Environment {
        const aux = new Environment(primitives);
        return aux;
    }

    static random(primitives?: Partial<EnvironmentPrimitives>): Environment {
        return EnvironmentMother.create({
            id: UuidMother.random().value,
            name: MotherCreator.word(),
            rules: MotherCreator.words().toString(),
            customerId: MotherCreator.words().toString(),
            path: MotherCreator.words().toString(),
            ...primitives
        })
    }

    static merge(oldEnvironment: Environment, newEnvironment: Environment) {
        return EnvironmentMother.create({
            ...oldEnvironment.merge(newEnvironment.toPrimitives())
        });
    }

    static randomList() {
        return Repeater.randomWithoutRepetitions(
            EnvironmentMother.random,
            MotherCreator.positiveNumber(10)
        );
    }

    static randomListWithSize(size: number) {
        return Repeater.randomWithoutRepetitions(
            EnvironmentMother.random,
            size
        );
    }
}