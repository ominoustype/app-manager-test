import UuidMother from "@context/shared/domain/uuid.mother";
import MotherCreator from "@context/shared/domain/motherCreator.mother";
import Repeater from "@context/shared/domain/repeater.mother";
import PrevDeploy, { PrevDeployPrimitives } from "./prevDeploy";

export default class PrevDeployMother {
    static create(primitives: PrevDeployPrimitives): PrevDeploy {
        return new PrevDeploy(primitives);
    }

    static random(primitives?: Partial<PrevDeployPrimitives>): PrevDeploy {
        return PrevDeployMother.create({
            id: UuidMother.random().value,
            createdAt: MotherCreator.word(),
            ...primitives
        })
    }

    static randomList() {
        return Repeater.randomWithoutRepetitions(
            PrevDeployMother.random,
            MotherCreator.positiveNumber(10)
        );
    }

    static randomListWithSize(size: number) {
        return Repeater.randomWithoutRepetitions(
            PrevDeployMother.random,
            size
        );
    }
}