import AggregateRoot from "@context/shared/domain/aggregateRoot";
import Datetime from "@context/shared/domain/datetime";
import Username from "../users/username";
import { ChangePrimitives } from "./change";
import Changes from "./changes";
import DocumentVersion from "../documentVersion";

export type UpdateByPrimitives = {
    updatedAt: string,
    username: string,
    version: string,
    changes: Array<ChangePrimitives>
};

export default class UpdateBy extends AggregateRoot {
    readonly updatedAt: Datetime;
    readonly username: Username;
    readonly version: DocumentVersion;
    readonly changes: Changes;

    constructor(primitives: UpdateByPrimitives) {
        super();
        this.updatedAt = new Datetime(primitives.updatedAt) 
        this.username = new Username(primitives.username) 
        this.version = new DocumentVersion(primitives.version) 
        this.changes = new Changes(primitives.changes)
    }

    toPrimitives(): UpdateByPrimitives {
        return {
            updatedAt: this.updatedAt.toString(),
            username: this.username.toString(),
            version: this.version.toString(),
            changes: this.changes.toPrimitives()
        };
    }

    static fromPrimitives(primitives: UpdateByPrimitives): UpdateBy {
        return new UpdateBy(primitives);
    }

    equalsTo(other: UpdateBy): boolean {
        return ((!this.updatedAt) || (!other.updatedAt) || (this.updatedAt && other.updatedAt && this.updatedAt.equalsTo(other.updatedAt))) &&
        ((!this.username) || (!other.username) || (this.username && other.username && this.username.equalsTo(other.username))) &&
        ((!this.version) || (!other.version) || (this.version && other.version && this.version.equalsTo(other.version))) &&
        ((!this.changes) || (!other.changes) || (this.changes && other.changes && this.changes.equalsTo(other.changes)))
    }
}
