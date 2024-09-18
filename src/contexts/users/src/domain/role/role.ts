import AggregateRoot from "@context/shared/domain/aggregateRoot";
import RoleId from "./roleId";

export type RolePrimitives = {
    id: string,
};

export default class Role extends AggregateRoot {
    readonly id: RoleId;

    constructor(primitives: RolePrimitives) {
        super();
        this.id = new RoleId(primitives.id);
    }

    toPrimitives(): RolePrimitives {
        return {
            id: this.id.toString(),
        };
    }

    static fromPrimitives(primitives: RolePrimitives): Role {
        return new Role(primitives);
    }

    equalsTo(other: Role): boolean {
        return ((!this.id) || (!other.id) || (this.id && other.id && this.id.equalsTo(other.id)));
    }
}
