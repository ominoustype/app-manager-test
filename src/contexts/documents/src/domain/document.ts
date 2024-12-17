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
import Customer, { CustomerPrimitives } from './customer/customer';
import Environment, { EnvironmentPrimitives } from './environment/environment';
import Properties, { PropertiesPrimitives } from './properties/properties';
import DocumentStatus from './documentStatus';
import { PreviousPrimitives } from './previous/previous';
import Previouses from './previous/previouses';
import DocumentDeployedDomainEvent from './documentDeployedDomainEvent';
import DocumentRestoredDomainEvent from './documentRestoredDomainEvent';

const DOCUMENT_INIT_VERSION: string = "v1.0";

export type DocumentPrimitives = {
    id: string,
    createdAt: string,
    savedAt: string,
    name: string,
    type: DocumentType,
    version: string,
    status: DocumentStatus,
    properties: PropertiesPrimitives,
    customer: CustomerPrimitives,
    environment: EnvironmentPrimitives,
    previous: Array<PreviousPrimitives>
};

export default class Document extends AggregateRoot {
    readonly id: DocumentId;
    readonly createdAt: Datetime;
    readonly savedAt: Datetime;
    readonly name: DocumentName;
    readonly type: DocumentType;
    readonly version: DocumentVersion;
    readonly status: DocumentStatus;
    readonly properties: Properties;
    readonly customer: Customer;
    readonly environment: Environment;
    readonly previous: Previouses;

    constructor(primitives: DocumentPrimitives) {
        super();
        this.id = new DocumentId(primitives.id);
        this.createdAt = new Datetime(primitives.createdAt);
        this.savedAt = new Datetime(primitives.savedAt);
        this.name = new DocumentName(primitives.name);
        this.type = primitives.type;
        this.version = new DocumentVersion(primitives.version);
        this.status = primitives.status;
        this.properties = new Properties(primitives.properties);
        this.customer = new Customer(primitives.customer);
        this.environment = new Environment(primitives.environment);
        this.previous = new Previouses(primitives.previous)
    }

    toPrimitives(): DocumentPrimitives {
        return {
            createdAt: this.createdAt.toString(),
            savedAt: this.savedAt.toString(),
            id: this.id.toString(),
            name: this.name.toString(),
            type: this.type,
            version: this.version.toString(),
            status: this.status,
            properties: this.properties.toPrimitives(),
            customer: this.customer.toPrimitives(),
            environment: this.environment.toPrimitives(),
            previous: this.previous.toPrimitives()
        };
    }

    static fromPrimitives(primitives: DocumentPrimitives): Document {
        return new Document(primitives);
    }

    static create(primitives: Omit<DocumentPrimitives, 'createdAt' | 'savedAt' | 'id' | 'status' | 'version' >) {
        const newDocument = new Document({
            ...primitives,
            id: Uuid.random().toString(),
            createdAt: new Datetime().toString(),
            savedAt: new Datetime().toString(),
            version: DOCUMENT_INIT_VERSION,
            status: DocumentStatus.DRAFT
        });

        newDocument.record(new NewDocumentCreatedDomainEvent(newDocument.toPrimitives()));

        return newDocument;
    }

    equalsTo(other: Document): boolean {
        return (
            (!this.createdAt || !other.createdAt || (this.createdAt && other.createdAt && this.createdAt.equalsTo(other.createdAt))) &&
            (!this.savedAt || !other.savedAt || (this.savedAt && other.savedAt && this.savedAt.equalsTo(other.savedAt))) &&
            (!this.id || !other.id || (this.id && other.id && this.id.equalsTo(other.id))) &&
            (!this.name || !other.name || (this.name && other.name && this.name.equalsTo(other.name))) &&
            (this.type === (other.type)) &&
            (this.status === (other.status)) &&
            (!this.version || !other.version || (this.version && other.version && this.version.equalsTo(other.version))) &&
            (!this.properties || !other.properties || (this.properties && other.properties && JSON.stringify(this.properties) === JSON.stringify(other.properties))) &&
            (!this.customer || !other.customer || (this.customer && other.customer && this.customer.equalsTo(other.customer))) &&
            (!this.environment || !other.environment || (this.environment && other.environment && this.environment.equalsTo(other.environment))) &&
            (!this.previous || !other.previous || (this.previous && other.previous && JSON.stringify(this.previous) === JSON.stringify(other.previous)))
        ) as boolean
    }

