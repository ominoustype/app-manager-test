import Command from "@context/shared/domain/commandBus/command";
import { DocumentPrimitives } from "@src/domain/document";

export type RemoveDocumentCommandData = Partial<DocumentPrimitives>;

export type RemoveDocumentCommandPermissions = {
    environmentIds: Array<string>
};

export default class RemoveDocumentCommand extends Command {
    readonly data: RemoveDocumentCommandData;
    readonly environmentIds: Array<string>;

    constructor(data: RemoveDocumentCommandData, permissions: RemoveDocumentCommandPermissions) {
        super();
        this.data = data;
        this.environmentIds = permissions.environmentIds;
    }
}