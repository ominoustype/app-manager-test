import Datetime from "@context/shared/domain/datetime";
import Customer, { CustomerPrimitives } from "../customer/customer";
import Environment, { EnvironmentPrimitives } from "../environment/environment";
import DocumentId from "./documentId";
import DocumentType from "./documentType";
import Properties, { PropertiesPrimitives } from "./properties/properties";
import DocumentName from "./documentName";
import DocumentVersion from "./documentVersion";
import AggregateRoot from "@context/shared/domain/aggregateRoot";
import DocumentStatus from "./documentStatus";

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
        };
    }

    static fromPrimitives(primitives: DocumentPrimitives): Document {
        return new Document(primitives);
    }

    equalsTo(other: Document): boolean {
        return (
            (!this.createdAt || !other.createdAt || (this.createdAt && other.createdAt && this.createdAt.equalsTo(other.createdAt))) &&
            (!this.savedAt || !other.savedAt || (this.savedAt && other.savedAt && this.savedAt.equalsTo(other.savedAt))) &&
            (!this.id || !other.id || (this.id && other.id && this.id.equalsTo(other.id))) &&
            (!this.name || !other.name || (this.name && other.name && this.name.equalsTo(other.name))) &&
            (this.type === (other.type)) &&
            (!this.version || !other.version || (this.version && other.version && this.version.equalsTo(other.version))) &&
            (this.status === (other.status)) &&
            (!this.properties || !other.properties || (this.properties && other.properties && JSON.stringify(this.properties) === JSON.stringify(other.properties))) &&
            (!this.customer || !other.customer || (this.customer && other.customer && JSON.stringify(this.customer) === JSON.stringify(other.customer))) &&
            (!this.environment || !other.environment || (this.environment && other.environment && JSON.stringify(this.environment) === JSON.stringify(other.environment)))
        ) as boolean
    }
}
