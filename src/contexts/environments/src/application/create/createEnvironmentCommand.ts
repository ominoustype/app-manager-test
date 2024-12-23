import Command from "@context/shared/domain/commandBus/command";
import { EnvironmentPrimitives } from "@src/domain/environment";

export type CreateEnvironmentCommandData = Omit<EnvironmentPrimitives, 'id'>;

export type CreateEnvironmentCommandPermissions = {
    username: string
};

export default class CreateEnvironmentCommand extends Command{
    readonly data: CreateEnvironmentCommandData;
    readonly permissions: CreateEnvironmentCommandPermissions;

    constructor(data: CreateEnvironmentCommandData, permissions: CreateEnvironmentCommandPermissions){
        super();
        this.data = data;
        this.permissions = permissions;
    }
}