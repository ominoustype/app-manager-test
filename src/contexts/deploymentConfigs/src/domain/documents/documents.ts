import UniqueObjectsArray from "@context/shared/domain/uniqueObjectsArray";
import Document, { DocumentPrimitives } from "./document";

export type DocumentsPrimitives = Array<DocumentPrimitives> 

export default class Documents extends UniqueObjectsArray<Document,DocumentPrimitives> {
    constructor(documents: DocumentsPrimitives) {
        super(documents,Document);
    }
}
