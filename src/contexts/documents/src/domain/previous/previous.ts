import AggregateRoot from "@context/shared/domain/aggregateRoot";
import Username from "../users/username";
import Change, { ChangePrimitives } from "./change";

export type PreviousPrimitives = {
    username: string,
    changes: ChangePrimitives
};

export default class Previous extends AggregateRoot {
    readonly username: Username;
    readonly changes: Change;

    constructor(primitives: PreviousPrimitives) {
        super();
        this.username = new Username(primitives.username)
        this.changes = new Change(primitives.changes)
    }

    toPrimitives(): PreviousPrimitives {
        return {
            username: this.username.toString(),
            changes: this.changes.toPrimitives()
        };
    }

    static fromPrimitives(primitives: PreviousPrimitives): Previous {
        return new Previous(primitives);
    }

    equalsTo(other: Previous): boolean {
        return ((!this.username) || (!other.username) || (this.username && other.username && this.username.equalsTo(other.username))) &&
        ((!this.changes) || (!other.changes) || (this.changes && other.changes && this.changes.equalsTo(other.changes)))
    }
}
