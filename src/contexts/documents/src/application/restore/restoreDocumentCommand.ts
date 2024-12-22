import Command from "@context/shared/domain/commandBus/command";

export type RestoreDocumentCommandData = {
    id: string,
    version: string
};

export type RestoreDocumentCommandPermissions = {
    environmentIds: Array<string>
};

export default class RestoreDocumentCommand extends Command {
    readonly data: RestoreDocumentCommandData;
    readonly environmentIds: Array<string>

    constructor(data: RestoreDocumentCommandData, permissions: RestoreDocumentCommandPermissions){
        super();
        this.data = data;
        this.environmentIds = permissions.environmentIds;
    }
}