    merge(toMerge: Partial<DocumentPrimitives>): DocumentPrimitives {
        return merge(this.toPrimitives(), toMerge);
    }

    update(primitives: Partial<DocumentPrimitives>): Document {
        const newDocument = new Document(({
            ...this.toPrimitives(),
            ...primitives,
            savedAt: new Datetime().toString(),
        }));

        newDocument.record(new DocumentUpdatedDomainEvent(newDocument.toPrimitives()));

        return newDocument;
    }

    move(primitives: EnvironmentPrimitives): Document | null {
        const documentPrimitives = this.toPrimitives();

        /* Search for a previous document with STATUS === READY (which means that the document is on a deploymentConfigs 
        ready to be deployed). In such case, reject the operation */
        let isReady = false;
        for (const document of documentPrimitives.previous) {
            if (document.changes.status === DocumentStatus.READY) {
                isReady = true;
                break;
            }
        }

        if (isReady) {
            return null;
        }

        const newDocument = new Document({
            ...this.toPrimitives(),
            environment: primitives
        });

        newDocument.record(new DocumentUpdatedDomainEvent(newDocument.toPrimitives()));

        return newDocument;
    }

    push(): Document {
        /* Push current version (DRAFT) to the array of old versions. Save it as it is but changing the
        status to READY (for deploy) */
        const previouses = this.previous.toPrimitives();
        previouses.push({
            username: "new user",
            changes: {
                savedAt: this.savedAt.toString(),
                name: this.name.toString(),
                type: this.type,
                version: this.version.toString(),
                status: DocumentStatus.READY,
                properties: this.properties.toPrimitives()
            }
        });

        /* Set new version as current one -> DRAFT, and update the previous array */
        const newDocument = new Document({
            ...this.toPrimitives(),
            savedAt: new Datetime().toString(),
            version: this.nextVersionLiteral(this.version.toString()),
            previous: previouses
        });

        newDocument.record(new DocumentUpdatedDomainEvent(newDocument.toPrimitives()));

        return newDocument;
    }

    /* 
        Replace the current version with the last one added to the previous[] array
    */
    undoPush(): Document | null {
        const previousPrimitives = this.previous.toPrimitives();
        const lastDocument = previousPrimitives.pop();

        if(!lastDocument || lastDocument.changes.status != DocumentStatus.READY)
            return null;

        const newDocument = new Document({
            ...this.toPrimitives(),
            savedAt: lastDocument.changes.savedAt,
            name: lastDocument.changes.name,
            type: lastDocument.changes.type,
            version: lastDocument.changes.version,
            status: DocumentStatus.DRAFT,   // Important
            properties: lastDocument.changes.properties,
            previous: previousPrimitives
        });

        newDocument.record(new DocumentUpdatedDomainEvent(newDocument.toPrimitives()));

        return newDocument;
    }

    delete() {
        this.record(new DocumentRemovedDomainEvent(this.toPrimitives()));
    }

    deploy(): Document {
        const primitives = this.toPrimitives();

        /* Change status to DEPLOYED. 
        Look for the last element added to previous list. This element is in READY status as well */
        const previous = primitives.previous;
        previous[previous.length - 1].changes.status = DocumentStatus.DEPLOYED;

        const newDocument = new Document({
            ...primitives,
            previous: previous
        });

        newDocument.record(new DocumentDeployedDomainEvent(newDocument.toPrimitives()));

        return newDocument;
    }

    restore(version: string): Document | null {
        const primitives = this.toPrimitives();

        /* Find the requested version within the previous[] array */
        let toRestore = null;
        for(const doc of primitives.previous) {
            if(doc.changes.version === version) {
                toRestore = doc.changes;
                break;
            }
        }

        if(!toRestore) {
            return null;
        }

        const newDocument = new Document({
            ...primitives,
            ...toRestore,
            version: primitives.version,
            status: DocumentStatus.DRAFT
        });

        newDocument.record(new DocumentRestoredDomainEvent(newDocument.toPrimitives()));

        return newDocument;
    }

    /* Example: 'v2.0' -> 'v3.0' */
     nextVersionLiteral(version: string): string {
        const previousVersionString = version.substring(1, version.length-2);
        const nextVersionNumber = Number(previousVersionString) + 1;
        const nextVersionString = 'v'+nextVersionNumber+'.0';

        return nextVersionString;
    }
}
