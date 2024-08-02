import DocumentMother from "./document.mother";
import Documents, { DocumentsPrimitives } from "./documents";
import Document from "./document";

export default class DocumentsMother {
    static create(documents: DocumentsPrimitives): Documents {
        return new Documents(documents);
    }

    static empty(): Documents {
        return DocumentsMother.create([]);
    }

    static random(): Documents {
        return DocumentsMother.create(
            DocumentMother.randomList().map((d: Document) => d.toPrimitives())
        );
    }

    static randomWithSize(size: number): Documents {
        return DocumentsMother.create(
            DocumentMother.randomListWithSize(size).map((d: Document) => d.toPrimitives())
        );
    }
}
