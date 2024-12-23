import RoleMother from '@src/domain/role.mother';
import Role from "@src/domain/role";
import UuidMother from '@context/shared/domain/uuid.mother';
import FindByCustomerAndNameRoleQuery, { FindByCustomerAndNameRoleQueryParams } from './findByCustomerAndNameRoleQuery';
import MotherCreator from '@context/shared/domain/motherCreator.mother';

export default class FindByCustomerAndNameRoleQueryMother {
    static create(queryParams: FindByCustomerAndNameRoleQueryParams): FindByCustomerAndNameRoleQuery {
        return new FindByCustomerAndNameRoleQuery(queryParams);
    }

    static random(): FindByCustomerAndNameRoleQuery {
        return FindByCustomerAndNameRoleQueryMother.create({
            customerId: UuidMother.random().toString(),
            name: MotherCreator.word()
        });
    }

    static randomRole(query: FindByCustomerAndNameRoleQuery): Role {
        const customerId = UuidMother.create(query.customerId).toString();

        return RoleMother.random({ 
            customerId: customerId, 
            name: query.name
        });
    }
}