import DeploymentConfigs, { DeploymentConfigsPrimitives } from "./deploymentConfigs";
import DeploymentConfigsMother from "./deploymentConfigs.mother";
import DeploymentConfigsUpdatedDomainEvent from "./deploymentConfigsUpdatedDomainEvent";

export default class DeploymentConfigsUpdatedDomainEventMother{
    static create (deploymentConfigs: DeploymentConfigsPrimitives): DeploymentConfigsUpdatedDomainEvent{
        return new DeploymentConfigsUpdatedDomainEvent(deploymentConfigs);
    }

    static random(): DeploymentConfigsUpdatedDomainEvent{
        return DeploymentConfigsUpdatedDomainEventMother
    .create(
            DeploymentConfigsMother.random().toPrimitives());
    }

    static fromDeploymentConfigs(deploymentConfigs: DeploymentConfigs): DeploymentConfigsUpdatedDomainEvent{
        return DeploymentConfigsUpdatedDomainEventMother
    .create(deploymentConfigs.toPrimitives());
    }
}