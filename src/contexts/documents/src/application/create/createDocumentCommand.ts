import Command from "@context/shared/domain/commandBus/command";
import { DocumentPrimitives } from "@src/domain/document";

export type CreateDocumentCommandData = Omit<DocumentPrimitives, 'createdAt' | 'id'>;

export type CreateDocumentCommandPermissions = {
    environmentIds: Array<string>
};

export default class CreateDocumentCommand extends Command {
    readonly data: CreateDocumentCommandData;
    readonly environmentIds: Array<string>

    constructor(data: CreateDocumentCommandData, permissions: CreateDocumentCommandPermissions) {
        super();
        this.data = data;
        this.environmentIds = permissions.environmentIds;
    }
}