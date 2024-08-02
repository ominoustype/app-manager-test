import Command from "@context/shared/domain/commandBus/command";
import { DocumentPrimitives } from "@src/domain/document";

export type RemoveDocumentCommandData = Partial<DocumentPrimitives>;

export default class RemoveDocumentCommand extends Command {
    readonly data: RemoveDocumentCommandData;

    constructor(data: RemoveDocumentCommandData) {
        super();
        this.data = data;
    }
}