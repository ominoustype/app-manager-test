import Command from "@context/shared/domain/commandBus/command";
import { DocumentPrimitives } from "@src/domain/document";

export type CreateDocumentCommandData = Omit<DocumentPrimitives, 'created_at' | 'id'>;

export default class CreateDocumentCommand extends Command {
    readonly data: CreateDocumentCommandData;

    constructor(data: CreateDocumentCommandData) {
        super();
        this.data = data;
    }
}