import Datetime from "@context/shared/domain/datetime";
import Customer, { CustomerPrimitives } from "../customer/customer";
import Environment, { EnvironmentPrimitives } from "../environment/environment";
import DocumentId from "./documentId";
import DocumentType from "./documentType";
import Properties, { PropertiesPrimitives } from "./properties/properties";
import DocumentName from "./documentName";
import DocumentVersion from "./documentVersion";
import AggregateRoot from "@context/shared/domain/aggregateRoot";

export type DocumentPrimitives = {
    id: string,
    createdAt: string,
    name: string,
    type: DocumentType,
    version: string,
    properties: PropertiesPrimitives,
    customer: CustomerPrimitives,
    environment: EnvironmentPrimitives,
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
        };
    }

    static fromPrimitives(primitives: DocumentPrimitives): Document {
        return new Document(primitives);
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
            (!this.environmentId || !other.environmentId || (this.environmentId && other.environmentId && this.environmentId.equalsTo(other.environmentId)))
        ) as boolean
    }
}
