import User, { UserPrimitives } from '@src/domain/user';
import FindUserResponse from './findUserResponse';

export default class FindUserResponseMother {
    static create(user: UserPrimitives): FindUserResponse {
        return new FindUserResponse(new User(user));
    }
}