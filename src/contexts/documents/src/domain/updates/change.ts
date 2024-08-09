import AggregateRoot from "@context/shared/domain/aggregateRoot";
import Field from "./field";
import Value from "./value";

export type ChangePrimitives = {
    field: string,
    oldValue: string,
    newValue: string,
};

export default class Change extends AggregateRoot {
    readonly field: Field;
    readonly oldValue: Value;
    readonly newValue: Value;

    constructor(primitives: ChangePrimitives) {
        super();
        this.field = new Field(primitives.field);
        this.oldValue = new Value(primitives.oldValue);
        this.newValue = new Value(primitives.newValue);
    }

    toPrimitives(): ChangePrimitives {
        return {
            field: this.field.toString(),
            oldValue: this.oldValue.toString(),
            newValue: this.newValue.toString()
        };
    }

    static fromPrimitives(primitives: ChangePrimitives): Change {
        return new Change(primitives);
    }

    equalsTo(other: Change): boolean {
        return ((!this.field) || (!other.field) || (this.field && other.field && this.field.equalsTo(other.field))) &&
        ((!this.oldValue) || (!other.oldValue) || (this.oldValue && other.oldValue && this.oldValue.equalsTo(other.oldValue))) &&
        ((!this.newValue) || (!other.newValue) || (this.newValue && other.newValue && this.newValue.equalsTo(other.newValue)))
    }
}
