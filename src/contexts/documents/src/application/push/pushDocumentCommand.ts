import Command from "@context/shared/domain/commandBus/command";

export type PushDocumentCommandData = {
    id: string
}

export type PushDocumentCommandPermissions = {
    environmentIds: Array<string>
};

export default class PushDocumentCommand extends Command {
    readonly data: PushDocumentCommandData;
    readonly permissions: PushDocumentCommandPermissions;

    constructor(data: PushDocumentCommandData, permissions: PushDocumentCommandPermissions) {
        super();
        this.data = data;
        this.permissions = permissions;
    }
}