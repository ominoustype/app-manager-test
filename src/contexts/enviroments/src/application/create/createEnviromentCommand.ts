import Command from "@context/shared/domain/commandBus/command";
import { EnviromentPrimitives } from "@src/domain/enviroment";

export type CreateEnviromentCommandData = Omit<EnviromentPrimitives, 'id'>;

export default class CreateEnviromentCommand extends Command{
    readonly data: CreateEnviromentCommandData;

    constructor(data: CreateEnviromentCommandData){
        super();
        this.data = data;
    }
}