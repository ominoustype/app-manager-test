import { sample } from "lodash";
import DeploymentConfigsDeviceType from "./deploymentConfigsDeviceType";

export default class DeploymentConfigsDeviceTypeMother {
    static random(): DeploymentConfigsDeviceType{
        return sample(Object.values(DeploymentConfigsDeviceType)) as DeploymentConfigsDeviceType;
    }
}
