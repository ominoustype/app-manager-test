import Command from "@context/shared/domain/commandBus/command";
import { EnviromentPrimitives } from "@src/domain/enviroment";

export type RemoveEnviromentCommandData = Partial<EnviromentPrimitives>;

export default class RemoveEnviromentCommand extends Command{
    readonly data: RemoveEnviromentCommandData;

    constructor(data: RemoveEnviromentCommandData){
        super();
        this.data = data;
    }
}