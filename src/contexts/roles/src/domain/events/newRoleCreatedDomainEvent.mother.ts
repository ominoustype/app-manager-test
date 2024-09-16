import NewRoleCreatedDomainEvent from "./newRoleCreatedDomainEvent";
import Role, { RolePrimitives } from "../role";
import RoleMother from "../role.mother";

export default class NewRoleCratedDomainEventMother {
    static create(primitives: RolePrimitives) {
        return new NewRoleCreatedDomainEvent(primitives);
    }

    static random(): NewRoleCreatedDomainEvent {
        return NewRoleCratedDomainEventMother.create(RoleMother.random().toPrimitives());
    }

    static fromRole(role: Role): NewRoleCreatedDomainEvent {
        return new NewRoleCreatedDomainEvent(role.toPrimitives());
    }
}