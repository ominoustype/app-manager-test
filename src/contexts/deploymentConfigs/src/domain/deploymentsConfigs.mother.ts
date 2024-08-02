import DeploymentsConfigs, { DeploymentsConfigsPrimitives } from "./deploymentsConfigs";
import DeploymentConfigsMother from "./deploymentConfigs.mother";
import DeploymentConfigs from "./deploymentConfigs";

export default class DeploymentsConfigsMother {
    static create(deploymentsConfigs: DeploymentsConfigsPrimitives): DeploymentsConfigs {
        return new DeploymentsConfigs(deploymentsConfigs);
    }

    static empty(): DeploymentsConfigs {
        return DeploymentsConfigsMother.create([]);
    }

    static random(): DeploymentsConfigs {
        return DeploymentsConfigsMother.create(
            DeploymentConfigsMother.randomList().map((d: DeploymentConfigs) => d.toPrimitives())
        );
    }

    static randomWithSize(size: number): DeploymentsConfigs {
        return DeploymentsConfigsMother.create(
            DeploymentConfigsMother.randomListWithSize(size).map((d: DeploymentConfigs) => d.toPrimitives())
        );
    }
}