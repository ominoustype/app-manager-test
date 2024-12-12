import AggregateRoot from "@context/shared/domain/aggregateRoot";
import Properties, { PropertiesPrimitives } from "../properties/properties";
import DocumentStatus from "../documentStatus";
import DocumentType from "../documentType";
import DocumentName from "../documentName";
import DocumentVersion from "../documentVersion";
import Datetime from "@context/shared/domain/datetime";

export type ChangePrimitives = {
    savedAt: string,
    name: string,
    type: DocumentType,
    version: string,
    status: DocumentStatus,
    properties: PropertiesPrimitives
};

export default class Change extends AggregateRoot {
    readonly name: DocumentName;
    readonly type: DocumentType;
    readonly version: DocumentVersion;
    readonly status: DocumentStatus;
    readonly properties: Properties;
    readonly savedAt: Datetime;

    constructor(primitives: ChangePrimitives) {
        super();
        this.savedAt = new Datetime(primitives.savedAt);
        this.name = new DocumentName(primitives.name);
        this.type = primitives.type;
        this.version = new DocumentVersion(primitives.version);
        this.status = primitives.status;
        this.properties = new Properties(primitives.properties);
    }

    toPrimitives(): ChangePrimitives {
        return {
            name: this.name.toString(),
            savedAt: this.savedAt.toString(),
            type: this.type,
            version: this.version.toString(),
            status: this.status,
            properties: this.properties.toPrimitives(),
        };
    }

    static fromPrimitives(primitives: ChangePrimitives): Change {
        return new Change(primitives);
    }

    equalsTo(other: Change): boolean {
        return (
            (!this.savedAt || !other.savedAt || (this.savedAt && other.savedAt && this.savedAt.equalsTo(other.savedAt))) &&
            (!this.name || !other.name || (this.name && other.name && this.name.equalsTo(other.name))) &&
            (this.type === (other.type)) &&
            (this.status === (other.status)) &&
            (!this.version || !other.version || (this.version && other.version && this.version.equalsTo(other.version))) &&
            (!this.properties || !other.properties || (this.properties && other.properties && JSON.stringify(this.properties) === JSON.stringify(other.properties)))
        )
    }
}
