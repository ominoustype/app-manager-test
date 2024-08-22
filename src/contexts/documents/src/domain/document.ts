import AggregateRoot from '@context/shared/domain/aggregateRoot';
import Datetime from '@context/shared/domain/datetime';
import Uuid from '@context/shared/domain/uuid';
import DocumentId from '@src/domain/documentId';
import NewDocumentCreatedDomainEvent from './newDocumentCreatedDomainEvent';
import DocumentName from './documentName';
import DocumentUpdatedDomainEvent from './documentUpdatedDomainEvent';
import DocumentRemovedDomainEvent from './documentRemovedDomainEvent';
import { merge } from 'lodash';
import DocumentType from './documentType';
import DocumentVersion from './documentVersion';
import { UpdateByPrimitives } from './updates/updateBy';
import UpdatesBy from './updates/updatesBy';
import Customer, { CustomerPrimitives } from './customer/customer';
import Environment, { EnvironmentPrimitives } from './environment/environment';
import Properties, { PropertiesPrimitives } from './properties/properties';

export type DocumentPrimitives = {
    id: string,
    createdAt: string,
    name: string,
    type: DocumentType,
    version: string,
    properties: PropertiesPrimitives,
    customer: CustomerPrimitives,
    environment: EnvironmentPrimitives,
    updatedBy: Array<UpdateByPrimitives>
};

export default class Document extends AggregateRoot {
    readonly id: DocumentId;
    readonly createdAt: Datetime;
    readonly name: DocumentName;
    readonly type: DocumentType;
    readonly version: DocumentVersion;
    readonly properties: Properties;
    readonly customerId: Customer;
    readonly environmentId: Environment;
    readonly updatedBy: UpdatesBy;

    constructor(primitives: DocumentPrimitives) {
        super();
        this.id = new DocumentId(primitives.id);
        this.createdAt = new Datetime(primitives.createdAt);
        this.name = new DocumentName(primitives.name);
        this.type = primitives.type;
        this.version = new DocumentVersion(primitives.version);
        this.properties = new Properties(primitives.properties);
        this.customerId = new Customer(primitives.customer);
        this.environmentId = new Environment(primitives.environment);
        this.updatedBy = new UpdatesBy(primitives.updatedBy)
    }

    toPrimitives(): DocumentPrimitives {
        return {
            createdAt: this.createdAt.toString(),
            id: this.id.toString(),
            name: this.name.toString(),
            type: this.type,
            version: this.version.toString(),
            properties: this.properties.toPrimitives(),
            customer: this.customerId.toPrimitives(),
            environment: this.environmentId.toPrimitives(),
            updatedBy: this.updatedBy.toPrimitives()
        };
    }

    static fromPrimitives(primitives: DocumentPrimitives): Document {
        return new Document(primitives);
    }

    static create(primitives: Omit<DocumentPrimitives, 'createdAt' | 'id'>) {
        const newDocument = new Document({
            createdAt: new Datetime().toString(),
            id: Uuid.random().toString(),
            ...primitives
        });

        newDocument.record(new NewDocumentCreatedDomainEvent(newDocument.toPrimitives()));

        return newDocument;
    }

    equalsTo(other: Document): boolean {
        return (
            (!this.createdAt || !other.createdAt || (this.createdAt && other.createdAt && this.createdAt.equalsTo(other.createdAt))) &&
            (!this.id || !other.id || (this.id && other.id && this.id.equalsTo(other.id))) &&
            (!this.name || !other.name || (this.name && other.name && this.name.equalsTo(other.name))) &&
            (this.type === (other.type)) &&
            (!this.version || !other.version || (this.version && other.version && this.version.equalsTo(other.version))) &&
            (!this.properties || !other.properties || (this.properties && other.properties && JSON.stringify(this.properties) === JSON.stringify(other.properties))) &&
            (!this.customerId || !other.customerId || (this.customerId && other.customerId && this.customerId.equalsTo(other.customerId))) &&
            (!this.environmentId || !other.environmentId || (this.environmentId && other.environmentId && this.environmentId.equalsTo(other.environmentId))) &&
            (!this.updatedBy || !other.updatedBy || (this.updatedBy && other.updatedBy && JSON.stringify(this.updatedBy) === JSON.stringify(other.updatedBy)))
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
