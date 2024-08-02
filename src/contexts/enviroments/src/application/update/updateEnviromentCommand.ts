import Command from "@context/shared/domain/commandBus/command";
import { EnviromentPrimitives } from "@src/domain/enviroment";

export type UpdateEnviromentCommandData = Partial<EnviromentPrimitives>;

export default class UpdateEnviromentCommand extends Command{
    readonly data: UpdateEnviromentCommandData;

    constructor(data: UpdateEnviromentCommandData){
        super();
        this.data = data;
    }
}