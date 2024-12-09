import AggregateRoot from "@context/shared/domain/aggregateRoot";
import RoleId from "./roleId";
import RoleName from "./roleName";

export type RolePrimitives = {
    id: string,
    name: RoleName
};

export default class Role extends AggregateRoot {
    readonly id: RoleId;
    readonly name: RoleName;

    constructor(primitives: RolePrimitives) {
        super();
        this.id = new RoleId(primitives.id);
        this.name = primitives.name;
    }

    toPrimitives(): RolePrimitives {
        return {
            id: this.id.value,
            name: this.name
        };
    }

    static fromPrimitives(primitives: RolePrimitives): Role {
        return new Role(primitives);
    }

    equalsTo(other: Role): boolean {
        return ((!this.id) || (!other.id) || (this.id && other.id && this.id.equalsTo(other.id))) &&
            (this.name === other.name);
    }
}
