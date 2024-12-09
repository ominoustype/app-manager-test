import User from '@src/domain/user';
import FindUserQuery, { FindUserQueryParams } from './findUserQuery';
import UuidMother from '@context/shared/domain/uuid.mother';
import UserMother from '@src/domain/user.mother';

export default class FindUserQueryMother {
    static create(params: FindUserQueryParams): FindUserQuery {
        return new FindUserQuery(params);
    }

    static random(): FindUserQuery {
        return FindUserQueryMother.create({
            username: UuidMother.random().toString()
        })
    }

    static randomUser(query: FindUserQuery): User {
        const id = UuidMother.create(query.username).toString()

        return UserMother.random({id})
    }
}
