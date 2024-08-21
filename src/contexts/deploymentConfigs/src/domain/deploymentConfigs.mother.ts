import DeploymentConfigs, { DeploymentConfigsPrimitives } from "./deploymentConfigs";
import MotherCreator from "@context/shared/domain/motherCreator.mother";
import Repeater from "@context/shared/domain/repeater.mother";
import DeploymentConfigsNameMother from "./deploymentConfigsName.mother";
import DeploymentConfigsDeviceTypeMother from "./deploymentConfigsDeviceType.mother";
import DocumentsMother from "./config/documents.mother";
import DeploymentConfigsIdMother from "./deploymentConfigsId.mother";
import CustomerMother from "./customer/customer.mother";
import EnvironmentMother from "./environment/environment.mother";

export default class DeploymentConfigsMother{
    static create(primitives: DeploymentConfigsPrimitives): DeploymentConfigs{
        return new DeploymentConfigs(primitives);
    }

    static random(primitives?: Partial<DeploymentConfigsPrimitives>): DeploymentConfigs{
        return DeploymentConfigsMother.create({
            id: DeploymentConfigsIdMother.random().value,
            name: DeploymentConfigsNameMother.random().toString(),
            environment: EnvironmentMother.random().toPrimitives(),
            customer: CustomerMother.random().toPrimitives(),
            deviceType: DeploymentConfigsDeviceTypeMother.random(),
            documents: DocumentsMother.random().toPrimitives(),
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