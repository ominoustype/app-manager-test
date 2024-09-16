import Role from "./role";
import RoleMother from "./role.mother";
import Roles, { RolesPrimitives } from "./roles";

export default class RolesMother {
    static create(primitives: RolesPrimitives): Roles {
        return new Roles(primitives);
    }

    static empty() {
        return RolesMother.create([]);
    }

    static random(): Roles {
        return RolesMother.create(RoleMother.randomList().map((role: Role) => role.toPrimitives()));
    }

    static randomWithSize(size: number): Roles {
        return RolesMother.create(
            RoleMother.randomListWithSize(size).map((role: Role) => role.toPrimitives())
        );
    }
}