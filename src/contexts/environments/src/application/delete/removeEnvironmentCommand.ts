import Command from "@context/shared/domain/commandBus/command";
import { EnvironmentPrimitives } from "@src/domain/environment";

export type RemoveEnvironmentCommandData = Partial<EnvironmentPrimitives>;

export default class RemoveEnvironmentCommand extends Command{
    readonly data: RemoveEnvironmentCommandData;

    constructor(data: RemoveEnvironmentCommandData){
        super();
        this.data = data;
    }
}