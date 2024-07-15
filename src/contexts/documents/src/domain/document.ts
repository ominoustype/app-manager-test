import AggregateRoot from '@context/shared/domain/aggregateRoot';
import DocumentId from '@src/domain/documentId';

export type DocumentPrimitives = {
    id: string;
};

export default class Document extends AggregateRoot {
    private readonly id: DocumentId;

    constructor(primitives: DocumentPrimitives) {
        super();
        this.id = new DocumentId(primitives.id);
    }

    toPrimitives(): DocumentPrimitives {
        return {
            id: this.id.value
        };
    }
}
