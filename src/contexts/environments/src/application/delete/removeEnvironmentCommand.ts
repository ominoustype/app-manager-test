import Command from "@context/shared/domain/commandBus/command";
import { EnvironmentPrimitives } from "@src/domain/environment";

export type RemoveEnvironmentCommandData = Partial<EnvironmentPrimitives>;

export type RemoveEnvironmentCommandPermissions = {
    environmentIds: Array<string>
};

export default class RemoveEnvironmentCommand extends Command{
    readonly data: RemoveEnvironmentCommandData;
    readonly permissions: RemoveEnvironmentCommandPermissions;

    constructor(data: RemoveEnvironmentCommandData, permissions: RemoveEnvironmentCommandPermissions){
        super();
        this.data = data;
        this.permissions = permissions;
    }
}