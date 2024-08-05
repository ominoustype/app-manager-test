import EnvironmentMother from "@src/domain/environment.mother";
import UpdateEnvironmentCommand, { UpdateEnvironmentCommandData } from "./updateEnvironmentCommand";
import Environment from "@src/domain/environment";

export default class UpdateEnvironmentCommandMother {
    static create(data: UpdateEnvironmentCommandData): UpdateEnvironmentCommand{
        return new UpdateEnvironmentCommand(data);
    }

    static random(): UpdateEnvironmentCommand{
        return UpdateEnvironmentCommandMother.create(EnvironmentMother.random().toPrimitives());
    }

    static applyCommand(command: UpdateEnvironmentCommand): Environment{
        return EnvironmentMother.random(command.data);
    }
}