import Command from "@context/shared/domain/commandBus/command";
import { EnvironmentPrimitives } from "@src/domain/environment";

export type UpdateEnvironmentCommandData = Partial<EnvironmentPrimitives>;

export default class UpdateEnvironmentCommand extends Command{
    readonly data: UpdateEnvironmentCommandData;

    constructor(data: UpdateEnvironmentCommandData){
        super();
        this.data = data;
    }
}