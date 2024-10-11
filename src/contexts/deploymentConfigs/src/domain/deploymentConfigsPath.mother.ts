import MotherCreator from "@context/shared/domain/motherCreator.mother";
import DeploymentConfigsPath from "./deploymentConfigsPath";

export default class DeploymentConfigsPathMother {
    static create(value: string): DeploymentConfigsPath {
        return new DeploymentConfigsPath(value);
    }

    static random(): DeploymentConfigsPath{
        return DeploymentConfigsPathMother.create(MotherCreator.words());
    }
}