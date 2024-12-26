import Command from "@context/shared/domain/commandBus/command";

export type MoveDocumentCommandData = {documentId: string, newEnvironmentId: string};

export type MoveDocumentCommandPermissions = {
    environmentIds: Array<string>
};

export default class MoveDocumentCommand extends Command {
    readonly documentId: string;
    readonly newEnvironmentId: string;
    readonly environmentIds: Array<string>

    constructor(data: MoveDocumentCommandData, permissions: MoveDocumentCommandPermissions) {
        super();
        this.documentId = data.documentId;
        this.newEnvironmentId = data.newEnvironmentId;
        this.environmentIds = permissions.environmentIds;
    }
}