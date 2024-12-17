import EnvironmentMother from "@src/domain/environment.mother";
import DeployEnvironmentCommand, { DeployEnvironmentCommandData } from "./deployEnvironmentCommand";;
import UuidMother from "@context/shared/domain/uuid.mother";

export default class DeployEnvironmentCommandMother {
    static create(data: DeployEnvironmentCommandData): DeployEnvironmentCommand{
        return new DeployEnvironmentCommand(data);
    }

    static random(): DeployEnvironmentCommand{
        return DeployEnvironmentCommandMother.create({
            primitives: EnvironmentMother.random().toPrimitives(),
            deploymentConfigsId: UuidMother.random().toString()
        });
    }

    static applyCommand(command: DeployEnvironmentCommand){
        return { 
            environment: EnvironmentMother.random(command.data.primitives),
            deploymentConfigsId: command.data.deploymentConfigsId
        }
    }
}