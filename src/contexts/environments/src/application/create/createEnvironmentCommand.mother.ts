import EnvironmentMother from "@src/domain/environment.mother";
import CreateEnvironmentCommand, {CreateEnvironmentCommandData, CreateEnvironmentCommandPermissions} from "./createEnvironmentCommand";
import Environment from "@src/domain/environment";
import MotherCreator from "@context/shared/domain/motherCreator.mother";

export default class CreateEnvironmentCommandMother {
    static create(data: CreateEnvironmentCommandData, permissions: CreateEnvironmentCommandPermissions): CreateEnvironmentCommand{
        return new CreateEnvironmentCommand(data, permissions);
    }

    static random(): CreateEnvironmentCommand{
        return CreateEnvironmentCommandMother.create(EnvironmentMother.random().toPrimitives(),{
            username: MotherCreator.word()
        });
    }

    static applyCommand(command: CreateEnvironmentCommand): Environment{
        return EnvironmentMother.random(command.data);
    }
}