import DeploymentConfigs, { DeploymentConfigsPrimitives } from "../deploymentConfigs";
import DeploymentConfigsMother from "../deploymentConfigs.mother";
import DeploymentConfigsPushedDomainEvent from "./deploymentConfigsPushedDomainEvent";

export default class DeploymentConfigsPushedDomainEventMother{
    static create(primitives: DeploymentConfigsPrimitives){
        return new DeploymentConfigsPushedDomainEvent(primitives);
    }

    static random(){
        return DeploymentConfigsPushedDomainEventMother.create(
            DeploymentConfigsMother.random().toPrimitives()
        );
    }

    static fromDeploymentConfigs(deploymentConfigs: DeploymentConfigs){
        return DeploymentConfigsPushedDomainEventMother.
                                create(deploymentConfigs.toPrimitives());
    }
}