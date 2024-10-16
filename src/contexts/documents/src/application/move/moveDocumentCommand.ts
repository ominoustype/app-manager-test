import Command from "@context/shared/domain/commandBus/command";

export type MoveDocumentCommandData = {documentId: string, newEnvironmentId: string};

export default class MoveDocumentCommand extends Command {
    readonly documentId: string;
    readonly newEnvironmentId: string;

    constructor(data: MoveDocumentCommandData) {
        super();
        this.documentId = data.documentId;
        this.newEnvironmentId = data.newEnvironmentId;
    }
}