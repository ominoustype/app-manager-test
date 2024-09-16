import RoleMother from '@src/domain/role.mother';
import Role from "@src/domain/role";
import FindRoleQuery, { FindRoleQueryParams } from "./findRoleQuery";
import UuidMother from '@context/shared/domain/uuid.mother';

export default class FindRoleQueryMother {
    static create(queryParams: FindRoleQueryParams): FindRoleQuery {
        return new FindRoleQuery(queryParams);
    }

    static random(): FindRoleQuery {
        return FindRoleQueryMother.create({
            id: UuidMother.random().toString()
        });
    }

    static randomRole(query: FindRoleQuery): Role {
        const id = UuidMother.create(query.id).toString();

        return RoleMother.random({id});
    }
}