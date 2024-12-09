import Users, { UsersPrimitives } from '@src/domain/users';
import SearchUsersResponse from './searchUsersResponse';
import UsersMother from '@src/domain/users.mother';

export default class SearchUsersResponseMother {
    static create(users: UsersPrimitives): SearchUsersResponse {
        return new SearchUsersResponse(new Users(users));
    }

    static fromUsers(users: Users) {
        return SearchUsersResponseMother.create(users.toPrimitives());
    }
    
    static empty() {
        return SearchUsersResponseMother.create(UsersMother.empty().toPrimitives());
    }
}