import Role, { RolePrimitives } from "../role";
import RoleMother from "../role.mother";
import RoleRemovedDomainEvent from "./roleRemovedDomainEvent";

export default class RoleRemovedDomainEventMother {
    static create(primitives: RolePrimitives): RoleRemovedDomainEvent {
        return new RoleRemovedDomainEvent(primitives);
    }

    static random(): RoleRemovedDomainEvent {
        return RoleRemovedDomainEventMother.create(RoleMother.random().toPrimitives());
    }

    static fromRole(role: Role): RoleRemovedDomainEvent {
        return new RoleRemovedDomainEvent(role.toPrimitives());
    }
}