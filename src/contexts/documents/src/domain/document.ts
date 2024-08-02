import AggregateRoot from '@context/shared/domain/aggregateRoot';
import Datetime from '@context/shared/domain/datetime';
import Uuid from '@context/shared/domain/uuid';
import DocumentId from '@src/domain/documentId';
import NewDocumentCreatedDomainEvent from './newDocumentCreatedDomainEvent';
import DocumentName from './documentName';
import DocumentUpdatedDomainEvent from './documentUpdatedDomainEvent';
import DocumentRemovedDomainEvent from './documentRemovedDomainEvent';
import { merge } from 'lodash';

export type DocumentPrimitives = {
    id: string,
    created_at: string,
    name: string,
    type: string, //Enum
    version: string,
    properties: string,
    customerId: string,
    environmentId: string,
    updatedBy: string
};

export default class Document extends AggregateRoot {
    readonly id: DocumentId;
    readonly created_at: Datetime;
    readonly name: DocumentName;
    readonly type: string;
    readonly version: string;
    readonly properties: string;
    readonly customerId: Uuid;
    readonly environmentId: Uuid;
    readonly updatedBy: string;

    constructor(primitives: DocumentPrimitives) {
        super();
        this.id = new DocumentId(primitives.id);
        this.created_at = new Datetime(primitives.created_at);
        this.name = new DocumentName(primitives.name);
        this.type = (primitives.type);
        this.version = (primitives.version);
        this.properties = (primitives.properties);
        this.customerId = new Uuid(primitives.customerId);
        this.environmentId = new Uuid(primitives.environmentId);
        this.updatedBy = (primitives.updatedBy);
    }

    toPrimitives(): DocumentPrimitives {
        return {
            created_at: this.created_at.toString(),
            id: this.id.toString(),
            name: this.name.toString(),
            type: this.type.toString(),
            version: this.version.toString(),
            properties: this.properties.toString(),
            customerId: this.customerId.toString(),
            environmentId: this.environmentId.toString(),
            updatedBy: this.updatedBy.toString()
        };
    }

    static fromPrimitives(primitives: DocumentPrimitives): Document {
        return new Document(primitives);
    }

    static create(primitives: Omit<DocumentPrimitives, 'created_at' | 'id'>) {
        const newDocument = new Document({
            created_at: new Datetime().toString(),
            id: Uuid.random().toString(),
            ...primitives
        });

        newDocument.record(new NewDocumentCreatedDomainEvent(newDocument.toPrimitives()));

        return newDocument;
    }

    equalsTo(other: Document): boolean {
        return (
            (!this.created_at || !other.created_at || (this.created_at && other.created_at && this.created_at.equalsTo(other.created_at))) &&
            (!this.id || !other.id || (this.id && other.id && this.id.equalsTo(other.id))) &&
            (!this.name || !other.name || (this.name && other.name && this.name.equalsTo(other.name))) &&
            (this.type === (other.type)) &&
            (!this.version || !other.version || (this.version && other.version && this.version === (other.version))) &&
            (!this.properties || !other.properties || (this.properties && other.properties && this.properties === (other.properties))) &&
            (!this.customerId || !other.customerId || (this.customerId && other.customerId && this.customerId.equalsTo(other.customerId))) &&
            (!this.environmentId || !other.environmentId || (this.environmentId && other.environmentId && this.environmentId.equalsTo(other.environmentId))) &&
            (!this.updatedBy || !other.updatedBy || (this.updatedBy && other.updatedBy && this.updatedBy === other.updatedBy))
        ) as boolean
    }

    merge(toMerge: Partial<DocumentPrimitives>): DocumentPrimitives {
        return merge(this.toPrimitives(), toMerge);
    }

    update(primitives: Partial<DocumentPrimitives>): Document {
        const newDocument = new Document(this.merge(primitives));

        newDocument.record(new DocumentUpdatedDomainEvent(newDocument.toPrimitives()));

        return newDocument;
    }

    delete() {
        this.record(new DocumentRemovedDomainEvent(this.toPrimitives()));
    }
}
