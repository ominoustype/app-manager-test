import EnvironmentMother from "@src/domain/environment.mother";
import RemoveEnvironmentCommand, { RemoveEnvironmentCommandData, RemoveEnvironmentCommandPermissions } from "./removeEnvironmentCommand";
import Environment from "@src/domain/environment";
import EnvironmentIdMother from "@src/domain/environmentId.mother";

export default class RemoveEnvironmentCommandMother{
    static create(data: RemoveEnvironmentCommandData, permissions: RemoveEnvironmentCommandPermissions): RemoveEnvironmentCommand{
        return new RemoveEnvironmentCommand(data, permissions);
    }

    static random(): RemoveEnvironmentCommand{
        return RemoveEnvironmentCommandMother.create(
            EnvironmentMother.random().toPrimitives(), 
            { 
                environmentIds: EnvironmentIdMother.randomList().map((id) => id.value)
            }
        );
    }

    static applyCommand(command: RemoveEnvironmentCommand): Environment{
        return EnvironmentMother.random(command.data);
    }
}