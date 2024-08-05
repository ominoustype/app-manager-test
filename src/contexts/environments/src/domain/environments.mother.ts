import EnvironmentMother from "./environment.mother";
import Environments, { EnvironmentsPrimitives } from "./environments";
import Environment from "./environment";

export default class EnvironmentsMother {
    static create(environments: EnvironmentsPrimitives): Environments {
        return new Environments(environments);
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
