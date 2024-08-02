import EnviromentMother from "@src/domain/enviroment.mother";
import RemoveEnviromentCommand, { RemoveEnviromentCommandData } from "./removeEnviromentCommand";
import Enviroment from "@src/domain/enviroment";

export default class RemoveEnviromentCommandMother{
    static create(data: RemoveEnviromentCommandData): RemoveEnviromentCommand{
        return new RemoveEnviromentCommand(data);
    }

    static random(): RemoveEnviromentCommand{
        return RemoveEnviromentCommandMother.create(EnviromentMother.random().toPrimitives());
    }

    static applyCommand(command: RemoveEnviromentCommand): Enviroment{
        return EnviromentMother.random(command.data);
    }
}