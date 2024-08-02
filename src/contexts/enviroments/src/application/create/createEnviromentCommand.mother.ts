import EnviromentMother from "@src/domain/enviroment.mother";
import CreateEnviromentCommand, {CreateEnviromentCommandData} from "./createEnviromentCommand";
import Enviroment from "@src/domain/enviroment";

export default class CreateEnviromentCommandMother {
    static create(data: CreateEnviromentCommandData): CreateEnviromentCommand{
        return new CreateEnviromentCommand(data);
    }

    static random(): CreateEnviromentCommand{
        return CreateEnviromentCommandMother.create(EnviromentMother.random().toPrimitives());
    }

    static applyCommand(command: CreateEnviromentCommand): Enviroment{
        return EnviromentMother.random(command.data);
    }
}