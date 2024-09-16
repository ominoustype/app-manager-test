import UniqueObjectsArray from "@context/shared/domain/uniqueObjectsArray";
import Role, { RolePrimitives } from "./role";

export type RolesPrimitives = Array<RolePrimitives>;

export default class Roles extends UniqueObjectsArray<Role, RolePrimitives> {
    constructor(roles: RolesPrimitives) {
        super(roles, Role);
    }
}