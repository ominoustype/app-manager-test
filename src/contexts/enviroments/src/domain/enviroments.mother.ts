import EnviromentMother from "./enviroment.mother";
import Enviroments, { EnviromentsPrimitives } from "./enviroments";
import Enviroment from "./enviroment";

export default class EnviromentsMother {
    static create(enviroments: EnviromentsPrimitives): Enviroments {
        return new Enviroments(enviroments);
    }

    static empty(): Enviroments {
        return EnviromentsMother.create([]);
    }

    static random(): Enviroments {
        return EnviromentsMother.create(
            EnviromentMother.randomList().map((d: Enviroment) => d.toPrimitives())
        );
    }

    static randomWithSize(size: number): Enviroments {
        return EnviromentsMother.create(
            EnviromentMother.randomListWithSize(size).map((d: Enviroment) => d.toPrimitives())
        );
    }
}
