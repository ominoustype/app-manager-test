import UuidMother from "@context/shared/domain/uuid.mother";
import DeploymentConfigsId from "./deploymentConfigsId";

export default class DeploymentConfigsIdMother {
    static create(value: string) {
        return new DeploymentConfigsId(value);
    }

    static random() {
        return DeploymentConfigsIdMother.create(UuidMother.random().value)
    }
}
