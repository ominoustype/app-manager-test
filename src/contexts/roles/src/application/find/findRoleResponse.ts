import { Response } from '@context/shared/domain/queryBus/response';
import Role, { RolePrimitives } from "@src/domain/role";

export default class FindRoleResponse implements Response{
    readonly primitives: RolePrimitives;

    constructor(role: Role) {
        this.primitives = role.toPrimitives();
    }
}