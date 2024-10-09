import PrevDeploy from "./prevDeploy";
import PrevDeployMother from "./prevDeploy.mother";
import PrevDeploys, { PrevDeploysPrimitives } from "./prevDeploys";

export default class PrevDeploysMother {
    static create(primitives: PrevDeploysPrimitives): PrevDeploys {
        return new PrevDeploys(primitives);
    }

    static empty(): PrevDeploys {
        return PrevDeploysMother.create([]);
    }

    static random(): PrevDeploys {
        return PrevDeploysMother.create(
            PrevDeployMother.randomList().map((d: PrevDeploy) => d.toPrimitives())
        );
    }

    static randomWithSize(size: number): PrevDeploys {
        return PrevDeploysMother.create(
            PrevDeployMother.randomListWithSize(size).map((d: PrevDeploy) => d.toPrimitives())
        );
    }
}
