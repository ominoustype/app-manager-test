import EnvironmentMother from "@src/domain/environment.mother";
import UpdateEnvironmentCommand, { UpdateEnvironmentCommandData, UpdateEnvironmentCommandPermissions } from "./updateEnvironmentCommand";
import Environment from "@src/domain/environment";
import EnvironmentIdMother from "@src/domain/environmentId.mother";

export default class UpdateEnvironmentCommandMother {
    static create(data: UpdateEnvironmentCommandData, permissions: UpdateEnvironmentCommandPermissions): UpdateEnvironmentCommand{
        return new UpdateEnvironmentCommand(data, permissions);
    }

    static random(): UpdateEnvironmentCommand{
        return UpdateEnvironmentCommandMother.create(
            EnvironmentMother.random().toPrimitives(), 
            { 
                environmentIds: EnvironmentIdMother.randomList().map((id) => id.value)
            });
    }

    static applyCommand(command: UpdateEnvironmentCommand): Environment{
        return EnvironmentMother.random(command.data);
    }
}