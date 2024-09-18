import User from '@src/domain/user';
import LogInUserResponse from './loginUserResponse';

export default class LoginUserResponseMother {
    static create(user: User, token: any) {
        return new LogInUserResponse(
            token,
            user
        );
    }

    static fromUser(user: User, token: any) {
        return LoginUserResponseMother.create(user, token);
    }
}