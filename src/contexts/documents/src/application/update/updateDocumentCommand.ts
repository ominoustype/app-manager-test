import Command from "@context/shared/domain/commandBus/command";
import { DocumentPrimitives } from "@src/domain/document";

export type UpdateDocumentCommandData = Partial<DocumentPrimitives>;

export default class UpdateDocumentCommand extends Command {
    readonly data: UpdateDocumentCommandData;

    constructor(data: UpdateDocumentCommandData) {
        super();
        this.data = data;
    }
}