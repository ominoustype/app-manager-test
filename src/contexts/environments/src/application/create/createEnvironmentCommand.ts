import Command from "@context/shared/domain/commandBus/command";
import { EnvironmentPrimitives } from "@src/domain/environment";

export type CreateEnvironmentCommandData = Omit<EnvironmentPrimitives, 'id'>;

export default class CreateEnvironmentCommand extends Command{
    readonly data: CreateEnvironmentCommandData;

    constructor(data: CreateEnvironmentCommandData){
        super();
        this.data = data;
    }
}