import EnvironmentMother from "@src/domain/environment.mother";
import CreateEnvironmentCommand, {CreateEnvironmentCommandData} from "./createEnvironmentCommand";
import Environment from "@src/domain/environment";

export default class CreateEnvironmentCommandMother {
    static create(data: CreateEnvironmentCommandData): CreateEnvironmentCommand{
        return new CreateEnvironmentCommand(data);
    }

    static random(): CreateEnvironmentCommand{
        return CreateEnvironmentCommandMother.create(EnvironmentMother.random().toPrimitives());
    }

    static applyCommand(command: CreateEnvironmentCommand): Environment{
        return EnvironmentMother.random(command.data);
    }
}