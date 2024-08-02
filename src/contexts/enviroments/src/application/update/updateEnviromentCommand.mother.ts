import EnviromentMother from "@src/domain/enviroment.mother";
import UpdateEnviromentCommand, { UpdateEnviromentCommandData } from "./updateEnviromentCommand";
import Enviroment from "@src/domain/enviroment";

export default class UpdateEnviromentCommandMother {
    static create(data: UpdateEnviromentCommandData): UpdateEnviromentCommand{
        return new UpdateEnviromentCommand(data);
    }

    static random(): UpdateEnviromentCommand{
        return UpdateEnviromentCommandMother.create(EnviromentMother.random().toPrimitives());
    }

    static applyCommand(command: UpdateEnviromentCommand): Enviroment{
        return EnviromentMother.random(command.data);
    }
}