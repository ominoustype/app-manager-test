import AggregateRoot from "@context/shared/domain/aggregateRoot";
import PropertyKey from "./propertyKey";
import PropertyValue from "./propertyValue";

export type PropertyPrimitives = {
    key: string,
    value: string
};

export default class Property extends AggregateRoot {
    readonly key: PropertyKey;
    readonly value: PropertyValue;

    constructor(primitives: PropertyPrimitives) {
        super();
        this.key = new PropertyKey(primitives.key);
        this.value = new PropertyValue(primitives.value);
    }

    toPrimitives(): PropertyPrimitives {
        return {
            key: this.key.toString(),
            value: this.value.toString(),
        };
    }

    static fromPrimitives(primitives: PropertyPrimitives): Property {
        return new Property(primitives);
    }

    equalsTo(other: Property): boolean {
        return ((!this.key) || (!other.key) || (this.key && other.key && this.key.equalsTo(other.key))) &&
        ((!this.value) || (!other.value) || (this.value && other.value && this.value.equalsTo(other.value)))
    }
}
