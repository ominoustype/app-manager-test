import DeploymentConfigs, { DeploymentConfigsPrimitives } from "./deploymentConfigs";
import DeploymentConfigsMother from "./deploymentConfigs.mother";
import DeploymentConfigsRemovedDomainEvent from "./deploymentConfigsRemovedDomainEvent";

export default class DeploymentConfigsRemovedDomainEventMother{
    static create(primitives: DeploymentConfigsPrimitives){
        return new DeploymentConfigsRemovedDomainEvent(primitives);
    }

    static random(){
        return DeploymentConfigsRemovedDomainEventMother.create(
            DeploymentConfigsMother.random().toPrimitives()
        );
    }

    static fromDeploymentConfigs(deploymentConfigs: DeploymentConfigs){
        return DeploymentConfigsRemovedDomainEventMother.
                                create(deploymentConfigs.toPrimitives());
    }
}