import DatetimeMother from '@context/shared/domain/datetime.mother';
import DeploymentConfigs, { DeploymentConfigsPrimitives } from "./deploymentConfigs";
import MotherCreator from "@context/shared/domain/motherCreator.mother";
import Repeater from "@context/shared/domain/repeater.mother";
import DeploymentConfigsNameMother from "./deploymentConfigsName.mother";
import DeploymentConfigsDeviceTypeMother from "./deploymentConfigsDeviceType.mother";
import DeploymentConfigsIdMother from "./deploymentConfigsId.mother";
import DeploymentConfigsPathMother from "./deploymentConfigsPath.mother";
import CustomerMother from "./customer/customer.mother";
import EnvironmentMother from "./environment/environment.mother";
import DocumentsMother from './documents/documents.mother';

export default class DeploymentConfigsMother{
    static create(primitives: DeploymentConfigsPrimitives): DeploymentConfigs{
        return new DeploymentConfigs(primitives);
    }

    static random(primitives?: Partial<DeploymentConfigsPrimitives>): DeploymentConfigs{
        return DeploymentConfigsMother.create({
            id: DeploymentConfigsIdMother.random().value,
            name: DeploymentConfigsNameMother.random().toString(),
            createdAt: DatetimeMother.random().toString(),
            environment: EnvironmentMother.random().toPrimitives(),
            customer: CustomerMother.random().toPrimitives(),
            deviceType: DeploymentConfigsDeviceTypeMother.random(),
            path: DeploymentConfigsPathMother.random().toString(),
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