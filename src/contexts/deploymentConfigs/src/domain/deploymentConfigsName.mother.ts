import DeploymentConfigsName from "./deploymentConfigsName";
import MotherCreator from "@context/shared/domain/motherCreator.mother";

export default class DeploymentConfigsNameMother {
    static create(value: string){
        return new DeploymentConfigsName(value);
    }

    static random(){
        return DeploymentConfigsNameMother.create(MotherCreator.word());
    }
}