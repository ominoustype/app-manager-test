import DeploymentConfigs, { DeploymentConfigsPrimitives } from "../deploymentConfigs";
import DeploymentConfigsMother from "../deploymentConfigs.mother";
import DeploymentConfigsDeployedDomainEvent from "./deploymentConfigsDeployedDomainEvent";

export default class DeploymentConfigsDeployedDomainEventMother{
    static create(primitives: DeploymentConfigsPrimitives){
        return new DeploymentConfigsDeployedDomainEvent(primitives);
    }

    static random(){
        return DeploymentConfigsDeployedDomainEventMother.create(
            DeploymentConfigsMother.random().toPrimitives()
        );
    }

    static fromDeploymentConfigs(deploymentConfigs: DeploymentConfigs){
        return DeploymentConfigsDeployedDomainEventMother.
                                create(deploymentConfigs.toPrimitives());
    }
}