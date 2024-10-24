import DeploymentConfigs, { DeploymentConfigsPrimitives } from "../deploymentConfigs";
import DeploymentConfigsMother from "../deploymentConfigs.mother";
import NewDeploymentConfigsCreatedDomainEvent from "./newDeploymentConfigsCreatedDomainEvent";

export default class NewDeploymentConfigsCreatedDomainEventMother{
    static create (deploymentConfigs: DeploymentConfigsPrimitives){
        return new NewDeploymentConfigsCreatedDomainEvent(deploymentConfigs);
    }

    static random(){
        return NewDeploymentConfigsCreatedDomainEventMother.create(
            DeploymentConfigsMother.random().toPrimitives());
    }

    static fromDeploymentConfigs(deploymentConfigs: DeploymentConfigs){
        return NewDeploymentConfigsCreatedDomainEventMother.create(deploymentConfigs.toPrimitives());
    }
}