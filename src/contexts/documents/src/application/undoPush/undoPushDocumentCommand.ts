import Command from "@context/shared/domain/commandBus/command";

export type UndoPushDocumentCommandData = {
    id: string
}

export type UndoPushDocumentCommandPermissions = {
    environmentIds: Array<string>
};

export default class UndoPushDocumentCommand extends Command{
    readonly data: UndoPushDocumentCommandData;
    readonly permissions: UndoPushDocumentCommandPermissions;

    constructor(data: UndoPushDocumentCommandData, permissions: UndoPushDocumentCommandPermissions){
        super();
        this.data = data;
        this.permissions = permissions;
    }
}