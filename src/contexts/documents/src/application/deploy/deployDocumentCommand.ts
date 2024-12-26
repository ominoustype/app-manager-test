import Command from "@context/shared/domain/commandBus/command";

export type DeployDocumentCommandData = {
    environmentId: string
}

export type DeployDocumentCommandPermissions = {
    environmentIds: Array<string>
}

export default class DeployDocumentCommand extends Command {
    readonly data: DeployDocumentCommandData;
    readonly permissions: DeployDocumentCommandPermissions;

    constructor(data: DeployDocumentCommandData, permissions: DeployDocumentCommandPermissions){
        super();
        this.data = data;
        this.permissions = permissions;
    }
}