import EnvironmentMother from "@src/domain/environment.mother";
import RemoveEnvironmentCommand, { RemoveEnvironmentCommandData } from "./removeEnvironmentCommand";
import Environment from "@src/domain/environment";

export default class RemoveEnvironmentCommandMother{
    static create(data: RemoveEnvironmentCommandData): RemoveEnvironmentCommand{
        return new RemoveEnvironmentCommand(data);
    }

    static random(): RemoveEnvironmentCommand{
        return RemoveEnvironmentCommandMother.create(EnvironmentMother.random().toPrimitives());
    }

    static applyCommand(command: RemoveEnvironmentCommand): Environment{
        return EnvironmentMother.random(command.data);
    }
}