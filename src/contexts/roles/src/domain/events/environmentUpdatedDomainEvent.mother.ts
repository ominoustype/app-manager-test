import Role, { RolePrimitives } from "../role";
import RoleMother from "../role.mother";
import RoleUpdatedDomainEvent from "./roleUpdatedDomainEvent";

export default class RoleUpdatedDomainEventMother {
    static create(role: RolePrimitives) {
        return new RoleUpdatedDomainEvent(role);
    }

    static random() {
        return RoleUpdatedDomainEventMother.create(
            RoleMother.random().toPrimitives()
        )
    }

    static fromRole(Role: Role) {
        return RoleUpdatedDomainEventMother.create(Role.toPrimitives());
    }
}