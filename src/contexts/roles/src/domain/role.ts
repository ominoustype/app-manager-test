import AggregateRoot from "@context/shared/domain/aggregateRoot";
import RoleId from "./roleId";
import Uuid from "@context/shared/domain/uuid";
import NewRoleCreatedDomainEvent from "./events/newRoleCreatedDomainEvent";
import RoleRemovedDomainEvent from "./events/roleRemovedDomainEvent";
import RoleUpdatedDomainEvent from "./events/roleUpdatedDomainEvent";
import { merge } from 'lodash';
import RoleName from "./roleName";
import CustomerId from "./customerId";
import Environments, { EnvironmentsPrimitives } from "./environments/environments";

export type RolePrimitives = {
    id: string,
    name: string,
    customerId: string,
    environments: EnvironmentsPrimitives
};

export default class Role extends AggregateRoot {
    readonly id: RoleId;
    readonly name: RoleName;
    readonly customerId: CustomerId;
    readonly environments: Environments;

    constructor(primitives: RolePrimitives) {
        super();
        this.id = new RoleId(primitives.id);
        this.name = new RoleName(primitives.name);
        this.customerId = new CustomerId(primitives.customerId);
        this.environments = new Environments(primitives.environments);
    }

    toPrimitives(): RolePrimitives {
        return {
            id: this.id.toString(),
            name: this.name.toString(),
            customerId: this.customerId.toString(),
            environments: this.environments.toPrimitives(),
        }
    }

    static fromPrimitives(primitives: RolePrimitives): Role {
        return new Role(primitives);
    }

    equalsTo(other: Role): boolean {
        return (
            (!this.id || !other.id || (this.id && other.id && this.id.equalsTo(other.id))) &&
            (!this.name || !other.name || (this.name && other.name && this.id.equalsTo(other.name))) &&
            (this.customerId || !other.customerId || (this.customerId && other.customerId && this.id.equalsTo(other.customerId))) &&
            (!this.environments || !other.environments || (this.environments && other.environments && 
                JSON.stringify(this.environments) === JSON.stringify(other.environments))) 
        ) as boolean;
    }

    static create(primitives: Omit<RolePrimitives, 'id'>): Role {
        const role = new Role({
            id: Uuid.random().toString(),
            ...primitives
        });

        role.record(new NewRoleCreatedDomainEvent(role.toPrimitives()));

        return role;
    }

    delete() {
        this.record(new RoleRemovedDomainEvent(this.toPrimitives()));
    }

    merge(toMerge: Partial<RolePrimitives>): RolePrimitives {
        return merge(this.toPrimitives(), toMerge);
    }

    update(primitives: Partial<RolePrimitives>): Role {
        const newRole = new Role(this.merge(primitives));

        const event = new RoleUpdatedDomainEvent(newRole.toPrimitives());
        newRole.record(event);

        return newRole;
    }
}