import Environment from "./environment";
import EnvironmentMother from "./environment.mother";
import Environments, { EnvironmentsPrimitives } from "./environments";

export default class EnvironmentsMother {
    static create(primitives: EnvironmentsPrimitives): Environments {
        return new Environments(primitives);
    }

    static empty(): Environments {
        return EnvironmentsMother.create([]);
    }

    static random(): Environments {
        return EnvironmentsMother.create(
            EnvironmentMother.randomList().map((d: Environment) => d.toPrimitives())
        );
    }

    static randomWithSize(size: number): Environments {
        return EnvironmentsMother.create(
            EnvironmentMother.randomListWithSize(size).map((d: Environment) => d.toPrimitives())
        );
    }
}
