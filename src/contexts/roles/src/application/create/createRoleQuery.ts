import Query from "@context/shared/domain/queryBus/query";
import { RolePrimitives } from "@src/domain/role";

export type CreateRoleQueryParams = Omit<RolePrimitives, 'id'>

export default class CreateRoleQuery extends Query {
    readonly data: CreateRoleQueryParams;

    constructor(data: CreateRoleQueryParams) {
        super();
        this.data = data;
    }
}