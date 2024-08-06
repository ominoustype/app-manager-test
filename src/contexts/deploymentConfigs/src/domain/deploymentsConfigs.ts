import UniqueObjectsArray from "@context/shared/domain/uniqueObjectsArray";
import DeploymentConfigs, { DeploymentConfigsPrimitives } from "./deploymentConfigs";

export type DeploymentsConfigsPrimitives = Array<DeploymentConfigsPrimitives>;

export default class DeploymentsConfigs extends UniqueObjectsArray<DeploymentConfigs, DeploymentConfigsPrimitives> {
    constructor(deploymentsConfigs: DeploymentsConfigsPrimitives) {
        super(deploymentsConfigs, DeploymentConfigs);
    }
}
