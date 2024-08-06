import UuidMother from "@context/shared/domain/uuid.mother";
import DeploymentConfigs, { DeploymentConfigsPrimitives } from "./deploymentConfigs";
import MotherCreator from "@context/shared/domain/motherCreator.mother";
import Repeater from "@context/shared/domain/repeater.mother";

export default class DeploymentConfigsMother{
    static create(primitives: DeploymentConfigsPrimitives): DeploymentConfigs{
        return new DeploymentConfigs(primitives);
    }

    static random(primitives?: Partial<DeploymentConfigsPrimitives>): DeploymentConfigs{
        return DeploymentConfigsMother.create({
            id: UuidMother.random().value,
            name: MotherCreator.words().toString(),
            environmentId: UuidMother.random().toString(),
            customerId: UuidMother.random().toString(),
            deviceType: MotherCreator.words().toString(),
            ...primitives
        });
    }

    static merge(oldDeploymentConfigs: DeploymentConfigs, newDeploymentConfigs: DeploymentConfigs) {
        return DeploymentConfigsMother.create({
            ...oldDeploymentConfigs.merge(newDeploymentConfigs.toPrimitives())
        });
    }

    static randomList() {
        return Repeater.randomWithoutRepetitions(
            DeploymentConfigsMother.random,
            MotherCreator.positiveNumber(10)
        );
    }

    static randomListWithSize(size: number) {
        return Repeater.randomWithoutRepetitions(
            DeploymentConfigsMother.random,
            size
        );
    }
}