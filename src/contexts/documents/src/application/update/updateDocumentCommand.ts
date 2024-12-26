import Command from "@context/shared/domain/commandBus/command";
import { DocumentPrimitives } from "@src/domain/document";

export type UpdateDocumentCommandData = Partial<DocumentPrimitives>;

export type UpdateDocumentCommandPermissions = {
    environmentIds: Array<string>
};

export default class UpdateDocumentCommand extends Command {
    readonly data: UpdateDocumentCommandData;
    readonly environmentIds: Array<string>;

    constructor(data: UpdateDocumentCommandData, permissions: UpdateDocumentCommandPermissions) {
        super();
        this.data = data;
        this.environmentIds = permissions.environmentIds;
    }
}