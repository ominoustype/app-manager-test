import AggregateRoot from "@context/shared/domain/aggregateRoot";
import Datetime from "@context/shared/domain/datetime";
import Username from "../users/username";
import Uuid from "@context/shared/domain/uuid";
import { ChangePrimitives } from "./change";
import Changes from "./changes";

export type UpdateByPrimitives = {
    updatedAt: string,
    username: string,
    userId: string,
    changes: Array<ChangePrimitives>
};

export default class UpdateBy extends AggregateRoot {
    readonly updatedAt: Datetime;
    readonly username: Username;
    readonly userId: Uuid;
    readonly changes: Changes;

    constructor(primitives: UpdateByPrimitives) {
        super();
        this.updatedAt = new Datetime(primitives.updatedAt) 
        this.username = new Username(primitives.username) 
        this.userId = new Uuid(primitives.userId) 
        this.changes = new Changes(primitives.changes)
    }

    toPrimitives(): UpdateByPrimitives {
        return {
            updatedAt: this.updatedAt.toString(),
            username: this.username.toString(),
            userId: this.userId.toString(),
            changes: this.changes.toPrimitives()
        };
    }

    static fromPrimitives(primitives: UpdateByPrimitives): UpdateBy {
        return new UpdateBy(primitives);
    }

    equalsTo(other: UpdateBy): boolean {
        return ((!this.updatedAt) || (!other.updatedAt) || (this.updatedAt && other.updatedAt && this.updatedAt.equalsTo(other.updatedAt))) &&
        ((!this.username) || (!other.username) || (this.username && other.username && this.username.equalsTo(other.username))) &&
        ((!this.userId) || (!other.userId) || (this.userId && other.userId && this.userId.equalsTo(other.userId))) &&
        ((!this.changes) || (!other.changes) || (this.changes && other.changes && this.changes.equalsTo(other.changes)))
    }
}
